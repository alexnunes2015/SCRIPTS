#pragma strict

import System;
import System.IO;
import UnityEngine;


private var wct : WebCamTexture;
private var devices : WebCamDevice[];
private var deviceName : String;

var Delete:GUISkin;

static var GetImageMode=false;
static var GetImageQDR="";

var Wall:Texture;

var Bar:Texture;
var CamIcon:Texture;
var SYSTEM_SKIN:GUISkin;
var IsInCamera=false;
var INSVISIBLE:GUISkin;
var WebCamImage:Texture;
var Disparo0=true;
var DisparoPhoto=false;
var NO_CAM:Texture;

/// Image Viwer ////
var ActualImage:Texture;
var ActualPath="";
///////////////////

var filesList = new Array();
var List_photo_page=new Array ();
var List_update=0;
var ListIndex=0;
var PicsInPag=0;
var PicsInPagBACK=0;

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var SET_AS_MENU=false;

var LastFileN=0;

var FlashT:Texture;
var NOFLASH:Texture;

var AllPics=new Array();

var InPage=0;

var Stat="loading";

var Clock:Texture;

var PrimEXE=true;

var ValidFilesPath=new Array();

function Start(){	
	GenerateList();
}

function Update(){
	var TMPValidFilesPath=new Array();
	
	
	TMPValidFilesPath=ValidFilesPath;
	
	if(List_update>=100)
	{
		List_update=0;
		var filePaths1 : String[];
		

		filePaths1 = Directory.GetFiles(PlayerPrefs.GetString("MyPictures"),"*.*");
		
		var TMPcont=0;
		
		ValidFilesPath.Clear();
		for(Foto1 in filePaths1)
		{
			var FileDir1=Foto1;
			var FileNameWithExtension1=Path.GetFileName(FileDir1);
			var FileNameWithoutExtension1=Path.GetFileNameWithoutExtension(FileNameWithExtension1);
			var FileExtension1=Path.GetExtension(FileNameWithExtension1);
			if(FileExtension1==".jpg" || FileExtension1==".png" || FileExtension1==".jpeg"){
				TMPcont++;
				ValidFilesPath.Add(Foto1);
			}
		}
		if(Stat=="loading"){
			if(!PrimEXE)	
			{	
				if(LastFileN!=TMPcont){
					GenerateList();
				}
			}
		}else{
			if(LastFileN!=TMPcont){
				Stat="loading";
				GenerateList();
			}
		}
		LastFileN=TMPcont;
	}
}

