#pragma strict

import System.Net;
import System.IO;
var PastaDeSistema:String;


// Papeis de parede Offline
var TempoMudarWallpaper=0;
var wp0:Texture;
var wp1:Texture;
var wp2:Texture;
var wp3:Texture;
var wp4:Texture;
var wp5:Texture;
var wp6:Texture;
var wp7:Texture;
var wp8:Texture;
var wp9:Texture;
var wp10:Texture;
/////////////////////////////

//KERNEL
static var SYS_CALL:String; // Chamadas basicas de sistema
static var SYSTEM_CALL:String; // Chamadas de sistema
static var DEBUG:String;
/////

var BTN_Invisible:GUISkin;
var APP_BACK:GameObject;
var Menu_Open=false;
var BarShadow:Texture;
var MiniWindow:Texture;
var PATH:GUISkin;
var BTN_MENU:GUISkin;
var BTN_TaskBar:GUISkin;
var SYSTEM_SKIN:GUISkin;

var BACK_ACTIVE:GUISkin;
var BACK_INACTIVE:GUISkin;

static var APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
static var InternetStat="No_Network";


// Icones Padrao
var Files:Texture;
var Gallery:Texture;
var Games:Texture;
var Music:Texture;
var People:Texture;
var Settings:Texture;
var Store:Texture;
///////////////////

var wall_path:String;
static var ShowUI=true;
static var Mundar_wall:boolean=false;
var img:WWW;
var Wallpaper:GameObject;
var TaskBarUP:GameObject;
var TaskBarDOWN:GameObject;

function Start () {

}

