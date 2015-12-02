#pragma strict

import System.IO;

var UserIcon:Texture;

var SexMale:Texture;
var SexFemale:Texture;

var List_update=0;

var filesListWC = new Array();
var List_WC_page=new Array ();

var SYSTEM_SKIN:GUISkin;
var Setting_Skin:GUISkin;

var Setting_Back:Texture;

static var ShowSettingUI=true;
var GoToChangeSystemColor=false;
var GoToChangeWallColor=false;
///// Language Settings
var PT_FLAG:Texture;
var EN_FLAG:Texture;
var FR_FLAG:Texture;

var SYSTEM_ICO:Texture;
var APPARENCE_ICO:Texture;
var SOUND_ICO:Texture;
var NETWORK_ICO:Texture;
var ACCOUNT_ICO:Texture;
var MINIWORLD_ICO:Texture;
var SERVER_ICO:Texture;

var selected_tab:Texture;

var ServerName="";
var ServerPort="";
var ServerPassword="";

var ClientIP="";
var ClientPort="";
var ClientPassword="";

var AddServerFavICO:Texture;
var DelServerFavICO:Texture;

var SETTING_MENU_WALLPAPER:Texture;

var Check_True:GUISkin;
var Check_False:GUISkin;


//////// Change Passowrd //////////////
var CP_UI=false;
var CP_ActualPS="";
var CP_NEWPS_0="";
var CP_NEWPS_1="";
//////////////////////////////////////////

//////// Delete Account //////////////
var DC_UI=false;
var DC_Verification="";
//////////////////////////////////////////

var SYS_DBG:Texture;
var MiniWindow:Texture;

var ResfreshUserIMG=0;

var BTN_YES:GUISkin;
var BTN_NO:GUISkin;

// TAB IDs //////////
// 0-Geral
// 1-Aparencia
// 2-Som
// 3-Rede
// 4-Conta
// 5-Mundo3D
// 6-Servidor
static var ActualTabID=0;
//////////////////////

var ChangeLanguage=false;
/////////////////////////

function Start () {
	ServerName=PlayerPrefs.GetString("ServerName");
	ServerPort=PlayerPrefs.GetInt("ServerPort").ToString();
	
	ClientIP=PlayerPrefs.GetString("ClientIP");
	ClientPort=PlayerPrefs.GetInt("ClientPort").ToString();
	GetUserImage();
}



