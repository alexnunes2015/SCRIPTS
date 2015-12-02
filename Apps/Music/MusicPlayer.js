#pragma strict
import System.IO;

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var INVISIBLE:GUISkin;

var Fonte_Audio:AudioSource;
static var IsPlayingPPM=false;
var filesList = new Array();

var Couver3D:GameObject;
var Couver:GameObject;

var Wall:Texture;
var TitleShow:Texture;


var List_BTN_IsPlaying:GUISkin;
var List_BTN_IsNotPlaying:GUISkin;
var List_Music_Title:GUISkin;
var List_Icon:GUISkin;

var DeleteMusic:GUISkin;

var BTN_PLAY:GUISkin;
var BTN_STOP:GUISkin;
var BTN_PAUSE:GUISkin;
var LOOP_ON:GUISkin;
var LOOP_OFF:GUISkin;

var tmpMusicFile:String;
var tmpMusicName:String;
var tmpAlbumFile:String;
var MusicFile:String;
var MusicName:String;

var ResultByDisplay=0;

static var ExternalInfo="";

static var ExternalName="";

static var ExternalFile="";

var CouverDefault:Texture;
var ActualCover:Texture;

var TimeControler:GUISkin;

var View:String;

var List_music_page=new Array ();
var List_update=0;
var ListIndex=0;

static var TemorizadorRecover=0;

function Start () {
	View="List";
	Fonte_Audio.clip.name="#";
	if(PlayerPrefs.HasKey("Music_loop"))
	{
		if(PlayerPrefs.GetInt("Music_loop")==0)
		{
			Fonte_Audio.loop=false;
		}
		else
		{
			Fonte_Audio.loop=true;
		}
	}
	else
	{
		PlayerPrefs.SetInt("Music_loop",0);
	}
}

static function OpenMusic(filename:String){
	MusicPlayer.ExternalFile=filename;
}

function LoadAudio()
{
	var LOADED=false;
	if(tmpMusicFile!=null)
	{
		if(Fonte_Audio.isPlaying)
		{
			Fonte_Audio.Stop();
		}
		Resources.UnloadUnusedAssets();
		var urlMusic = "file://"+tmpMusicFile;
		var wwwMusic : WWW = new WWW (urlMusic);
		yield wwwMusic; 
		try{		
			Fonte_Audio.clip=wwwMusic.audioClip;
			Fonte_Audio.clip.name=tmpMusicName;
			Fonte_Audio.rolloffMode = AudioRolloffMode.Logarithmic;
			Fonte_Audio.ignoreListenerVolume=true;
			Fonte_Audio.spatialBlend = 0.0f; 
			Fonte_Audio.Play();
			ExternalName=tmpMusicName;
			LOADED=true;
		}catch(e){
			Debug.Log("Error Loading Song");
		}
		if(LOADED){
			if(System.IO.File.Exists(tmpAlbumFile))
			{
				var urlAlbum = "file://"+tmpAlbumFile;
				var wwwAlbum : WWW = new WWW (urlAlbum);

				while(PlayerPrefs.GetInt("WWW_BUSY")==1){
					yield;
				}
				PlayerPrefs.SetInt("WWW_BUSY",1);
				yield wwwAlbum; 
				PlayerPrefs.SetInt("WWW_BUSY",0);
				
				
				Couver.GetComponent.<Renderer>().material.mainTexture=wwwAlbum.texture;
			}
			else
			{
				Couver.GetComponent.<Renderer>().material.mainTexture=CouverDefault;
			}
			
			tmpMusicFile=null;
			tmpMusicName="";
		}else{
			View="List";
		}
	}
}

function Update () {
	TemorizadorRecover++;
	if(!PlayerPrefs.HasKey("RESET_TASKS") && TemorizadorRecover>=3){
		TemorizadorRecover=0;
		///// Recuperaçao e backup de dados anteriores /////////////////
		if(PlayerPrefs.HasKey("MusicPauseInfo")){
			if(PlayerPrefs.GetString("MusicPauseInfo")!=""){
				var BeforeData=PlayerPrefs.GetString("MusicPauseInfo").Split("|"[0]);;
				var FileNameBD=BeforeData[0];
				var PositionBD=parseFloat(BeforeData[1]);
				
				var bFileDir=FileNameBD;
				var bFileNameWithExtension=Path.GetFileName(bFileDir);
				var bFileNameWithoutExtension=Path.GetFileNameWithoutExtension(bFileNameWithExtension);
				var bFileExtension=Path.GetExtension(bFileNameWithExtension);
			
			
				Fonte_Audio.clip.name="#";
			    MusicFile=FileNameBD;
				tmpMusicFile=FileNameBD;
				tmpMusicName=bFileNameWithoutExtension;
				MusicName=bFileNameWithoutExtension;
				Fonte_Audio.time=0;
				tmpAlbumFile=FileNameBD+".jpg";
				LoadAudio();
				Fonte_Audio.time=PositionBD;
				
				PlayerPrefs.DeleteKey("MusicPauseInfo");
			}
		}
	}
	
	if(Fonte_Audio.isPlaying){
		// File / Position
		ExternalInfo=MusicFile+"|"+Fonte_Audio.time;
	}else{
		ExternalInfo="";
		ExternalName="";
	}
	//////////////////////////////////////////////////////////////////
	
	if(ExternalFile!=""){
		var aFileDir=ExternalFile;
		var aFileNameWithExtension=Path.GetFileName(aFileDir);
		var aFileNameWithoutExtension=Path.GetFileNameWithoutExtension(aFileNameWithExtension);
		var aFileExtension=Path.GetExtension(aFileNameWithExtension);
	
	
		Fonte_Audio.clip.name="#";
	    MusicFile=ExternalFile;
		tmpMusicFile=ExternalFile;
		tmpMusicName=aFileNameWithoutExtension;
		MusicName=aFileNameWithoutExtension;
		Fonte_Audio.time=0;
		tmpAlbumFile=ExternalFile+".jpg";
		LoadAudio();
		View="Player";
		ExternalFile="";
	}

	if(List_update>=100)
	{
		List_update=0;
		GenerateList();
	}
	IsPlayingPPM=Fonte_Audio.isPlaying;
	
}