function Update () {
	PlayerPrefs.SetInt("MinY",80);
	PlayerPrefs.SetInt("MaxY",Screen.height-160);
	
	TempoMudarWallpaper=TempoMudarWallpaper+1;
	Wallpaper.GetComponent.<GUITexture>().pixelInset.x=-Screen.width/2-2;
	Wallpaper.GetComponent.<GUITexture>().pixelInset.y=-Screen.height/2;
	Wallpaper.GetComponent.<GUITexture>().pixelInset.height=Screen.height;
	Wallpaper.GetComponent.<GUITexture>().pixelInset.width=Wallpaper.GetComponent.<GUITexture>().texture.width;
	
	TaskBarUP.GetComponent.<GUITexture>().pixelInset.x=-Screen.width/2-50;
	TaskBarUP.GetComponent.<GUITexture>().pixelInset.y=Screen.height/2-80;
	TaskBarUP.GetComponent.<GUITexture>().pixelInset.height=80;
	TaskBarUP.GetComponent.<GUITexture>().pixelInset.width=Screen.width+100;
	
	TaskBarDOWN.GetComponent.<GUITexture>().pixelInset.x=-Screen.width/2-50;
	TaskBarDOWN.GetComponent.<GUITexture>().pixelInset.y=-Screen.height/2;
	TaskBarDOWN.GetComponent.<GUITexture>().pixelInset.height=80;
	TaskBarDOWN.GetComponent.<GUITexture>().pixelInset.width=Screen.width+100;
	
	
	TaskBarUP.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	TaskBarUP.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	TaskBarUP.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	TaskBarUP.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
	
	TaskBarDOWN.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	TaskBarDOWN.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	TaskBarDOWN.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	TaskBarDOWN.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
	
	// Transiçao de papel de parede
	if(TempoMudarWallpaper==0)
	{
		Wallpaper.GetComponent.<GUITexture>().color.r=0;
		Wallpaper.GetComponent.<GUITexture>().color.g=0;
		Wallpaper.GetComponent.<GUITexture>().color.b=0;
	}
	if(TempoMudarWallpaper>=1 && TempoMudarWallpaper<=50)
	{
		Wallpaper.GetComponent.<GUITexture>().color.r=Wallpaper.GetComponent.<GUITexture>().color.r+0.020;
		Wallpaper.GetComponent.<GUITexture>().color.g=Wallpaper.GetComponent.<GUITexture>().color.g+0.020;
		Wallpaper.GetComponent.<GUITexture>().color.b=Wallpaper.GetComponent.<GUITexture>().color.b+0.020;
	}
	if(TempoMudarWallpaper>=1000-50 && TempoMudarWallpaper<=1000)
	{
		Wallpaper.GetComponent.<GUITexture>().color.r=Wallpaper.GetComponent.<GUITexture>().color.r-0.020;
		Wallpaper.GetComponent.<GUITexture>().color.g=Wallpaper.GetComponent.<GUITexture>().color.g-0.020;
		Wallpaper.GetComponent.<GUITexture>().color.b=Wallpaper.GetComponent.<GUITexture>().color.b-0.020;
	}
	/////////////////////////////////
	
	if(TempoMudarWallpaper==1000)
	{
		if(PlayerPrefs.GetInt("WallpaperType")==2)
		{
			SortearWall();
		}
		TempoMudarWallpaper=0;
	}
	
	if(Mundar_wall||PlayerPrefs.GetInt("END_BOOT")==1)
	{
		// Papeis de parede escolhidos pelo utilizador
		if(PlayerPrefs.GetInt("WallpaperType")==0)
		{
			if(PlayerPrefs.HasKey("SYS_Wallpaper"))
			{
				wall_path=PlayerPrefs.GetString("SYS_Wallpaper");
				img=new WWW(wall_path);
				Wallpaper.GetComponent.<GUITexture>().texture=img.texture;
				Mundar_wall=false;	
			}
			else
			{
				if(PlayerPrefs.GetString("DEVICE")=="PC")
				{
					var Path01="file://";
					var Path11=System.IO.Directory.GetParent(Application.dataPath);
					var Path21="/Wallpaper/BlueAqua.png";
					wall_path=Path01+Path11+Path21;
				}
				else
				{
					var _Path01="file://";
					var _Path11="/sdcard/PORTAS";
					var _Path21="/Wallpaper/BlueAqua.png";
					wall_path=_Path01+_Path11+_Path21;
				}
				img=new WWW(wall_path);
				Wallpaper.GetComponent.<GUITexture>().texture=img.texture;
				PlayerPrefs.SetString("SYS_Wallpaper",wall_path);
			}
		}
		SortearWall();
	}
	PlayerPrefs.SetInt("END_BOOT",0);
	
	
	
	// CHAMADAS DE SISTEMA 
	// simples
	if(SYS_CALL!="")
	{
		APP_DISPLAY==SYS_CALL;
	}
	//
	if(SYSTEM_CALL!="")
	{}
	
	///////////////////////
}


// Papeis de parede Aleatorio (OFFLINE)
function SortearWall()
{
	var PapelRandom=Random.Range(0,11);
	switch(PapelRandom)
	{
		case 0:
			Wallpaper.GetComponent.<GUITexture>().texture=wp0;
			break;
		case 1:
			Wallpaper.GetComponent.<GUITexture>().texture=wp1;
			break;
		case 2:
			Wallpaper.GetComponent.<GUITexture>().texture=wp2;
			break;
		case 3:
			Wallpaper.GetComponent.<GUITexture>().texture=wp3;
			break;
		case 4:
			Wallpaper.GetComponent.<GUITexture>().texture=wp4;
			break;
		case 5:
			Wallpaper.GetComponent.<GUITexture>().texture=wp5;
			break;
		case 6:
			Wallpaper.GetComponent.<GUITexture>().texture=wp6;
			break;
		case 7:
			Wallpaper.GetComponent.<GUITexture>().texture=wp7;
			break;
		case 8:
			Wallpaper.GetComponent.<GUITexture>().texture=wp8;
			break;
		case 9:
			Wallpaper.GetComponent.<GUITexture>().texture=wp9;
			break;
		case 10:
			Wallpaper.GetComponent.<GUITexture>().texture=wp10;
			break;
		default:
			Wallpaper.GetComponent.<GUITexture>().texture=wp0;
			break;
	}
}