function GetUserImage(){
	if(System.IO.File.Exists(PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png"))
	{
		var awwwUIMG : WWW = new WWW ("file://"+PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png");
	
		while(PlayerPrefs.GetInt("WWW_BUSY")==1){
			yield;
		}
		PlayerPrefs.SetInt("WWW_BUSY",1);
		yield awwwUIMG; 
		PlayerPrefs.SetInt("WWW_BUSY",0);
		
		if(awwwUIMG.isDone){
			UserIcon=awwwUIMG.texture;
		}
	}
}

function Update () {
	if(List_update==60)
	{
		GenerateListWCam();
		List_update=0;
	}
	if(ResfreshUserIMG>=150){
		ResfreshUserIMG=0;
		GetUserImage();
	}


	if(GoToChangeSystemColor)
	{
		if(BASE.ColorPalettResult)
		{
			PlayerPrefs.SetInt("AutoColor",0);
			PlayerPrefs.SetFloat("SYSTEM_COLOR_R",BASE.ColorPalettR);
			PlayerPrefs.SetFloat("SYSTEM_COLOR_G",BASE.ColorPalettG);
			PlayerPrefs.SetFloat("SYSTEM_COLOR_B",BASE.ColorPalettB);
			PlayerPrefs.SetFloat("SYSTEM_COLOR_A",BASE.ColorPalettA);
			BASE.ColorPalettResult=false;
			ShowSettingUI=true;
			GoToChangeSystemColor=false;
		}
	}
	if(GoToChangeWallColor)
	{
		if(BASE.ColorPalettResult)
		{
			PlayerPrefs.SetFloat("WallColorR",BASE.ColorPalettR);
			PlayerPrefs.SetFloat("WallColorG",BASE.ColorPalettG);
			PlayerPrefs.SetFloat("WallColorB",BASE.ColorPalettB);
			BASE.ColorPalettResult=false;
			ShowSettingUI=true;
			GoToChangeWallColor=false;
		}
	}
}


function OnGUI()
{
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_1") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_1"))
	{
		if(ShowSettingUI)
		{			
			var TMPSKN=GUI.skin;
			GUI.skin.label.fontSize=17;
			
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),300,PlayerPrefs.GetInt("MaxY")),SETTING_MENU_WALLPAPER);
			if(ActualTabID==0)  // Sistema
			{
				GUI.Label(Rect(400,80,200,40),PlayerPrefs.GetString("SYS_STRING_13")+":");
				GUI.skin=SYSTEM_SKIN;
				if(GUI.Button(Rect(400,130,100,90),PT_FLAG))
				{
					PlayerPrefs.SetInt("SYSTEM_LANGUAGE_CHANGE",0);
					PlayerPrefs.SetString("SYSTEM_LANGUAGE","PT");
				}	
				if(GUI.Button(Rect(510,130,100,90),EN_FLAG))
				{
					PlayerPrefs.SetInt("SYSTEM_LANGUAGE_CHANGE",0);
					PlayerPrefs.SetString("SYSTEM_LANGUAGE","EN");
				}
				if(GUI.Button(Rect(620,130,80,90),FR_FLAG))
				{
					PlayerPrefs.SetInt("SYSTEM_LANGUAGE_CHANGE",0);;
					PlayerPrefs.SetString("SYSTEM_LANGUAGE","FR");
				}	
				
				if(PlayerPrefs.GetInt("AutoLogin")==1)
				{
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,310,50,50),""))
					{
						PlayerPrefs.SetInt("AutoLogin",0);
					}
					GUI.Label(Rect(460,330,300,40),PlayerPrefs.GetString("SYS_STRING_42"));
				}else{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,310,50,50),""))
					{
						PlayerPrefs.SetInt("AutoLogin",1);
					}
					GUI.Label(Rect(460,330,300,40),PlayerPrefs.GetString("SYS_STRING_42"));
				}
				
				if(PlayerPrefs.GetInt("AO_Enable")==0)
				{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,360,50,50),""))
					{
						PlayerPrefs.SetInt("AO_Enable",1);
					}
				}
				else
				{
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,360,50,50),""))
					{
						PlayerPrefs.SetInt("AO_Enable",0);
					}
				}
				GUI.Label(Rect(460,380 ,200,40),"Ambient Occlusion (Experimental)");
				
				if(PlayerPrefs.GetInt("Blur_Enable")==0)
				{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,410,50,50),""))
					{
						PlayerPrefs.SetInt("Blur_Enable",1);
					}
				}
				else
				{
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,410,50,50),""))
					{
						PlayerPrefs.SetInt("Blur_Enable",0);
					}
				}
				GUI.Label(Rect(460,430 ,200,40),"Blur  (Experimental)");
				GUI.skin=TMPSKN;
				GUI.DrawTexture(Rect(0,80,300,50),selected_tab);
			}
			if(ActualTabID==1) // Aparencia
			{
				GUI.Label(Rect(400,80,200,40),PlayerPrefs.GetString("SYS_STRING_14")+":");
				GUI.skin=SYSTEM_SKIN;
				if(GUI.Button(Rect(400,130,150,40),PlayerPrefs.GetString("SYS_STRING_18")))
				{
					GUI.skin=SYSTEM_SKIN;
					BASE.ShowUI=false;
					BASE.ColorPalettShow=true;
					GoToChangeSystemColor=true;
					ShowSettingUI=false;
				}
				GUI.skin=TMPSKN;
				
				if(PlayerPrefs.GetInt("AutoColor")==0)
				{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,200,50,50),""))
					{
						PlayerPrefs.SetInt("AutoColor",1);
					}
				}
				else
				{
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,200,50,50),""))
					{
						PlayerPrefs.SetInt("AutoColor",0);
					}
				}
				GUI.Label(Rect(460,220 ,200,40),PlayerPrefs.GetString("SYS_STRING_85"));
				
				
				// Mudança de tipo de papel de parede
				GUI.Label(Rect(400,280,200,40),PlayerPrefs.GetString("SYS_STRING_31")+":");
				if(PlayerPrefs.GetInt("WallpaperType")==0)
				{
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,310,50,50),""))
					{
					}
					GUI.Label(Rect(460,330,200,40),PlayerPrefs.GetString("SYS_STRING_32"));
					
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,380,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",2);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,400,200,40),PlayerPrefs.GetString("SYS_STRING_34"));
					
					if(GUI.Button(Rect(400,450,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",3);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,470,200,40),PlayerPrefs.GetString("SYS_STRING_35"));
				}
				if(PlayerPrefs.GetInt("WallpaperType")==2)
				{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,310,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",0);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,330,200,40),PlayerPrefs.GetString("SYS_STRING_32"));
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,380,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",2);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,400,200,40),PlayerPrefs.GetString("SYS_STRING_34"));
					
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,450,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",3);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,470,200,40),PlayerPrefs.GetString("SYS_STRING_35"));
					
					if(PlayerPrefs.GetInt("OnlineWallpaperRandom")==1){
						GUI.skin=Check_True;
						if(GUI.Button(Rect(600,380,50,50),""))
						{
							PlayerPrefs.SetInt("OnlineWallpaperRandom",0);
							PlayerPrefs.SetInt("WallpaperType",2);
							Run2D.Mundar_wall=true;
						}
						GUI.Label(Rect(660,400,500,40),"Online");
					}else{
						GUI.skin=Check_False;
						if(GUI.Button(Rect(600,380,50,50),""))
						{
							PlayerPrefs.SetInt("OnlineWallpaperRandom",1);
							PlayerPrefs.SetInt("WallpaperType",2);
							Run2D.Mundar_wall=true;
						}
						GUI.Label(Rect(660,400,200,40),"Online");
					}
					
				}
				if(PlayerPrefs.GetInt("WallpaperType")==3)
				{
					GUI.skin=Check_False;
					if(GUI.Button(Rect(400,310,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",0);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,330,200,40),PlayerPrefs.GetString("SYS_STRING_32"));
					
					if(GUI.Button(Rect(400,380,50,50),""))
					{
						PlayerPrefs.SetInt("WallpaperType",2);
						Run2D.Mundar_wall=true;
					}
					GUI.Label(Rect(460,400,200,40),PlayerPrefs.GetString("SYS_STRING_34"));
										
					GUI.skin=Check_True;
					if(GUI.Button(Rect(400,450,50,50),""))
					{
					}
					GUI.Label(Rect(460,470,200,40),PlayerPrefs.GetString("SYS_STRING_35"));
					
					GUI.skin=SYSTEM_SKIN;
					GUI.skin.button.fontSize=16;
					
					var WebPaths : String[];
					WebPaths = Directory.GetFiles(PlayerPrefs.GetString("SYSTEM_PATH")+"/WALLPAPER/","*.LCM");
					
					var Ywall=280;
					for(CamFile in WebPaths){
						var AddrWeb=BASE.ReadFile(CamFile);
						
						var AFileDir=CamFile;
						var AFileNameWithExtension=Path.GetFileName(AFileDir);
						var AFileNameWithoutExtension=Path.GetFileNameWithoutExtension(AFileNameWithExtension);
						var AFileExtension=Path.GetExtension(AFileNameWithExtension);
						
						
						if(PlayerPrefs.GetString("WallpaperOnlineAdress")==AddrWeb){
							if(GUI.Button(Rect(600,Ywall,400,30),"<i><b><size=23>"+AFileNameWithoutExtension+"</size></b></i>"))
							{
								PlayerPrefs.SetString("WallpaperOnlineAdress",AddrWeb);
								Run2D.Mundar_wall=true;
							}
						}else{
							if(GUI.Button(Rect(600,Ywall,400,30),AFileNameWithoutExtension))
							{
								PlayerPrefs.SetString("WallpaperOnlineAdress",AddrWeb);
								Run2D.Mundar_wall=true;
							}
						}
						Ywall=Ywall+40;					
					}
				}
				
				GUI.DrawTexture(Rect(0,150,300,50),selected_tab);
			}
			if(ActualTabID==2) // Som 
			{
				GUI.DrawTexture(Rect(0,220,300,50),selected_tab);
			}
			if(ActualTabID==3) // Rede
			{
				
				GUI.DrawTexture(Rect(0,290,300,50),selected_tab);
			}
			if(ActualTabID==4) // Conta
			{
				ResfreshUserIMG++;
				List_update++;
				if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
				{
					var UserProfile=PlayerPrefs.GetString("UserProfile").Split("#"[0]);
					
					Debug.Log(PlayerPrefs.GetString("UserProfile"));
					
					var Nome=UserProfile[0];
					var Apelido=UserProfile[1];
					var Sexo=UserProfile[2];
					var DataNascimento=UserProfile[3];
					var Mail=UserProfile[4];
	 				
					GUI.DrawTexture(Rect(0,360,300,50),selected_tab);
					GUI.DrawTexture(Rect(390,110,200,160),UserIcon);
					
					var TMPSKN1=GUI.skin;
					
					GUI.skin.label.fontSize=27;
					GUI.skin.label.alignment=TextAnchor.UpperLeft;
					GUI.Label(Rect(600,110,400,50),"<i><b>"+Nome+" "+Apelido+"</b></i>");
					
					GUI.skin.label.fontSize=20;
					
					GUI.Label(Rect(600,140,400,50),BASE.GetAge(DataNascimento)+" "+PlayerPrefs.GetString("SYS_STRING_100")+"  ("+DataNascimento+")");
					GUI.Label(Rect(600,170,400,50),Mail);
									
					if(Sexo=="M"){
						GUI.DrawTexture(Rect(600,230,32,32),SexMale);
					}else{
						GUI.DrawTexture(Rect(600,230,32,32),SexFemale);
					}									
					GUI.skin=TMPSKN1;
					
					GUI.skin=GUI.skin=SYSTEM_SKIN;
					
					
					if(GUI.Button(Rect(390,300,150,30),PlayerPrefs.GetString("SYS_STRING_101"))){
						DC_UI=true;
					}	
					if(GUI.Button(Rect(570,300,150,30),PlayerPrefs.GetString("SYS_STRING_102"))){
						CP_UI=true;
					}				
				}else{
					ActualTabID=0;
				}				
			}
			if(ActualTabID==5) // Mundo3D
			{
				
				GUI.DrawTexture(Rect(0,430,300,50),selected_tab);
				GUI.skin=SYSTEM_SKIN;
				GUI.Label(Rect(400,80,400,40),PlayerPrefs.GetString("SYS_STRING_94")+":");
				if(GUI.Button(Rect(400,130,200,20),PlayerPrefs.GetString("SYS_STRING_95"))){
					PlayerPrefs.SetInt("3DScene",0);
				}
				if(GUI.Button(Rect(400,160,200,20),PlayerPrefs.GetString("SYS_STRING_96"))){
					PlayerPrefs.SetInt("3DScene",1);
				}
				if(GUI.Button(Rect(400,190,200,20),PlayerPrefs.GetString("SYS_STRING_97"))){
					PlayerPrefs.SetInt("3DScene",2);
				}
				
				if(GUI.Button(Rect(400,230,220,50),PlayerPrefs.GetString("SYS_STRING_122")))
				{
					GUI.skin=SYSTEM_SKIN;
					BASE.ShowUI=false;
					BASE.ColorPalettShow=true;
					GoToChangeWallColor=true;
					ShowSettingUI=false;
				}
			}
			if(ActualTabID==6) // Servidor
			{
				GUI.DrawTexture(Rect(0,500,300,50),selected_tab);
				GUI.DrawTexture(Rect(390,75,400,210),Setting_Back);
				if(PlayerPrefs.GetInt("ServerActive")==0)
				{
					GUI.skin=SYSTEM_SKIN;
					GUI.Label(Rect(400,80,200,40),PlayerPrefs.GetString("SYS_STRING_56")+":");					
					GUI.Label(Rect(400,130,200,40),PlayerPrefs.GetString("SYS_STRING_45")+":");
					ServerName=GUI.TextField(Rect(550,130,200,20),ServerName);
					GUI.Label(Rect(400,160,200,40),PlayerPrefs.GetString("SYS_STRING_57")+":");
					ServerPort=GUI.TextField(Rect(550,160,40,20),ServerPort);
					GUI.Label(Rect(400,190,200,40),PlayerPrefs.GetString("SYS_STRING_37")+":");
					ServerPassword=GUI.TextField(Rect(550,190,200,20),ServerPassword,25);
					
					if(GUI.Button(Rect(420,220,200,50),PlayerPrefs.GetString("SYS_STRING_58")))
					{
						PlayerPrefs.SetInt("ClientActive",0);
						PlayerPrefs.SetInt("ServerActive",1);
						PlayerPrefs.SetInt("ServerPort",System.Convert.ToInt32(ServerPort));
						PlayerPrefs.SetString("ServerName",ServerName);
						PlayerPrefs.SetString("ServerPassword",ServerPassword);
						Cursor.visible=true;
					}				
				}
				else
				{
					GUI.Label(Rect(400,80,500,40),PlayerPrefs.GetString("SYS_STRING_30")+":");
					GUI.skin=SYSTEM_SKIN;					
					GUI.Label(Rect(400,130,500,40),PlayerPrefs.GetString("SYS_STRING_45")+": "+PlayerPrefs.GetString("ServerName"));
					GUI.Label(Rect(400,160,500,40),PlayerPrefs.GetString("SYS_STRING_57")+": "+PlayerPrefs.GetInt("ServerPort").ToString());
					if(PlayerPrefs.GetString("ServerPassword")!="")
					{
						GUI.Label(Rect(400,190,500,40),PlayerPrefs.GetString("SYS_STRING_37")+": "+PlayerPrefs.GetString("ServerPassword"));
						GUI.Label(Rect(400,220,500,40),"IP: "+BASE.GetIP());
						if(GUI.Button(Rect(420,250,200,50),PlayerPrefs.GetString("SYS_STRING_59")))
						{
							PlayerPrefs.SetInt("ServerActive",0);
							PlayerPrefs.SetInt("ServerPort",320);
							PlayerPrefs.SetString("ServerName","MyServer");
							PlayerPrefs.SetString("ServerPassword","");
							Network.Disconnect(10);
							Cursor.visible=true;
						}
					}
					else
					{
						GUI.Label(Rect(400,190,500,40),"IP: "+BASE.GetIP());
						if(GUI.Button(Rect(420,220,200,50),PlayerPrefs.GetString("SYS_STRING_59")))
						{
							PlayerPrefs.SetInt("ServerActive",0);
							PlayerPrefs.SetInt("ServerPort",320);
							PlayerPrefs.SetString("ServerName","MyServer");
							PlayerPrefs.SetString("ServerPassword","");
							Network.Disconnect(10);
							Cursor.visible=true;
						}
					}
				}
				
				
				GUI.DrawTexture(Rect(390,295,400,210),Setting_Back);
				GUI.Label(Rect(400,300,500,40),PlayerPrefs.GetString("SYS_STRING_60")+":");	
				if(PlayerPrefs.GetInt("ClientActive")==0)
				{
					GUI.Label(Rect(400,350,500,40),"IP:");
					ClientIP=GUI.TextField(Rect(550,350,200,20),ClientIP);
					GUI.Label(Rect(400,380,500,40),PlayerPrefs.GetString("SYS_STRING_57")+":");
					ClientPort=GUI.TextField(Rect(550,380,40,20),ClientPort);
					GUI.Label(Rect(400,410,500,40),PlayerPrefs.GetString("SYS_STRING_37")+":");
					ClientPassword=GUI.PasswordField(Rect(550,410,200,20),ClientPassword, "*"[0], 25);
					if(GUI.Button(Rect(420,440,200,50),PlayerPrefs.GetString("SYS_STRING_61")))
					{
						PlayerPrefs.SetInt("ServerActive",0);
						PlayerPrefs.SetInt("ClientActive",1);
						PlayerPrefs.SetInt("ClientPort",System.Convert.ToInt32(ClientPort));
						PlayerPrefs.SetString("ClientIP",ClientIP);
						PlayerPrefs.SetString("ClientPassword",ClientPassword);
						Cursor.visible=true;
					}
				}
				else
				{
					GUI.Label(Rect(400,350,500,40),"IP: "+PlayerPrefs.GetString("ClientIP"));
					GUI.Label(Rect(400,380,500,40),PlayerPrefs.GetString("SYS_STRING_57")+": "+PlayerPrefs.GetInt("ClientPort").ToString());
					if(PlayerPrefs.GetString("ClientPassword")!="")
					{
						GUI.Label(Rect(400,410,500,40),PlayerPrefs.GetString("SYS_STRING_37")+": "+PlayerPrefs.GetString("SYS_STRING_63"));
					}
					else
					{
						GUI.Label(Rect(400,410,500,40),PlayerPrefs.GetString("SYS_STRING_37")+": "+PlayerPrefs.GetString("SYS_STRING_64"));
					}
					if(GUI.Button(Rect(420,440,200,50),PlayerPrefs.GetString("SYS_STRING_59")))
					{
						PlayerPrefs.SetInt("ClientActive",0);
						PlayerPrefs.SetInt("ClientPort",320);
						PlayerPrefs.SetString("ClientIP","127.0.0.1");
						PlayerPrefs.SetString("ClientPassword","");
						PlayerPrefs.SetString("ClientName","");
					}
					
					// IP!PORT!PASSWORD!NAME
					var ServerString=PlayerPrefs.GetString("ClientIP")+"!"+PlayerPrefs.GetInt("ClientPort").ToString()+"!"+PlayerPrefs.GetString("ClientPassword")+"!"+PlayerPrefs.GetString("ClientName");
					if(PlayerPrefs.GetString("SERVER_FAV").Contains(ServerString)){
						if(GUI.Button(Rect(650,440,50,50),DelServerFavICO))
						{
							var DataOfServerTMP1 = PlayerPrefs.GetString("SERVER_FAV");
							var DataOfServer1 = DataOfServerTMP1.Split("#"[0]);
							
							var NewServerStringDelet="";
							
							var NumeroServerDelet=0;
							for(server_item in DataOfServer1){
								if(ServerString!=server_item){
									if(server_item!="")
									{
										NewServerStringDelet=NewServerStringDelet+server_item+"#";
										NumeroServerDelet=NumeroServerDelet+1;
									}
								}
							}
							
							if(NumeroServerDelet==0)
							{
								NewServerStringDelet="";
							}
							PlayerPrefs.SetString("SERVER_FAV",NewServerStringDelet);	
						}
					}else{
						if(GUI.Button(Rect(650,440,50,50),AddServerFavICO))
						{
							PlayerPrefs.SetString("SERVER_FAV",PlayerPrefs.GetString("SERVER_FAV")+"#"+ServerString);
						}
					}
				}
				
			}
			//////////////////////////////////////////////////
			
			GUI.skin=Setting_Skin;											
			// Icones
			GUI.DrawTexture(Rect(30,80,50,50),SYSTEM_ICO);
			GUI.DrawTexture(Rect(30,150,50,50),APPARENCE_ICO);
			GUI.DrawTexture(Rect(30,220,50,50),SOUND_ICO);
			GUI.DrawTexture(Rect(30,290,50,50),NETWORK_ICO);
			GUI.DrawTexture(Rect(30,360,50,50),ACCOUNT_ICO);
			if(Application.loadedLevelName=="map001")
			{
				GUI.DrawTexture(Rect(30,430,50,50),MINIWORLD_ICO);
				if(PlayerPrefs.GetString("DEVICE")=="PC")
				{
					GUI.DrawTexture(Rect(30,500,50,50),SERVER_ICO);
				}
			}

			// Labels
			GUI.Label(Rect(90,80,210,50),PlayerPrefs.GetString("SYS_STRING_24"));
			GUI.Label(Rect(90,150,210,50),PlayerPrefs.GetString("SYS_STRING_25"));
			GUI.Label(Rect(90,220,210,50),PlayerPrefs.GetString("SYS_STRING_26"));
			GUI.Label(Rect(90,290,210,50),PlayerPrefs.GetString("SYS_STRING_27"));
			GUI.Label(Rect(90,360,210,50),PlayerPrefs.GetString("SYS_STRING_28"));
			if(Application.loadedLevelName=="map001")
			{
				GUI.Label(Rect(90,430,210,50),PlayerPrefs.GetString("SYS_STRING_29"));
				if(PlayerPrefs.GetString("DEVICE")=="PC")
				{
					GUI.Label(Rect(90,500,210,50),PlayerPrefs.GetString("SYS_STRING_30"));
				}
			}
										
			// Botoes do menu
			if(GUI.Button(Rect(0,80,300,50),""))
			{
				ActualTabID=0; // Sistema
			}
			if(GUI.Button(Rect(0,150,300,50),""))
			{
				ActualTabID=1; // Aparencia
			}
			if(GUI.Button(Rect(0,220,300,50),""))
			{
				ActualTabID=2; // Som
			}
			if(GUI.Button(Rect(0,290,300,50),""))
			{
				ActualTabID=3; // Rede
			}
			if(GUI.Button(Rect(0,360,300,50),""))
			{
				ActualTabID=4; // Conta
			}
			if(Application.loadedLevelName=="map001")
			{
				if(GUI.Button(Rect(0,430,300,50),""))
				{
					ActualTabID=5; // Mundo 3D
				}
				if(GUI.Button(Rect(0,500,300,50),""))
				{
					ActualTabID=6; // Servidor
				}
			}
			
			GUI.skin=TMPSKN;
		}
		
		if(DC_UI){
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
			GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-200,400,400),MiniWindow);
			var FontTMP3=GUI.color;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=24;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-200)+10,400,50),PlayerPrefs.GetString("SYS_STRING_101"));		
			GUI.skin.label.alignment=TextAnchor.UpperLeft;
			GUI.skin.label.fontSize=17;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-150)+10,400,180),PlayerPrefs.GetString("SYS_STRING_104")+"\n"+PlayerPrefs.GetString("SYS_STRING_105")+"\n\n"+PlayerPrefs.GetString("SYS_STRING_47")+"\n\n\n\n"+PlayerPrefs.GetString("SYS_STRING_106"));
			
			GUI.color=FontTMP3;
			GUI.skin=SYSTEM_SKIN;
			DC_Verification=GUI.PasswordField(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-65)+10,370,30),DC_Verification,"*"[0],25);
			
			if(BASE.Md5Sum(DC_Verification)==PlayerPrefs.GetString("USER_PASS")){
				GUI.skin=BTN_YES;
				if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)+70,50,50),""))
				{
					REMOVEMYACCONUT();
				}
			}
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)+70,50,50),""))
			{
				DC_Verification="";
				DC_UI=false;
			}
		
		}
		
		if(CP_UI){
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
			GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-200,400,400),MiniWindow);
			var FontTMP2=GUI.color;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=24;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-200)+10,400,50),PlayerPrefs.GetString("SYS_STRING_102"));		
			GUI.skin.label.alignment=TextAnchor.UpperLeft;
			GUI.skin.label.fontSize=17;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-150)+10,400,50),PlayerPrefs.GetString("SYS_STRING_81")+":");	
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,400,50),PlayerPrefs.GetString("SYS_STRING_103")+":");	
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-50)+10,400,50),PlayerPrefs.GetString("SYS_STRING_47")+":");
			
			GUI.color=FontTMP2;
			
			GUI.skin=SYSTEM_SKIN;
			CP_ActualPS=GUI.PasswordField(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-130)+10,370,30),CP_ActualPS,"*"[0],25);
			CP_NEWPS_0=GUI.PasswordField(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-80)+10,370,30),CP_NEWPS_0,"*"[0],25);
			CP_NEWPS_1=GUI.PasswordField(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-30)+10,370,30),CP_NEWPS_1,"*"[0],25);
			
			GUI.color=FontTMP2;
			
			if((BASE.Md5Sum(CP_ActualPS)==PlayerPrefs.GetString("USER_PASS")) && (CP_NEWPS_0==CP_NEWPS_1) && (CP_NEWPS_0!="")){
				GUI.skin=BTN_YES;
				if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)+70,50,50),""))
				{
					ChangeMyPassowrd();
				}
			}
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)+70,50,50),""))
			{
				CP_UI=false;
				CP_NEWPS_1="";
				CP_NEWPS_0="";
				CP_ActualPS="";
			}
		}
	}
}