function GenerateList(){	
	var filePaths : String[];

	filePaths = Directory.GetFiles(PlayerPrefs.GetString("MyPictures"),"*.*");
	AllPics.Clear();
	
	var PicInPagTMP=0;
	
	// Calcular fotogarfias por pagina
	var AX=30;
	var AY=160;
	
	PicsInPag=0;
	
	while(true){
		AX=AX+220;
		if(AX>=Screen.width-200)
		{
			AX=30;
			AY=AY+250;
		}
		if(AY>=Screen.height-200)
		{
			break;
		}
		PicsInPag++;
	}
	PicsInPag++;
	//////////////////////////////////
	
	var I_TMPp=0;
	var I_TMPp2=0;
	
	for(Foto in filePaths)
	{
		var FileDir=Foto;
		var FileNameWithExtension=Path.GetFileName(FileDir);
		var FileNameWithoutExtension=Path.GetFileNameWithoutExtension(FileNameWithExtension);
		var FileExtension=Path.GetExtension(FileNameWithExtension);
		if(FileExtension==".jpg" || FileExtension==".png" || FileExtension==".jpeg")
		{
			if(I_TMPp>=ListIndex && PicsInPag>I_TMPp2)
			{
				var tentativas=0;
				while(true){
					var wwwTMPPIC : WWW = new WWW ("file://"+Foto);
					yield wwwTMPPIC; 
					if(wwwTMPPIC.error==null){
						if(wwwTMPPIC.isDone){
							AllPics.Add(wwwTMPPIC.texture);
							I_TMPp2++;
							break;
						}
					}
					tentativas++;
					if(tentativas>=5){
						break;
					}
				}
			}
			I_TMPp++;
		}
	}
	Stat="Loaded";
	PrimEXE=false;
	LastFileN=I_TMPp;
}

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_2") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_2"))
	{
		if(!IsInCamera){
			List_update=List_update+1;
			if(ActualPath=="")
			{
				GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
				GUI.DrawTexture(Rect(0,80,Screen.width,40),Bar);
				GUI.skin=SYSTEM_SKIN;
				if(GUI.Button(Rect(Screen.width-80,80,40,40),CamIcon)){
					IsInCamera=true;
					BASE.ShowUI=false;
				}				
				
				var X=30;
				var Y=160;
				
				var contador=0;						
										
				for(var pic:Texture in AllPics){
					if(GUI.Button(Rect(X,Y,200,200),pic)){
						if(!GetImageMode){
							ActualImage=pic;
							ActualPath=ValidFilesPath[ListIndex+contador];
						}else{
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
							PlayerPrefs.SetString("qdr_"+GetImageQDR,ValidFilesPath[ListIndex+contador]);
							GetImageQDR="";
							GetImageMode=false;
						}
					}
					X=X+220;
					if(X>=Screen.width-200)
					{
						X=30;
						Y=Y+250;
					}
					contador++;
				}
				
				
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				
				var TMPnPages=LastFileN/PicsInPag;
				
				
				if(LastFileN==0)
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));
				}
				else
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),InPage+" / "+TMPnPages);
				}
				GUI.skin.label.alignment=TextAnchor.MiddleLeft;
				if(Stat=="Loaded")
				{
					// BTNS andar para tras e frente na lista
					if(ListIndex==0)
					{
						GUI.skin=Back_BTN_Inactive;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{}
						if(LastFileN>PicsInPag)
						{
							GUI.skin=Next_BTN_Active;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
								InPage++;
								ListIndex=ListIndex+PicsInPag;
								PicsInPagBACK=PicsInPag;
								Stat="loading";
								GenerateList();
							}
						}
					}
					else
					{
						if(InPage!=TMPnPages)
						{
							GUI.skin=Back_BTN_Active;
							if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
							{
								ListIndex=ListIndex-PicsInPag;
								Stat="loading";
								InPage=InPage-1;
								GenerateList();
							}
							if(LastFileN>PicsInPag)
							{
								GUI.skin=Next_BTN_Active;
								if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
								{
									ListIndex=ListIndex+PicsInPag;
									InPage++;
									Stat="loading";
									GenerateList();
								}
							}
						}
						else
						{
							GUI.skin=Back_BTN_Active;
							if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
							{
								Stat="loading";
								InPage=InPage-1;
								ListIndex=ListIndex-PicsInPag;
								GenerateList();
							}
							if(LastFileN>PicsInPag)
							{
								GUI.skin=Next_BTN_Inactive;
								if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
								{
								}
							}
						}
					}		
					///////////////////////////////////////////
				}
				else
				{
					GUI.DrawTexture(Rect(Screen.width/2-32,Screen.height/2-32,64,46),Clock);
				}
			}else{
				BASE.ShowUI=false;
				GUI.skin=SYSTEM_SKIN;
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ActualImage);
				if(Input.mousePosition.y>Screen.height-90){
					GUI.DrawTexture(Rect(0,0,Screen.width,40),Bar);
					if(GUI.Button(Rect(Screen.width-250,0,200,30),PlayerPrefs.GetString("SYS_STRING_107"))){
						SET_AS_MENU=true;
					}
					if(GUI.Button(Rect(30,0,200,30),PlayerPrefs.GetString("SYS_STRING_120"))){
						BASE.ShowUI=true;
						ActualImage=null;
						ActualPath="";
					}
					GUI.skin=Delete;
					if(GUI.Button(Rect(Screen.width-30,0,30,30),"")){					
						BASE.DeleteFile_Path=ActualPath;
						BASE.DeleteFile_Check=true;
						BASE.DeleteFile_Msg=PlayerPrefs.GetString("SYS_STRING_99");
						BASE.ShowUI=true;
						ActualImage=null;
						ActualPath="";
					}
					
					if(SET_AS_MENU){						
						GUI.skin=SYSTEM_SKIN;
						if(GUI.Button(Rect(Screen.width-250,30,200,30),PlayerPrefs.GetString("SYS_STRING_108"))){
							PlayerPrefs.SetString("SYS_WALLPAPER",System.IO.Path.GetFileName(ActualPath));
							PlayerPrefs.SetInt("WallpaperType",0);
							Run2D.Mundar_wall=true;
							BASE.ShowUI=true;
							ActualImage=null;
							ActualPath="";
							SET_AS_MENU=false;
						}
						if(GUI.Button(Rect(Screen.width-250,60,200,30),PlayerPrefs.GetString("SYS_STRING_109"))){
							System.IO.File.Copy(ActualPath,PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png",true);
							SET_AS_MENU=false;
						}
					}
				}else{
					SET_AS_MENU=false;
				}
			}
		}else{
			var devices = WebCamTexture.devices;
			if(devices.Length>=1){
				if(Disparo0){			
					devices = WebCamTexture.devices;
			        deviceName = devices[0].name;
			        wct = new WebCamTexture(deviceName, 640, 360, 15);
			        WebCamImage = wct;
			        wct.Play();
			        Disparo0=false;
				}
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),WebCamImage);
				if(DisparoPhoto){
					var PATH="";
					PATH=PlayerPrefs.GetString("MyPictures");
					var PICNUM=0;
					var OK=false;
					var FileName="";
					while(!OK){
						FileName=PATH+"/PICTURE_"+PICNUM+".png";
						if(System.IO.File.Exists(FileName)){
							PICNUM++;
						}
						else
						{
							Application.CaptureScreenshot(FileName);
							GetComponent.<AudioSource>().Play();
							break;
						}
					}	
					DisparoPhoto=false;				
				}else{
					if(!GetComponent.<AudioSource>().isPlaying)
					{
						GUI.skin=SYSTEM_SKIN;
						if(GUI.Button(Rect(Screen.width-80,Screen.height/2-100,50,80),FlashT)){
							DisparoPhoto=true;
						}
						if(GUI.Button(Rect(Screen.width-80,Screen.height/2+80,50,80),NOFLASH)){
							IsInCamera=false;
							BASE.ShowUI=true;
							WebCamImage=null;
							wct.Stop();
						}
					}
				}
			}
			else
			{
				GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),NO_CAM);
				GUI.skin=INSVISIBLE;
				if(GUI.Button(Rect(0,0,Screen.width,Screen.height),"")){
					IsInCamera=false;
					BASE.ShowUI=true;
				}
			}
		}
	}else{
		if(ValidFilesPath.length<0){
			List_photo_page.clear();
			filesList.clear();	
			ValidFilesPath.clear();
			GetImageMode=false;
			GetImageQDR="";
		}
	}
}
