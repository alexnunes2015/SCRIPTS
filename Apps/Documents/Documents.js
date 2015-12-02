#pragma strict

import System.IO;

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var DeleteDocument:GUISkin;

var filesList = new Array();

var List_Documents_Title:GUISkin;

var List_DocumentsIN_page=new Array ();
var List_update=0;
var ListIndex=0;

var Wall:Texture;

var NewIcon:Texture;

var SYS_DBG:Texture;
var MiniWindow:Texture;
var BAR:Texture;
var DOCUMENTICO:Texture;

var BTN_YES:GUISkin;
var BTN_NO:GUISkin;

var SaveIcon:Texture;
var BackIcon:Texture;
var Bookshelf_ICO:Texture;

var DEFAULTSKN:GUISkin;

///// New Document Dialog //////
var NewDocumentName="";
var NDShow=false;
////////////////////////////////

////// Add BOOKSHELF Dialog ////////////////
var ADD_BOOKSHELF_Show=false;
var ADD_BOOKSHELF_NAME="";
var ADD_BOOKSHELF_PATH="";
//////////////////////////////////////////

//// File Edit /////////////////
var FileName="";
var FileContent="";
var FilePath="";
///////////////////////////////

static var External_file="";

var ACTUAL_TAB=0;
//// TABS /////
// 0 - File Viwer
// 1 - File Edit

function Start () {
	NewDocumentName=PlayerPrefs.GetString("SYS_STRING_113");
}

function Update () {
	if(List_update>=100)
	{
		List_update=0;
		GenerateList();
	}

	if(External_file!=""){		
		var Data=External_file.Split("|"[0]);
		var _Name=Data[0];
		var _Extension=Data[1];
		var _FilePath=Data[2];
		
		FilePath=_FilePath;
		FileName=_Name;
		FileContent=BASE.ReadFile(FilePath);
		ACTUAL_TAB=1;
		BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_5");
		External_file="";
	}
}

