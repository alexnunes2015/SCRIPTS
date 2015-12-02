#pragma strict

import System.IO;

var ItemsOnDesktop=new Array();
var ItemsOnDesktopTMP=new Array();
var ItemsOnDesktopICO=new Array();
var ResfreshTimer=0;

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var OldItemsSize=0;
var InvalidIcon:Texture;
var INVISIBLE:GUISkin;
var MaxItemsInPage=0;
var ItemsToJump=0;
var ListIndex=0;
var InPage=0;

function Start () {
}

function Update () {
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7"))
	{
		if(Application.platform==RuntimePlatform.LinuxPlayer){
			ResfreshTimer++;
			if(ResfreshTimer>=130){
				var NewItemsSize=0;
				var filePaths1 : String[];
					
				CalcMaxItemsInPage();
				
				filePaths1 = Directory.GetFiles("/usr/share/applications","*.desktop");
				
				for(file in filePaths1){
					NewItemsSize++;
				}
				
				if(NewItemsSize!=OldItemsSize){
					OldItemsSize=NewItemsSize;
					ReLoad();
				}
				ResfreshTimer=0;
			}
		}
	}
}

function CalcMaxItemsInPage(){
	var TMP_X_Icon=30;
	var TMP_Y_Icon=PlayerPrefs.GetInt("MinY")+20;
		
	var NewMIIP=0;
	
		
	while(true){
		TMP_X_Icon=TMP_X_Icon+260;
		NewMIIP++;
		if(TMP_X_Icon>=Screen.width-100){
			TMP_X_Icon=30;
			TMP_Y_Icon=TMP_Y_Icon+90;
		}
		if(TMP_Y_Icon>=Screen.height-200){
			break;
		}				
	}
	MaxItemsInPage=NewMIIP;
}