function OnGUI()
{
	if(ShowUI)
	{
		TaskBarUP.active=true;
		TaskBarDOWN.active=true;
		
		
		
		
		// Relogio
		var Hora=System.DateTime.Now.Hour;
		var Minuto=System.DateTime.Now.Minute;
		
		var HoraS=Hora.ToString();
		var MinutoS=Minuto.ToString();
		
		if(Hora<10)
		{
			HoraS='0'+HoraS;
		}
		if(Minuto<10)
		{
			MinutoS='0'+MinutoS;
		}
		
		var FontTMP0=GUI.color;
		GUI.skin.label.fontSize=25;
		GUI.color=Color.black;
		GUI.color.a=0.5;
		GUI.Label(Rect(30,Screen.height-60,100,40),HoraS+":"+MinutoS);
		GUI.color=Color.yellow;
		GUI.Label(Rect(31,Screen.height-61,100,40),HoraS+":"+MinutoS);
		GUI.color=FontTMP0;
		
		
		// DESKTOP
		
		GUI.DrawTexture(Rect(0,80,Screen.width,10),BarShadow);
		
		
		// BOTAO BACK
		// Quando e aberto a area princial (HOME)
		if(APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
		{
			APP_BACK.active=false;
			GUI.skin=BACK_INACTIVE;
			if(GUI.Button(Rect(30,30,50,50),""))
			{		
				Menu_Open=false;	
			}
		}
		///////////////////////////////////
		else
		{
			APP_BACK.active=true;
			GUI.skin=BACK_ACTIVE;
			if(GUI.Button(Rect(30,30,50,50),""))
			{
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");		
			}
		}
		///////////////////////
		// Abrir Menu Principal
		GUI.skin=PATH;
		if(GUI.Button(Rect(115,32,Screen.width-150,40),APP_DISPLAY))
		{
			Menu_Open=!Menu_Open;
		}
		
		if(Menu_Open)
		{
			var APPS_list_label=PlayerPrefs.GetString("APPS_INSTALLED_LABEL").Split("#"[0]);
			var APPS_list_icons=PlayerPrefs.GetString("APPS_INSTALLED_ICONS").Split("#"[0]);
			
			var Y_List=71;
			for(var label in APPS_list_label)
			{
				GUI.skin=BTN_MENU;
				if(label==APP_DISPLAY)
				{
					GUI.skin.button.fontStyle=FontStyle.Bold;
				}
				else
				{
					GUI.skin.button.fontStyle=FontStyle.Normal;
					GUI.skin.button.normal.textColor=Color.black;
				}
				if(GUI.Button(Rect(155,Y_List,Screen.width-190,40),label))
				{
					APP_DISPLAY=label;
					SYS_CALL=label;
					Menu_Open=false;
				}
				Y_List=Y_List+40;
			}
			Y_List=71;
			for(var Icon in APPS_list_icons)
			{
				if(Icon==PlayerPrefs.GetString("SYS_STRING_1"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Settings);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_5"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Files);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_6"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Games);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_4"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Store);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_10"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Music);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_3"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),People);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_2"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Gallery);
				}
				
				Y_List=Y_List+40;
			}
			GUI.skin=BTN_Invisible;
			if(GUI.Button(Rect(0,0,Screen.width,16),"")||GUI.Button(Rect(0,16,115,Screen.height),"")||GUI.Button(Rect(515,16,Screen.width-515,Screen.height-16),"")||GUI.Button(Rect(115,Y_List,400,Screen.height-(Y_List)),""))
			{
				Menu_Open=false;
			}
			
		}
		
		/////////////
		
	}
	else
	{
		TaskBarUP.active=false;
		TaskBarDOWN.active=false;
	}
}