function CalcMaxMusicByDisplay(){
	ResultByDisplay=0;
	var Y_CalcMSBD=120;
	if(!Fonte_Audio.isPlaying){
		while(Y_CalcMSBD<=Screen.height+210){
			ResultByDisplay++;
			Y_CalcMSBD=Y_CalcMSBD+70;
		}
	}else{
		while(Y_CalcMSBD<=Screen.height+90){
			ResultByDisplay++;
			Y_CalcMSBD=Y_CalcMSBD+70;
		}
	}
}

function GenerateList()
{
	CalcMaxMusicByDisplay();
	
	var filePaths : String[];
	List_music_page.Clear();

	filePaths = Directory.GetFiles(PlayerPrefs.GetString("MyMusic"),"*.*");
	
	var x=0;
	var y=0;
	
	
	
	for(File in filePaths)
	{
		if(y<=ResultByDisplay)
		{
			var FileDir=File;
			var FileNameWithExtension=Path.GetFileName(FileDir);
			var FileNameWithoutExtension=Path.GetFileNameWithoutExtension(FileNameWithExtension);
			var FileExtension=Path.GetExtension(FileNameWithExtension);
			if(FileExtension==".wav" || FileExtension==".ogg")
			{
				if(y==0)
				{
					List_music_page.Push("");
				}
				List_music_page[x]=List_music_page[x]+"#"+FileDir+"!"+FileNameWithoutExtension;
				y++;
				if(y==ResultByDisplay)
				{
					y=0;
					x++;
				}
			}
		}			
	}
	if(List_music_page[List_music_page.length]=="")
	{
		List_music_page.Pop();
	}
	
}

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_10") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_10"))
	{		
		if(View=="List")
		{
			List_update=List_update+1;
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			if((List_music_page.length-1).ToString()=="-1")
			{
				GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));
			}
			else
			{
				GUI.Label(Rect(0,Screen.height-130,Screen.width,40),ListIndex.ToString()+" / "+(List_music_page.length-1).ToString());
			}
			GUI.skin.label.alignment=TextAnchor.MiddleLeft;
			// BTNS andar para tras e frente na lista
			if(ListIndex==0)
			{
				GUI.skin=Back_BTN_Inactive;
				if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
				{}
				if((List_music_page.length-1)>0)
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
				if(ListIndex!=List_music_page.length-1)
				{
					GUI.skin=Back_BTN_Active;
					if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
					{
						ListIndex=ListIndex-1;
					}
					if((List_music_page.length-1)>0)
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
					if(List_music_page.length>0)
					{
						GUI.skin=Next_BTN_Inactive;
						if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
						{
						}
					}
				}
			}		
			///////////////////////////////////////////
			
			var YLista=90;
			var ListaVazia=true;
			
			var TMPname:String=List_music_page[ListIndex];
			var List_Music_InPage = TMPname.Split("#"[0]);
			
			for (var value : String in List_Music_InPage) {
				if(value!="")
				{
					var ActualMusicObject=value.Split("!"[0]);
					
					if(ActualMusicObject[1]!=Fonte_Audio.clip.name)
					{
						GUI.skin=List_BTN_IsNotPlaying;
						if(GUI.Button(Rect(50,YLista,30,30),""))
						{
						     Fonte_Audio.clip.name="#";
						     MusicFile=ActualMusicObject[0];
							 tmpMusicFile=ActualMusicObject[0];
							 tmpMusicName=ActualMusicObject[1];
							 MusicName=ActualMusicObject[1];
							 Fonte_Audio.time=0;
							 tmpAlbumFile=ActualMusicObject[0]+".jpg";
							 LoadAudio();
							 View="Player";
						 }
						 GUI.skin=List_Music_Title;
						 if(GUI.Button(Rect(80,YLista,Screen.width-160,30),ActualMusicObject[1]))
						 {
							 Fonte_Audio.clip.name="#";
							 MusicFile=ActualMusicObject[0];
							 tmpMusicFile=ActualMusicObject[0];
							 tmpMusicName=ActualMusicObject[1];
							 MusicName=ActualMusicObject[1];
							 Fonte_Audio.time=0;
							 tmpAlbumFile=ActualMusicObject[0]+".jpg";
							 LoadAudio();
							 View="Player";
						 }
					 }
					 else
					 {
					 	GUI.skin=List_BTN_IsPlaying;
						if(GUI.Button(Rect(50,YLista,30,30),""))
						{
							View="Player";
						}
						GUI.skin=List_Music_Title;
						if(GUI.Button(Rect(80,YLista,Screen.width-160,30),ActualMusicObject[1]))
						 {
							 View="Player";
						 }
					 }
					GUI.skin=DeleteMusic;
					if(GUI.Button(Rect(Screen.width-70,YLista,30,30),""))
					{
						BASE.DeleteFile_Path=ActualMusicObject[0];
						BASE.DeleteFile_Msg=PlayerPrefs.GetString("SYS_STRING_84");
						BASE.DeleteFile_Check=true;
					}
					YLista=YLista+40;
				}
			}
			YLista=90;	
			
			if(Fonte_Audio.isPlaying){
				GUI.DrawTexture(Rect(10,Screen.height-170,Screen.width-20,40),TitleShow);	
				GUI.Label(Rect(10,Screen.height-170,Screen.width-20,40),"    <color=#00ff00ff><i>"+PlayerPrefs.GetString("SYS_STRING_12")+":</i></color>   <color=#008000ff>"+Fonte_Audio.clip.name+"</color>");
				GUI.skin=INVISIBLE;
				if(GUI.Button(Rect(10,Screen.height-170,Screen.width-20,40),"")){
					View="Player";
				}
			}
		}

		if(View=="Player")
		{
			GUI.skin=List_Music_Title;
			Couver3D.active=true;
			GUI.DrawTexture(Rect(10,Screen.height-210,Screen.width-20,140),TitleShow);
			if(Fonte_Audio.clip.name!="#")
			{
				if(PlayerPrefs.GetString("DEVICE")=="SMARTPHONE")
				{
					GUI.Label(Rect(20,Screen.height-190,Screen.width-60,90),"    <color=#00ff00ff><i>"+Fonte_Audio.clip.name+"</i></color>");
				}
				else
				{
					GUI.Label(Rect(20,Screen.height-190,Screen.width-60,90),"    <color=#00ff00ff><i>"+PlayerPrefs.GetString("SYS_STRING_12")+":</i></color> \n    <color=#008000ff>"+Fonte_Audio.clip.name+"</color>");
				}
			}
			else
			{
				GUI.Label(Rect(30,Screen.height-170,Screen.width-60,90),"    <color=#00ff00ff><i>"+PlayerPrefs.GetString("SYS_STRING_11")+"...</i></color>");
			}
			if(Fonte_Audio.isPlaying)
			{
				GUI.skin=BTN_PAUSE;
				if(GUI.Button(Rect(Screen.width-130,Screen.height-190,70,70),""))
				{
					Fonte_Audio.Pause();
				}
				GUI.skin=BTN_STOP;
				if(GUI.Button(Rect(Screen.width-210,Screen.height-190,70,70),""))
				{
					Fonte_Audio.Stop();
					Fonte_Audio.time=0;
				}
			}
			else
			{
				GUI.skin=BTN_PLAY;
				if(GUI.Button(Rect(Screen.width-130,Screen.height-190,70,70),""))
				{
					Fonte_Audio.Play();
				}
			}
			GUI.skin=List_Icon;
			if(GUI.Button(Rect(20,120,90,90),""))
			{
				View="List";
			}
			if(Fonte_Audio.loop)
			{
				GUI.skin=LOOP_ON;
				if(GUI.Button(Rect(20,270,90,90),""))
				{
					Fonte_Audio.loop=false;
					PlayerPrefs.SetInt("Music_loop",0);
				}
			}
			else
			{
				GUI.skin=LOOP_OFF;
				if(GUI.Button(Rect(20,270,90,90),""))
				{
					Fonte_Audio.loop=true;
					PlayerPrefs.SetInt("Music_loop",1);
				}
			}
			GUI.skin=TimeControler;
			var PosiAudio:Rect=new Rect(30,Screen.height-100,Screen.width-60,20);
			if(Input.GetMouseButton(0))
			{
				if(Fonte_Audio.isPlaying)
				{
					Fonte_Audio.time=GUI.HorizontalSlider(PosiAudio,Fonte_Audio.time+0.001,0f,Fonte_Audio.clip.length);
				}
			}
			else
			{
				GUI.HorizontalSlider(PosiAudio,Fonte_Audio.time+0.001,0f,Fonte_Audio.clip.length);
			}
		}
		else
		{
			Couver3D.active=false;
		}
	}
	else
	{
		Couver3D.active=false;
	}
}