function ReLoad(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7"))
	{
		if(Application.platform==RuntimePlatform.LinuxPlayer){
			
			var filePaths : String[];
			
			var CountedItems=0;
			filePaths = Directory.GetFiles("/usr/share/applications","*.desktop");
			ItemsOnDesktopTMP.clear();
			var actualItem=0;
						
			for(FileObject in filePaths){				
				var Contet_TMP=BASE.ReadFile(FileObject);
				
				var ItemName="";
				var ItemDescription="";
				var ItemIcon="";
				var ItemExec="";
				
				var SaveToArray=true;				
				if(Contet_TMP.Contains("[Desktop Entry]")){
					var sr = new File.OpenText(FileObject);
					while (!sr.EndOfStream) {
						var line=sr.ReadLine();
						if(line.Contains("=")){
							var DataLine=line.Split("="[0]);	
						       		       
						    if(DataLine[0].Contains("Name")){
						    	if(line.Contains("Name=")){
						    		ItemName=DataLine[1];	
						    	}					    	
						    }
						    if(DataLine[0].Contains("Comment")){
						    	ItemDescription=DataLine[1];
						    }
						    if(DataLine[0].Contains("Exec")){
						    	ItemExec=DataLine[1];
						    }
						    if(DataLine[0].Contains("Icon")){
					    		if(System.IO.File.Exists(DataLine[1])){
					    			ItemIcon=DataLine[1];
					    		}
					    		if(System.IO.File.Exists("/ZED/SYSICOS/"+DataLine[1]+".png")){
					    			ItemIcon="/ZED/SYSICOS/"+DataLine[1]+".png";
					    		}
					    		if(System.IO.File.Exists("/usr/share/app-install/icons/"+DataLine[1]+".png")){
					    			ItemIcon="/usr/share/app-install/icons/"+DataLine[1]+".png";
					    		}
						    }
						    if(DataLine[0].Contains("NoDisplay")){
						    	if(DataLine[1].ToLower()=="true"){
						    		SaveToArray=false;
						    	}
						    }
						}	       
				    }
				    if(ItemIcon!="" && SaveToArray){
				    	if(actualItem>=ItemsToJump && actualItem<MaxItemsInPage+ItemsToJump){
				    		ItemsOnDesktopTMP.Add(ItemName+"»"+ItemDescription+"»"+ItemExec+"»"+ItemIcon);	
				    	}
				    	actualItem++;
				    }
				}
			}
		}
		
		ItemsOnDesktop.clear();
		
		//// Copy TMP array to Definitive Array
		var PositionCopy=0;
		for(TmpItem in ItemsOnDesktopTMP){
			ItemsOnDesktop[PositionCopy]=TmpItem;
			PositionCopy++;
		}
		////////////////////////////////////////
		
		ItemsOnDesktopICO.clear();
		// Carregar Icons
		for(ActualIcon in ItemsOnDesktop)
		{
			var ActualIconData=ActualIcon.ToString().Split("»"[0]);
			if(ActualIconData[3]!=""){
				var wwwIcon=new WWW("file://"+ActualIconData[3]);
				yield wwwIcon;
				if(wwwIcon.error==null){
					ItemsOnDesktopICO.Add(wwwIcon.texture);
				}else{
					ItemsOnDesktopICO.Add(InvalidIcon);
				}
			}else{
				ItemsOnDesktopICO.Add(InvalidIcon);
			}
		}
		ItemsOnDesktopTMP.clear();
	}
}	

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_7"))
	{
		var TMPnPages=OldItemsSize/MaxItemsInPage;
		
		GUI.skin.label.alignment=TextAnchor.MiddleCenter;
		if(OldItemsSize==0)
		{
			GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));
		}
		else
		{
			GUI.Label(Rect(0,Screen.height-130,Screen.width,40),InPage+" / "+TMPnPages);
		}
		
		
		// BTNS andar para tras e frente na lista
		if(ItemsToJump==0)
		{
			GUI.skin=Back_BTN_Inactive;
			if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
			{}
			if((ItemsOnDesktopICO.length-1)>0)
			{
				GUI.skin=Next_BTN_Active;
				if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
				{
					ItemsToJump=ItemsToJump+MaxItemsInPage;
					InPage=InPage+1;
					ReLoad();
				}
			}
		}
		else
		{
			if(ItemsToJump!=OldItemsSize-MaxItemsInPage)
			{
				GUI.skin=Back_BTN_Active;
				if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
				{
					ItemsToJump=ItemsToJump-MaxItemsInPage;
					InPage=InPage-1;
					ReLoad();
				}
				if((ItemsOnDesktopICO.length-1)>0)
				{
					GUI.skin=Next_BTN_Active;
					if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
					{
						ItemsToJump=ItemsToJump+MaxItemsInPage;
						InPage=InPage+1;
						ReLoad();
					}
				}
			}
			else
			{
				GUI.skin=Back_BTN_Active;
				if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
				{
					ItemsToJump=ItemsToJump-MaxItemsInPage;
					InPage=InPage-1;
					ReLoad();
				}
				if(ItemsOnDesktopICO.length>0)
				{
					GUI.skin=Next_BTN_Inactive;
					if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
					{
					}
				}
			}
		}		
		///////////////////////////////////////////	
	
		var X_Icon=30;
		var Y_Icon=PlayerPrefs.GetInt("MinY")+20;
		
		var ID_Item=0;
		
		for(IconApp in ItemsOnDesktopICO)
		{
		
			var Data_Items=ItemsOnDesktop[ID_Item].ToString().Split("»"[0]);
			
			var ITM_NAME=Data_Items[0];
			var ITM_EXEC=Data_Items[2];						
			
			GUI.skin=INVISIBLE;
			if(GUI.Button(Rect(X_Icon,Y_Icon,70,70),IconApp as Texture)){
				BASE.LINUX_RUN(ITM_EXEC);
			}			
			var TMPSKN_LBL=GUI.skin;
			GUI.skin.label.alignment=TextAnchor.UpperLeft;
			GUI.Label(Rect(X_Icon+71,Y_Icon+5,190,70),"<size=15>"+ITM_NAME+"</size>");
			GUI.skin=TMPSKN_LBL;			
			
			X_Icon=X_Icon+260;
			if(X_Icon>=Screen.width-100){
				X_Icon=30;
				Y_Icon=Y_Icon+90;
			}
			ID_Item++;
		}	
	}
}