function REMOVEMYACCONUT(){
	var DC_PHP = new WWWForm();
	DC_PHP.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
	DC_PHP.AddField("password",PlayerPrefs.GetString("USER_PASS"));
	
	var wwwDC=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/DeleteMe.php",DC_PHP);
	
	while(PlayerPrefs.GetInt("WWW_BUSY")==1){
		yield;
	}
	PlayerPrefs.SetInt("WWW_BUSY",1);
	yield wwwDC; 
	PlayerPrefs.SetInt("WWW_BUSY",0);

	if(wwwDC.error==null)
	{
		Debug.Log(wwwDC.text);
	}
	
	PlayerPrefs.SetString("USER_STAT","OFFLINE");
	
	System.IO.Directory.Delete(PlayerPrefs.GetString("USERDATAPATH")+PlayerPrefs.GetString("USER_ID_SISPIC"),true);
	
	BASE.DataSave=true;
	BASE.LOGOUT_PROCESS=true;
}

function ChangeMyPassowrd(){
	var CP_PHP = new WWWForm();
	CP_PHP.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
	CP_PHP.AddField("password",PlayerPrefs.GetString("USER_PASS"));
	CP_PHP.AddField("newpassword",BASE.Md5Sum(CP_NEWPS_1));
	
	var wwwCP=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/ChangePassword.php",CP_PHP);

	while(PlayerPrefs.GetInt("WWW_BUSY")==1){
		yield;
	}
	PlayerPrefs.SetInt("WWW_BUSY",1);
	yield wwwCP; 
	PlayerPrefs.SetInt("WWW_BUSY",0); 

	if(wwwCP.error==null)
	{
		Debug.Log(wwwCP.text);
		PlayerPrefs.SetString("USER_PASS",BASE.Md5Sum(CP_NEWPS_1));
	}
	CP_UI=false;
	CP_NEWPS_1="";
	CP_NEWPS_0="";
	CP_ActualPS="";
}

function GenerateListWCam()
{
	List_WC_page.Clear();
	var filePathsWC : String[] = Directory.GetFiles(PlayerPrefs.GetString("USERDATAPATH"),"*.*");
	
	var x=0;
	var y=0;
	
	
	for(File in filePathsWC)
	{
		if(y<=8)
		{
			var FileDir=File;
			var FileNameWithExtension=Path.GetFileName(FileDir);
			var FileNameWithoutExtension=Path.GetFileNameWithoutExtension(FileNameWithExtension);
			var FileExtension=Path.GetExtension(FileNameWithExtension);
			if(FileExtension==".wav" || FileExtension==".ogg")
			{
				if(y==0)
				{
					List_WC_page.Push("");
				}
				List_WC_page[x]=List_WC_page[x]+"#"+FileDir+"!"+FileNameWithoutExtension;
				y++;
				if(y==8)
				{
					y=0;
					x++;
				}
			}
		}			
	}
	if(List_WC_page[List_WC_page.length]=="")
	{
		List_WC_page.Pop();
	}
	
}