function GenerateList()
{
	var filePaths : String[];
	List_DocumentsIN_page.Clear();
	
	filePaths = Directory.GetFiles(PlayerPrefs.GetString("MyDocuments"),"*.*");

	var x=0;
	var y=0;
	
	
	for(File in filePaths)
	{
		if(y<=8)
		{
			var FileDir=File;
			var FileNameWithExtension=Path.GetFileName(FileDir);
			var FileNameWithoutExtension=Path.GetFileNameWithoutExtension(FileNameWithExtension);
			var FileExtension=Path.GetExtension(FileNameWithExtension);
			if(FileExtension==".txt")
			{
				if(y==0)
				{
					List_DocumentsIN_page.Push("");
				}
				List_DocumentsIN_page[x]=List_DocumentsIN_page[x]+"#"+FileDir+"!"+FileNameWithoutExtension;
				y++;
				if(y==8)
				{
					y=0;
					x++;
				}
			}
		}			
	}
	if(List_DocumentsIN_page[List_DocumentsIN_page.length]=="")
	{
		List_DocumentsIN_page.Pop();
	}
	
}

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_5") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_5"))
	{
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,50),BAR);
		
		if(ACTUAL_TAB==0){		
			GUI.skin=DEFAULTSKN;
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY")+2,40,40),NewIcon)){
				NDShow=true;
			}	
			
			if(ADD_BOOKSHELF_Show || NDShow){
				if(ADD_BOOKSHELF_Show){
					GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
					GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-100,390,250),MiniWindow);
					var FontTMP4=GUI.color;
					GUI.color=Color.black;
					GUI.skin.label.fontSize=17;
					GUI.skin.label.alignment=TextAnchor.MiddleLeft;
					GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),"<size=21>   "+PlayerPrefs.GetString("SYS_STRING_112")+":</size>");		
					GUI.color=FontTMP4;
					GUI.skin=DEFAULTSKN;
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))-50,360,25),"Bookshelf 1")){
						PlayerPrefs.SetString("arm_Bookshelf",PlayerPrefs.GetString("arm_Bookshelf")+"&"+ADD_BOOKSHELF_NAME+"|TXT|"+ADD_BOOKSHELF_PATH);
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))-20,360,25),"Bookshelf 2")){
						PlayerPrefs.SetString("arm_Bookshelf 1",PlayerPrefs.GetString("arm_Bookshelf 1")+"&"+ADD_BOOKSHELF_NAME+"|TXT|"+ADD_BOOKSHELF_PATH);
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))+10,360,25),"Bookshelf 3")){
						PlayerPrefs.SetString("arm_Bookshelf 2",PlayerPrefs.GetString("arm_Bookshelf 2")+"&"+ADD_BOOKSHELF_NAME+"|TXT|"+ADD_BOOKSHELF_PATH);
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))+40,360,25),"Bookshelf 4")){
						PlayerPrefs.SetString("arm_Bookshelf 3",PlayerPrefs.GetString("arm_Bookshelf 3")+"&"+ADD_BOOKSHELF_NAME+"|TXT|"+ADD_BOOKSHELF_PATH);
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))+70,360,25),"Bookshelf 5")){
						PlayerPrefs.SetString("arm_Bookshelf 4",PlayerPrefs.GetString("arm_Bookshelf 4")+"&"+ADD_BOOKSHELF_NAME+"|TXT|"+ADD_BOOKSHELF_PATH);
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
					if(GUI.Button(Rect(((Screen.width/2)-200)+10,((Screen.height/2))+100,360,25),PlayerPrefs.GetString("SYS_STRING_17"))){
						ADD_BOOKSHELF_Show=false;
						ADD_BOOKSHELF_NAME="";
					}
				}						
													
				if(NDShow){
					GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
					GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-100,400,180),MiniWindow);
					var FontTMP3=GUI.color;
					GUI.color=Color.black;
					GUI.skin.label.fontSize=17;
					GUI.skin.label.alignment=TextAnchor.MiddleLeft;
					GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),"<size=21>   "+PlayerPrefs.GetString("SYS_STRING_111")+":</size>");		
					GUI.color=FontTMP3;
			
					GUI.skin=DEFAULTSKN;
					NewDocumentName=GUI.TextField(Rect(((Screen.width/2)-200)+10,((Screen.height/2))-50,360,25),NewDocumentName);
					
					if(NewDocumentName.Length>=1){
						GUI.skin=BTN_YES;
						if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)-10,50,50),""))
						{
							NDShow=false;
							if(System.IO.File.Exists(PlayerPrefs.GetString("MyDocuments")+"/"+NewDocumentName+".txt")){
								BASE.WriteFile(PlayerPrefs.GetString("MyDocuments")+"/"+NewDocumentName+"_0.txt","");
							}else{
								BASE.WriteFile(PlayerPrefs.GetString("MyDocuments")+"/"+NewDocumentName+".txt","");
							}
							NewDocumentName=PlayerPrefs.GetString("SYS_STRING_113");
						}
					}
					GUI.skin=BTN_NO;
					if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)-10,50,50),""))
					{
						NDShow=false;
						NewDocumentName=PlayerPrefs.GetString("SYS_STRING_113");
					}
				}
			}else{			
				List_update=List_update+1;
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				if((List_DocumentsIN_page.length-1).ToString()=="-1")
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));
				}
				else
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),ListIndex.ToString()+" / "+(List_DocumentsIN_page.length-1).ToString());
				}
				GUI.skin.label.alignment=TextAnchor.MiddleLeft;
				// BTNS andar para tras e frente na lista
				if(ListIndex==0)
				{
					GUI.skin=Back_BTN_Inactive;
					if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
					{}
					if((List_DocumentsIN_page.length-1)>0)
					{
						GUI.skin=Next_BTN_Active;
						if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
						{
							ListIndex++;
						}
					}
				}
				else
				{
					if(ListIndex!=List_DocumentsIN_page.length-1)
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex=ListIndex-1;
						}
						if((List_DocumentsIN_page.length-1)>0)
						{
							GUI.skin=Next_BTN_Active;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
								ListIndex=ListIndex+1;
							}
						}
					}
					else
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex=ListIndex-1;
						}
						if(List_DocumentsIN_page.length>0)
						{
							GUI.skin=Next_BTN_Inactive;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
							}
						}
					}
				}		
				///////////////////////////////////////////
				
				var YLista=120;
				var ListaVazia=true;
				
				var TMPname:String=List_DocumentsIN_page[ListIndex];
				var List_Documents_InPage = TMPname.Split("#"[0]);
				
				for (var value : String in List_Documents_InPage) {
					if(value!="")
					{
						var ActualDOCObject=value.Split("!"[0]);
						GUI.skin=DEFAULTSKN;
						if(GUI.Button(Rect(50,YLista,30,30),DOCUMENTICO))
						{
							FilePath=ActualDOCObject[0];
							FileName=System.IO.Path.GetFileNameWithoutExtension(FilePath);
							FileContent=ReadFileN(FilePath);
							ACTUAL_TAB=1;
						}
						GUI.skin=List_Documents_Title;
						if(GUI.Button(Rect(80,YLista,Screen.width-200,30),ActualDOCObject[1]))
						{
							FilePath=ActualDOCObject[0];
							FileName=System.IO.Path.GetFileNameWithoutExtension(FilePath);
							FileContent=ReadFileN(FilePath);
							ACTUAL_TAB=1;
						}
						GUI.skin=DeleteDocument;
						if(GUI.Button(Rect(Screen.width-70,YLista,30,30),""))
						{
							BASE.DeleteFile_Path=ActualDOCObject[0];
							BASE.DeleteFile_Msg=PlayerPrefs.GetString("SYS_STRING_110");
							BASE.DeleteFile_Check=true;
						}
						GUI.skin=DEFAULTSKN;
						if(GUI.Button(Rect(Screen.width-110,YLista,30,30),Bookshelf_ICO))
						{
							ADD_BOOKSHELF_Show=true;
							ADD_BOOKSHELF_NAME=ActualDOCObject[1];
							ADD_BOOKSHELF_PATH=ActualDOCObject[0];
						}
						YLista=YLista+40;
					}
				}
				YLista=120;	
			}
		}
									
		if(ACTUAL_TAB==1){	
			GUI.skin=DEFAULTSKN;
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY")+2,40,40),BackIcon)){
				FileName="";
				FilePath="";
				FileContent="";
				ACTUAL_TAB=0;
			}	
			GUI.Label(Rect(Screen.width/2,PlayerPrefs.GetInt("MinY")+2,255,40),FileName);
			if(GUI.Button(Rect(60,PlayerPrefs.GetInt("MinY")+2,40,40),SaveIcon)){
				BASE.WriteFile(FilePath,FileContent);
			}
			FileContent=GUI.TextArea(Rect(10,PlayerPrefs.GetInt("MinY")+45,Screen.width-20,Screen.height-165),FileContent);
		}	
	}
}

function ReadFileN(path:String)
{
	var sra : StreamReader = new System.IO.StreamReader(path);
    var resultado : String;
 
 	var FirstLine=true;
    while (!sra.EndOfStream) {
    	if(FirstLine){
    		resultado = resultado+sra.ReadLine();
    	}else{
    		resultado = resultado+"\n"+sra.ReadLine();
    	}
    	FirstLine=false;
    }
    
    sra.Close();
    return resultado;
}