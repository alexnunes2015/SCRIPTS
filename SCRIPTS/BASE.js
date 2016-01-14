#pragma strict


import System.Net;
import System.IO;
var PastaDeSistema:String;

static var DataSave=false;

///// Visualizador de perfis /////////////
static var VP_Actual_profile:Texture;
static var VP_Show=false;
static var VP_Name="";
static var VP_LastName="";
static var VP_ID="";
static var VP_DATN="";
static var VP_SEX="M";

var SexMale:Texture;
var SexFemale:Texture;
var VP_SendIcon:Texture;
var VP_Addcontact:Texture;
var VP_Invit3D:Texture;
var VP_DeleteContact:Texture;
var VP_BACK:Texture;
/////////////////////////////////////

//KERNEL
static var SYS_CALL:String; // Chamadas basicas de sistema
static var SYSTEM_CALL:String; // Chamadas de sistema
static var DEBUG:String;


// Icones Padrao
var Files:Texture;
var Gallery:Texture;
var Games:Texture;
var Music:Texture;
var PeopleICO:Texture;
var Settings:Texture;
var Store:Texture;
var ApplicationICO:Texture;

var Network0:Texture;
var Network1:Texture;
var Network2:Texture;

var UserIcon:Texture;
//////////////////////////

///// Assistente
var Assistent:Texture;
static var ShowAssistente=false; 
////////////////

var Menu_Open=false;

///////////// Screen Saver
static var ScreenSaverTimer=0;
var ScreenSaverLogo:Texture;
var ScreenSaverBack:Texture;
var SCSX=0;
var SCSY=0;
var ScreenSaverAnimTimer=0;
var SCSLogoX=0;
var SCSLogoY=0;


/////////////////////////


////// Apagar ficheiro /////////
static var DeleteFile_Path="";
static var DeleteFile_Check=false;
static var DeleteFile_Msg="";
////////////////////////////////

// GERADORES DE SOM
var PPM:AudioSource;
//////////////////

//////////// Outros //////////
static var ShowDisplaySearch=false;
static var NetKBusy=false;
var BarShadow:Texture;
var BarShadow2:Texture;

var WhiteWall:Texture;

static var SHUTDOWN_PROCESS=false;
static var LOGOUT_PROCESS=false;

var BTN_YES:GUISkin;
var BTN_NO:GUISkin;

var tmpEffect=0;
var PPMEffectTimer=0;
var PPMEffect1:Texture;
var PPMEffect2:Texture;
var PPMEffect3:Texture;
var PPMEffect4:Texture;

var MiniWindow:Texture;

var BTN_Invisible:GUISkin;

var SYS_DBG:Texture;


var TOP_BAR:GameObject;
var DOWN_BAR:GameObject;
var APP_BACK:GameObject;

var BACK_ACTIVE:GUISkin;
var BACK_INACTIVE:GUISkin;
var PATH:GUISkin;
var DESK_TAIL:GUISkin;
var BTN_MENU:GUISkin;
var BTN_TaskBar:GUISkin;
var BTN_GO2D:GUISkin;
var BTN_GO3D:GUISkin;
var SYSTEM_SKIN:GUISkin;

var DeskSearch0:GUISkin;
var DeskSearch1:GUISkin;
var DeskSearchText="";
static var DeskSearchType="";
var BTN_Search:GUISkin;

var BTN_BAR_SEACRH:GUISkin;
var BTN_LOGOUT:GUISkin;
var BTN_SHUTDOWN:GUISkin;
var BTN_EXITSYS:GUISkin;
var BTN_REBOOT:GUISkin;

var SHUTDOWN_MENU=false;

var ShutLogTimer=500;

////////////////////////////////

// Variaveis de notificacoes do sistema
static var notify_type:int=0;
static var notify_text:String;
static var notify_timer:int=500;
////////////////////////////////////////

///// Tarefas / Tabs / Separadores
var BTN_Task:GUISkin;
var BTN_Task1:GUISkin;
static var Tasks = new Array ();
static var ActualTask=0;
var BTN_TaskKill:GUISkin;
var BTN_NewTask:GUISkin;

// Palete de cores
var XColorPalett=0;
var YColorPalett=0;
var ColorPalettTimer=0;
static var ColorPalettShow=false;
static var ColorPalettResult=false;
static var ColorPalettR:float;
static var ColorPalettG:float;
static var ColorPalettB:float;
static var ColorPalettA:float=0.5;
var ColorPalletColors:Texture2D;
var ColorPalletCursor:Texture;
var ColorPalettCursorRect= new Rect(0,0,20,20);
////////////

// Variaveis externas
static var ActualExternalIP="";
static var ShowUI=true;
static var APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
static var InternetStat="No_Network";
var TarefasSecundariasTimer=0;



// Mail Notif////
var Mail_0:Texture;
var Mail_1:Texture;
var Mail_2:Texture;
var Mail_Frame=0;
static var Mail_stat="";
/////////////////

/// SEND COMMENTS ////////////////////
var comentario_txt="Send us a comment of your ZED experience ;)"+
	"\nIf possible periodically send us feedback on your experience\n\n"+
	"What I thought from the appearance\n\n\nWhat I thought of the features\n\nWhat needs to be improved\n\nor something else";
var comentario_visible=false;

/////////////////////////////////////

function SendComment(){
	var commentPHP = new WWWForm();
	commentPHP.AddField("comment",comentario_txt);
	var wwwCMT=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/send_comment.php",commentPHP);
	
	comentario_visible=false;
	
	SYSTEM_NOTIFY(2,"Tank you :)");
	
	yield wwwCMT;
	comentario_txt="Send us a comment of your ZED experience ;)"+
	"\nIf possible periodically send us feedback on your experience\n\n"+
	"What I thought from the appearance\n\n\nWhat I thought of the features\n\nWhat needs to be improved\n\nor something else";
}



static function SYSTEM_NOTIFY(TYPE:int,TXT:String)
{
	notify_type=TYPE;
	notify_text=TXT;
}

static function GetExternalIP()
{
	var wwwEXIP : WWW = new WWW (PlayerPrefs.GetString("SYSTEM_IP")+"/external_ip.php");
	
	yield wwwEXIP;
	
	ActualExternalIP=wwwEXIP.text;
}

static function GetIP():String
{
	var strHostName:String = "";
	strHostName = System.Net.Dns.GetHostName();
	 
	 var ipEntry:IPHostEntry = System.Net.Dns.GetHostEntry(strHostName);
	 
	var addr:IPAddress[] = ipEntry.AddressList;
	 
	return addr[addr.Length-1].ToString();
 
}



function Start () {
	if(Application.platform!=RuntimePlatform.Android){
		(gameObject.GetComponent( "BlurOptimized" ) as MonoBehaviour).enabled = true;
	}else{
		(gameObject.GetComponent( "BlurOptimized" ) as MonoBehaviour).enabled = false;
	}	
	PlayerPrefs.SetInt("WWW_BUSY",0);
	PlayerPrefs.SetInt("RESET_TASKS",1);	
	VP_Actual_profile=UserIcon;
	GetUserImage();
	if(PlayerPrefs.GetString("DEVICE")=="TABLET")
	{
		if(Application.loadedLevelName=="DESK2D_TABLET"){
			if(ScreenSaverTimer<=9000){
				Cursor.visible=true;
			}
		}
	}
	else
	{
		PlayerPrefs.SetInt("LOCK3D",0);
	}
	SCSLogoX=Random.Range(0,Screen.width-50);
	SCSLogoY=Random.Range(0,Screen.height-50);
	Tasks.Add(PlayerPrefs.GetString("SYS_STRING_0"));
	DeskSearchType=PlayerPrefs.GetString("SYS_STRING_7");
	Run2D.Mundar_wall=true;
	
}

function GetUserImage(){
	if(System.IO.File.Exists(PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png"))
	{
		var awwwUIMG : WWW = new WWW ("file://"+PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png");

		yield awwwUIMG;
		
		if(awwwUIMG.isDone){
			UserIcon=awwwUIMG.texture;
		}
	}
}

function isLeapYear(year)
{
  return System.DateTime.IsLeapYear(year);
}


function Update () {	

	QualitySettings.vSyncCount = 0;  // VSync must be disabled
    Application.targetFrameRate = 45;
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
	
	
	if(PlayerPrefs.HasKey("Blur_Enable")){
		if(PlayerPrefs.GetInt("Blur_Enable")==2 && SHUTDOWN_PROCESS==false){
			PlayerPrefs.SetInt("Blur_Enable",1);
		}
		if(PlayerPrefs.GetInt("Blur_Enable")==1){
			(gameObject.GetComponent( "BlurOptimized" ) as MonoBehaviour).enabled = true;
		}else{
			(gameObject.GetComponent( "BlurOptimized" ) as MonoBehaviour).enabled = false;
		}
	}else{
		(gameObject.GetComponent( "BlurOptimized" ) as MonoBehaviour).enabled = false;
		PlayerPrefs.SetInt("Blur_Enable",0);
	}	
						
	PlayerPrefs.SetInt("MinY",58);
	PlayerPrefs.SetInt("MaxY",Screen.height-114);
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	
	if(SHUTDOWN_PROCESS==false){
		TarefasSecundariasTimer++;
		if(TarefasSecundariasTimer>=200){
			Resources.UnloadUnusedAssets();
			TarefasSecundarias();	
			TarefasSecundariasTimer=0;					
		}	
	}										
																						
	//// Barra de notificaÃƒÂ§oes frames ///////
	Mail_Frame++;
	if(Mail_Frame==20)
	{
		Mail_Frame=0;
	}
	////////////////////////////////////////////////
	
	
	/////////////////
	// Desligar
	if(SHUTDOWN_PROCESS)
	{
		APP_BACK.active=false;
		ShowUI=false;
		APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
		if(PlayerPrefs.GetInt("Blur_Enable")==1){
			PlayerPrefs.SetInt("Blur_Enable",2);
		}
		if(PPM.isPlaying)
		{
			// Efeito Fade Out ao desligar
			PPM.volume=PPM.volume-0.007;
			if(PPM.volume<=0)
			{
				ChangeScene("SHUTDOWN");
			}
		}
		else
		{
			if(ShutLogTimer==0)
			{
				ChangeScene("SHUTDOWN");
			}
			else
			{
				ShutLogTimer=ShutLogTimer-1;
			}
		}
	}
	/////////////

	if(Input.GetKeyDown(KeyCode.Escape))
	{
		if(APP_DISPLAY!=PlayerPrefs.GetString("SYS_STRING_0"))
		{
			Menu_Open=false;
			APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
		}else{
			Menu_Open=!Menu_Open;
		}
	}
	
	ScreenSaverTimer++;
	var DBtmp=PlayerPrefs.GetFloat("MicDB");
	if((SCSX!=Input.mousePosition.x && SCSY!=Input.mousePosition.y) || Input.anyKeyDown || DBtmp>=0.1)
	{
		if(ScreenSaverTimer>=9000)
		{
			LINUX_RUN("xscreensaver-command -deactivate");
		}
		ScreenSaverTimer=0;
	}
	SCSX=Input.mousePosition.x;
	SCSY=Input.mousePosition.y;
	
	///// Fim de janelas de sistema ///


	TOP_BAR.GetComponent.<GUITexture>().pixelInset.y=Screen.height/2-60+2;
	TOP_BAR.GetComponent.<GUITexture>().pixelInset.x=-Screen.width/2;
	TOP_BAR.GetComponent.<GUITexture>().pixelInset.width=Screen.width+Screen.width;
		
	
	DOWN_BAR.GetComponent.<GUITexture>().pixelInset.y=-Screen.height/2-4+2;
	DOWN_BAR.GetComponent.<GUITexture>().pixelInset.x=-Screen.width/2;
	DOWN_BAR.GetComponent.<GUITexture>().pixelInset.width=Screen.width+Screen.width;
	
	
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


var CorActual:Texture2D;
var CCorActual:Color;
function OnGUI()
{			
	// Janelas de sistema ///
	// Palete de Cores
	if(ColorPalettShow)
	{
		ColorPalettTimer++;
		
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),ColorPalletColors);
		
		if(Input.mousePosition.y>=140)
		{
			if(Input.GetMouseButton(0))
			{
				ColorPalettCursorRect=Rect(Input.mousePosition.x - 20, (Screen.height - Input.mousePosition.y) - 20,20 ,20);	
				XColorPalett=Input.mousePosition.x - 20;
				YColorPalett=Input.mousePosition.y;	
			}
		}
		
		if(ColorPalettTimer>=50){
			ColorPalettTimer=0;
			var TmpColorSelect=new Texture2D(Screen.width, Screen.height);
			TmpColorSelect.ReadPixels(new Rect(0,0,Screen.width,Screen.height),0,0);
			TmpColorSelect.Apply();	
			
			var CorTmp = TmpColorSelect.GetPixel(XColorPalett,YColorPalett);
			
			var TmpColorSelect1=new Texture2D(1, 1);
			TmpColorSelect1.SetPixel(0,0,CorTmp);
			TmpColorSelect1.SetPixel(0,1,CorTmp);
			TmpColorSelect1.SetPixel(1,0,CorTmp);
			TmpColorSelect1.SetPixel(1,1,CorTmp);
			TmpColorSelect1.Apply();	
			
			CorActual=TmpColorSelect1;	
			CCorActual=CorTmp;	
		}
		
		var TMPskin=GUI.skin;
		GUI.skin.label.fontSize = 26;
		var AlphaPercent:int=ColorPalettA*100;
		GUI.Label(Rect(230,Screen.height-100,800,80),PlayerPrefs.GetString("SYS_STRING_15")+" "+AlphaPercent+"%");
		GUI.skin=TMPskin;
		GUI.skin=SYSTEM_SKIN;
		var PosiColorA:Rect=new Rect(230,Screen.height-40,Screen.width-500,20);
		ColorPalettA=GUI.HorizontalSlider(PosiColorA,ColorPalettA,0.300,1);;
		if(GUI.Button(Rect(Screen.width-300,Screen.height-100,200,40),PlayerPrefs.GetString("SYS_STRING_16")))
		{
			ColorPalettResult=true;
			ColorPalettR=CCorActual.r;
			ColorPalettG=CCorActual.g;
			ColorPalettB=CCorActual.b;
			ColorPalettA=ColorPalettA;
			ColorPalettShow=false;
			ShowUI=true;
		}
		if(GUI.Button(Rect(Screen.width-500,Screen.height-100,200,40),PlayerPrefs.GetString("SYS_STRING_17")))
		{
			ColorPalettShow=false;
			ShowUI=true;
			Setting.ShowSettingUI=true;
		}
		GUI.DrawTexture( ColorPalettCursorRect , ColorPalletCursor );
		GUI.DrawTexture(Rect(30,Screen.height-80,100,60),CorActual);			
	}
	///////////////////////////////////////////////////////////////////
	
	/////////////////////////
	
	
	// Fim Janelas de Sistema /////////
	if(ShowUI)
	{
	
		// Ritmo musica If Playing
		if(MusicPlayer.IsPlayingPPM)
		{
			PPMEffectTimer=PPMEffectTimer+1;
			if(PPMEffectTimer==10)
			{
				PPMEffectTimer=0;
				tmpEffect=Random.Range(0,5);
			}
			switch(tmpEffect)
			{
				case 1:
					GUI.DrawTexture(Rect(0,Screen.height-40,Screen.width,40),PPMEffect1);
					break;
				case 2:
					GUI.DrawTexture(Rect(0,Screen.height-40,Screen.width,40),PPMEffect2);
					break;
				case 3:
					GUI.DrawTexture(Rect(0,Screen.height-40,Screen.width,40),PPMEffect3);
					break;
				case 4:
					GUI.DrawTexture(Rect(0,Screen.height-40,Screen.width,40),PPMEffect4);
					break;
				default:
					GUI.DrawTexture(Rect(0,Screen.height-40,Screen.width,40),PPMEffect1);
					break;
			}
		}
		///////////////////////////
		
		TOP_BAR.active=true;
		DOWN_BAR.active=true;
		// Transitor 3D / 2D
		if(Application.loadedLevelName=="DESK2D_TABLET")
		{
			GUI.skin=BTN_GO3D;
			if(GUI.Button(Rect(Screen.width-60,Screen.height-50,50,50),""))
			{
				PlayerPrefs.SetInt("RESET_TASKS",1);
				Setting.ActualTabID=0;
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
				Cursor.visible=false;
		        ChangeScene("map001");
		        if(MusicPlayer.IsPlayingPPM){
					PPM.Stop();
				}
			}
		}
		else
		{
			GUI.skin=BTN_GO2D;
			if(GUI.Button(Rect(Screen.width-60,Screen.height-50,50,50),""))
			{	
				PlayerPrefs.SetInt("RESET_TASKS",1);
				Setting.ActualTabID=0;
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
				Cursor.visible=true;
				ChangeScene("DESK2D_TABLET");
				if(MusicPlayer.IsPlayingPPM){
					PPM.Stop();
				}
			}
		}
		////////////////////////
		
		
		// Visualizador de rede
		if(InternetStat=="No_Network")
		{
			GUI.skin=BTN_TaskBar;
			if(GUI.Button(Rect(Screen.width-160,12,40,40),Network0))
			{
				ShowDisplaySearch=false;
				LINUX_RUN("network-admin");
			}
		}
		if(InternetStat=="OnLAN")
		{
			GUI.skin=BTN_TaskBar;
			if(GUI.Button(Rect(Screen.width-160,12,40,40),Network1))
			{
				LINUX_RUN("network-admin");
				ShowDisplaySearch=false;
			}
		}
		if(InternetStat=="online")
		{
			GUI.skin=BTN_TaskBar;
			if(GUI.Button(Rect(Screen.width-160,12,40,40),Network2))
			{
				LINUX_RUN("network-admin");
				ShowDisplaySearch=false;
			}
		}
		////////////////////////////////
		
		
		// Email Notify
		if(Mail_stat==""){
			if(GUI.Button(Rect(Screen.width-240,12,40,40),Mail_0))
			{
				People.POSITION=2;
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
				Tasks[ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
				ShowDisplaySearch=false;
			}
		}
		else
		{
			if(Mail_Frame>=10){
				if(GUI.Button(Rect(Screen.width-240,12,40,40),Mail_1))
				{
					People.POSITION=2;
					APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
					Tasks[ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
					ShowDisplaySearch=false;
				}
			}
			else
			{
				if(GUI.Button(Rect(Screen.width-240,12,40,40),Mail_2))
				{
					People.POSITION=2;
					APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
					Tasks[ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
					ShowDisplaySearch=false;
				}
			}
		}
		
		////////////////////
		
		/// UserIcon
		GUI.skin=BTN_TaskBar;
		if(GUI.Button(Rect(Screen.width-40,12,40,40),UserIcon)){
			//////
		}
		
		
		// Assistente
		GUI.skin=BTN_TaskBar;
		if(GUI.Button(Rect(Screen.width-200,12,40,40),Assistent))
		{
			ShowDisplaySearch=false;
			ShowAssistente=!ShowAssistente;
		}
		/////////////
		
		///// Enviar Comentario ////////
		if(APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_1"))
		{
			GUI.skin=SYSTEM_SKIN;
			if(GUI.Button(Rect(0,Screen.height-90,250,20),"feedback!"))
			{
				comentario_visible=!comentario_visible;
			}
		}
		////////////////////////////////
		
		
		///// Se no desktop(main) ////////
		if(APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
		{
			PlayerPrefs.SetInt("HasBlur",0);
		}else{
			PlayerPrefs.SetInt("HasBlur",1);
		}
		////////////////////////////////
		
		
		////////////////////////////
		
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
		GUI.Label(Rect(Screen.width-100,15,100,40),HoraS+":"+MinutoS);
		GUI.color=Color.yellow;
		GUI.Label(Rect(Screen.width-101,16,100,40),HoraS+":"+MinutoS);
		GUI.color=FontTMP0;
		
		
		/////////// Gestor de Separadores
		if(PlayerPrefs.HasKey("RESET_TASKS"))
		{
			Tasks.Clear();
			Tasks.Add(PlayerPrefs.GetString("SYS_STRING_0"));
			PlayerPrefs.DeleteKey("RESET_TASKS");
			ShowDisplaySearch=false;
		}
		var TaskX=30;
		var tmpTaskIndex=0;
		for (var TaskName : String in Tasks) {
			if(tmpTaskIndex==ActualTask){
				GUI.skin=BTN_Task1;
			}
			else
			{
				GUI.skin=BTN_Task;
			}
			if(GUI.Button(Rect(TaskX,Screen.height-56,182,50),TaskName))
			{
				APP_DISPLAY=TaskName;
				ActualTask=tmpTaskIndex;
				ShowDisplaySearch=false;
			}
			TaskX=TaskX+230;
			tmpTaskIndex++;		
		}
		
		if(tmpTaskIndex<5)
		{
			GUI.skin=BTN_NewTask;
			if(GUI.Button(Rect(TaskX,Screen.height-58,40,50),""))
			{	
				Tasks.Add(PlayerPrefs.GetString("SYS_STRING_0"));
				ActualTask=Tasks.length-1;
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
				ShowDisplaySearch=false;
			}
		}
		
		
		TaskX=210;
		var tmpIndex=0;
		if(tmpTaskIndex>1)
		{
			GUI.skin=BTN_TaskKill;
			var UltimaTask="";
			for (var TaskI : String in Tasks) {
				if(TaskI!=null)
				{
					if(GUI.Button(Rect(TaskX,Screen.height-58,20,50),""))
					{
						if(tmpIndex==ActualTask)
						{
							if(ActualTask>=1)
							{
								ActualTask=tmpIndex-1;
								APP_DISPLAY=UltimaTask;
								ShowDisplaySearch=false;
							}
							else
							{	
								APP_DISPLAY=Tasks[1];
							}
						}
						Tasks.RemoveAt(tmpIndex);
					}
					TaskX=TaskX+230;
					tmpIndex++;
				}
				UltimaTask=TaskI;
			}
		}
		
		/////////////////////////////////
		
		GUI.DrawTexture(Rect(0,58,Screen.width,10),BarShadow);
		GUI.DrawTexture(Rect(0,Screen.height-66,Screen.width,10),BarShadow2);
		GUI.skin=BTN_BAR_SEACRH;
		if(GUI.Button(Rect(535,0,40,58),""))
		{
			ShowDisplaySearch=!ShowDisplaySearch;
		}
		
		GUI.skin=BTN_EXITSYS;
		if(GUI.Button(Rect(595,0,40,58),""))
		{
			SHUTDOWN_MENU=true;
			ShowDisplaySearch=false;
		}
		
		
		// Quando e aberto a area princial (HOME)
		if(APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
		{
			APP_BACK.active=false;
			GUI.skin=BACK_INACTIVE;
			if(GUI.Button(Rect(30,8,50,50),""))
			{		
				Menu_Open=false;
				ShowDisplaySearch=false;	
			}
		}
		///////////////////////////////////
		else
		{
			APP_BACK.active=true;
			GUI.skin=BACK_ACTIVE;
			if(GUI.Button(Rect(30,8,50,50),""))
			{
				APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
				Tasks[ActualTask]=PlayerPrefs.GetString("SYS_STRING_0");
				Menu_Open=false;
				ShowDisplaySearch=false;
			}
		}
		// Abrir Menu Principal
		GUI.skin=PATH;
		if(GUI.Button(Rect(115,12,400,40),APP_DISPLAY))
		{
			Menu_Open=!Menu_Open;
			ShowDisplaySearch=false;
		}
		
		if(Menu_Open)
		{
			var APPS_list_label=PlayerPrefs.GetString("APPS_INSTALLED_LABEL").Split("#"[0]);
			var APPS_list_icons=PlayerPrefs.GetString("APPS_INSTALLED_ICONS").Split("#"[0]);
			var APPS_list_types=PlayerPrefs.GetString("APPS_INSTALLED_TYPES").Split("#"[0]);
			
			var APPS_list_ID=0;
			
			// Calcular papel de parede do menu e desenhar
			var Y_List=51;
			for(var labelT in APPS_list_label)
			{
				Y_List=Y_List+40;
			}
			GUI.DrawTexture(Rect(115,51,400,Y_List-50),WhiteWall);
			/////////////////////////////
			
			Y_List=51;
			for(var label in APPS_list_label)
			{
				GUI.skin=BTN_MENU;
				if(label==APP_DISPLAY)
				{
					GUI.skin.button.fontStyle=FontStyle.BoldAndItalic;
					GUI.skin.button.normal.textColor=Color.blue;
				}
				else
				{
					GUI.skin.button.fontStyle=FontStyle.Normal;
					GUI.skin.button.normal.textColor=Color.black;
				}
				if(GUI.Button(Rect(155,Y_List,360,40),label))
				{
					if(APPS_list_types[APPS_list_ID]=="0")
					{
						if(label!=PlayerPrefs.GetString("SYS_STRING_7") && label!=PlayerPrefs.GetString("SYS_STRING_6")){
							APP_DISPLAY=label;
							Tasks[ActualTask]=label;
							SYS_CALL=label;
						}else{
							if(label==PlayerPrefs.GetString("SYS_STRING_7")){
								LINUX_RUN("pcmanfm menu://applications/");
							}
							if(label==PlayerPrefs.GetString("SYS_STRING_6")){
								LINUX_RUN("pcmanfm menu://applications/Games");
							}
						}
					}
					Menu_Open=false;
					ShowDisplaySearch=false;
				}
				Y_List=Y_List+40;
				APPS_list_ID++;
			}
			Y_List=51;
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
					GUI.DrawTexture(Rect(115,Y_List,40,40),PeopleICO);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_2"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),Gallery);
				}
				if(Icon==PlayerPrefs.GetString("SYS_STRING_7"))
				{
					GUI.DrawTexture(Rect(115,Y_List,40,40),ApplicationICO);
				}				
				Y_List=Y_List+40;
			}
			GUI.skin=BTN_Invisible;
			if(GUI.Button(Rect(0,0,Screen.width,16),"")||GUI.Button(Rect(0,16,115,Screen.height),"")||GUI.Button(Rect(515,16,Screen.width-515,Screen.height-16),"")||GUI.Button(Rect(115,Y_List,400,Screen.height-(Y_List)),""))
			{
				Menu_Open=false;
			}
			
		}
		//////////////////////////
		
	}
	else
	{
		TOP_BAR.active=false;
		DOWN_BAR.active=false;
	}
	
	///////////////////////////////////////////////
	
	// Apagar ficheiro 
	if(DeleteFile_Check)
	{
		if(DeleteFile_Path!="" && DeleteFile_Msg!="")
		{
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
			GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-100,400,200),MiniWindow);
			var FontTMP2=GUI.color;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=20;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),DeleteFile_Msg);		
			GUI.color=FontTMP2;
			GUI.skin=BTN_YES;
			if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)+10,50,50),""))
			{
				System.IO.File.Delete(DeleteFile_Path);
				DeleteFile_Path="";
				DeleteFile_Msg="";
				DeleteFile_Check=false;
			}
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)+10,50,50),""))
			{
				DeleteFile_Path="";
				DeleteFile_Msg="";
				DeleteFile_Check=false;
			}
		}
		else
		{
			DeleteFile_Check=false;
		}
	}
	////////////////////////
	
	/// Envio de comentarios /////
	if(comentario_visible){
		GUI.skin=SYSTEM_SKIN;
		comentario_txt=GUI.TextArea(Rect(100,100,800,500),comentario_txt);
		if(GUI.Button(Rect(100,600,400,20),"Cancel")){
			comentario_visible=false;
		}
		if(GUI.Button(Rect(500,600,400,20),"Send")){
			SendComment();
		}
	}
	
	/////////////////////////////////////	
	
	// Menu de encerramento
	if(SHUTDOWN_MENU)
	{
		ShowDisplaySearch=false;
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
		if(!SHUTDOWN_PROCESS)
		{
			GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-100,400,200),MiniWindow);
			var FontTMP1=GUI.color;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=24;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),PlayerPrefs.GetString("SYS_STRING_43"));		
			GUI.color=FontTMP1;
			GUI.skin=BTN_SHUTDOWN;
			if(Input.GetKeyDown(KeyCode.Escape)){
				SHUTDOWN_PROCESS=false;
				SHUTDOWN_MENU=false;
			}
			if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)+10,50,50),""))
			{
				// ENCERRAR
				SHUTDOWN_PROCESS=true;
				PlayerPrefs.SetString("Contacts","");
				PlayerPrefs.SetString("EXIT_CMD","sleep 5;shutdown -h now");
				if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
				{
					SaveMySettingsOnline();	
				}
				else
				{
					PlayerPrefs.SetString("root_sl",PlayerPrefs.GetString("SYSTEM_LANGUAGE"));
					PlayerPrefs.SetInt("root_wt",PlayerPrefs.GetInt("WallpaperType"));
					PlayerPrefs.SetString("root_wall",PlayerPrefs.GetString("SYS_WALLPAPER"));
					PlayerPrefs.SetString("root_woa",PlayerPrefs.GetString("WallpaperOnlineAdress"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_R",PlayerPrefs.GetFloat("root_scR"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_G",PlayerPrefs.GetFloat("root_scG"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_B",PlayerPrefs.GetFloat("root_scB"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("root_scA"));
					PlayerPrefs.SetInt("root_ac",PlayerPrefs.GetInt("AutoColor"));
					PlayerPrefs.SetInt("root_owr",PlayerPrefs.GetInt("OnlineWallpaperRandom"));
					
					DataSave=true;
				}
			}
			
			GUI.skin=BTN_REBOOT;
			if(GUI.Button(Rect((Screen.width/2)+40,(Screen.height/2)+10,50,50),""))
			{
				// REINICIAR
				SHUTDOWN_PROCESS=true;
				PlayerPrefs.SetString("Contacts","");
				PlayerPrefs.SetString("EXIT_CMD","sleep 5;shutdown -r now");
				if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
				{
					SaveMySettingsOnline();	
				}
				else
				{
					PlayerPrefs.SetString("root_sl",PlayerPrefs.GetString("SYSTEM_LANGUAGE"));
					PlayerPrefs.SetInt("root_wt",PlayerPrefs.GetInt("WallpaperType"));
					PlayerPrefs.SetString("root_wall",PlayerPrefs.GetString("SYS_WALLPAPER"));
					PlayerPrefs.SetString("root_woa",PlayerPrefs.GetString("WallpaperOnlineAdress"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_R",PlayerPrefs.GetFloat("root_scR"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_G",PlayerPrefs.GetFloat("root_scG"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_B",PlayerPrefs.GetFloat("root_scB"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("root_scA"));
					PlayerPrefs.SetInt("root_ac",PlayerPrefs.GetInt("AutoColor"));
					PlayerPrefs.SetInt("root_owr",PlayerPrefs.GetInt("OnlineWallpaperRandom"));
					
					DataSave=true;
				}
			}
			GUI.skin=BTN_LOGOUT;
			if(GUI.Button(Rect((Screen.width/2)-20,(Screen.height/2)+10,50,50),""))
			{
				// LOGOF
				SHUTDOWN_PROCESS=true;
				PlayerPrefs.SetString("Contacts","");
				PlayerPrefs.SetString("EXIT_CMD","sleep 5;yad-logout");
				if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
				{
					SaveMySettingsOnline();	
				}
				else
				{
					PlayerPrefs.SetString("root_sl",PlayerPrefs.GetString("SYSTEM_LANGUAGE"));
					PlayerPrefs.SetInt("root_wt",PlayerPrefs.GetInt("WallpaperType"));
					PlayerPrefs.SetString("root_wall",PlayerPrefs.GetString("SYS_WALLPAPER"));
					PlayerPrefs.SetString("root_woa",PlayerPrefs.GetString("WallpaperOnlineAdress"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_R",PlayerPrefs.GetFloat("root_scR"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_G",PlayerPrefs.GetFloat("root_scG"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_B",PlayerPrefs.GetFloat("root_scB"));
					PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("root_scA"));
					PlayerPrefs.SetInt("root_ac",PlayerPrefs.GetInt("AutoColor"));
					PlayerPrefs.SetInt("root_owr",PlayerPrefs.GetInt("OnlineWallpaperRandom"));
					
					DataSave=true;
				}
			}
			
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)+10,50,50),""))
			{
				// CANCELAR
				SHUTDOWN_MENU=false;
			}
		}
	}
	///////////////////////////////////////	
	
	/////// Visualizador de perfis de utilizador //////
	if(VP_Show){
		ShowDisplaySearch=false;
		if(Application.loadedLevelName!="DESK2D_TABLET"){
			PlayerPrefs.SetInt("LOCK3D",1);
			if(ScreenSaverTimer<=9000){	
				Cursor.visible=true;
			}
		}
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
		GUI.DrawTexture(Rect((Screen.width/2)-250,(Screen.height/2)-200,500,200),MiniWindow);
		var FontTMP4=GUI.color;
		GUI.color=Color.black;
		GUI.skin.label.fontSize=17;
		GUI.skin.label.alignment=TextAnchor.MiddleCenter;
		
		var Idade=GetAge(VP_DATN);
		GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-270)+100,390,50),"<i><b><size=27>"+VP_Name+" "+VP_LastName+"</size></b></i>");
		GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-270)+120,390,50),"<i><size=17>("+VP_ID+")</size></i>");
		GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-270)+150,390,50),"<i><size=17>"+Idade+" "+PlayerPrefs.GetString("SYS_STRING_100")+" ("+VP_DATN+")</size></i>");
		GUI.color=FontTMP4;
		GUI.DrawTexture(Rect((Screen.width/2)-230,(Screen.height/2)-170,100,100),VP_Actual_profile);
		
		if(VP_SEX=="M"){
			GUI.DrawTexture(Rect(((Screen.width/2)-200)+70,((Screen.height/2)-280)+175,32,32),SexMale);
		}else{
			GUI.DrawTexture(Rect(((Screen.width/2)-200)+70,((Screen.height/2)-280)+175,32,32),SexFemale);
		}
		
		
		GUI.skin=SYSTEM_SKIN;
		if(GUI.Button(Rect(((Screen.width/2)-220),((Screen.height/2)-235)+175,32,32),VP_BACK)){
			VP_Show=false;
			VP_DATN="";
			VP_Name="";
			VP_LastName="";
			VP_ID="";
			VP_Actual_profile=null;			
		}
		if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
		{	
			if(PlayerPrefs.GetString("ListContacts").Contains(VP_ID)){
				if(GUI.Button(Rect(((Screen.width/2)+180),((Screen.height/2)-235)+175,32,32),VP_DeleteContact)){
					var DataOfContactsTMP1 = PlayerPrefs.GetString("ListContacts");
					var DataOfContacts1 = DataOfContactsTMP1.Split("+"[0]);
					
					var NewContactStringDelet="";
					var TMPStringContact=VP_Name+" "+VP_LastName+":"+VP_ID;
					
					var NumeroContactoDelet=0;
					for(contacto in DataOfContacts1){
						if(TMPStringContact!=contacto){
							if(contacto!="")
							{
								NewContactStringDelet=NewContactStringDelet+contacto+"+";
								NumeroContactoDelet=NumeroContactoDelet+1;
							}
						}
					}
					
					if(NumeroContactoDelet==0)
					{
						NewContactStringDelet="";
					}
					PlayerPrefs.SetString("ListContacts",NewContactStringDelet);	
				}
				
				if(GUI.Button(Rect(((Screen.width/2)+120),((Screen.height/2)-235)+175,32,32),VP_SendIcon)){
					People.POSITION=3;
					People.NewTo=VP_ID;
					People.NewSubject="";
					People.NewMsg="";
					People.NewProtected=false;
					APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
					Tasks[ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
					VP_Show=false;
				}
				
				if(GUI.Button(Rect(((Screen.width/2)+85),((Screen.height/2)-235)+175,32,32),VP_Invit3D)){
					VP_Show=false;
					People.SendMailExternal(VP_ID,PlayerPrefs.GetString("SYS_STRING_115"),"%COMMAND%CONNECT_3D_TO_ME:"+GetIP()+"|"+ActualExternalIP+":"+PlayerPrefs.GetInt("ServerPort")+":"+PlayerPrefs.GetString("ServerName")+":"+PlayerPrefs.GetString("ServerPassword"),false);	
					SYSTEM_NOTIFY(1,PlayerPrefs.GetString("SYS_STRING_116"));			
				}
			}else{
				if(GUI.Button(Rect(((Screen.width/2)+180),((Screen.height/2)-235)+175,32,32),VP_Addcontact)){
					PlayerPrefs.SetString("ListContacts",PlayerPrefs.GetString("ListContacts")+"+"+VP_Name+" "+VP_LastName+":"+VP_ID);	
				}
			}
		}
	}
	
	///////////////////////////////////////////////

	GUI.Label(Rect(0,0,Screen.width,Screen.height),DEBUG);
	
}

static function ChangeScene(scene_name:String)
{
	if(BASE.SHUTDOWN_PROCESS){
			Application.LoadLevel(scene_name);	
	}else{
		Setting.ActualTabID=0;
		PlayerPrefs.SetInt("RESET_TASKS",1);
		if(MusicPlayer.IsPlayingPPM){
			PlayerPrefs.SetString("MusicPauseInfo",MusicPlayer.ExternalInfo);
			MusicPlayer.TemorizadorRecover=0;
		}
		Application.LoadLevel(scene_name);
	}
}

function TarefasSecundarias(){
	if(PlayerPrefs.GetInt("WWW_BUSY")==0){
		PlayerPrefs.SetInt("WWW_BUSY",1);
		RefreshNetworkStat();
		GetUserImage();
		GetExternalIP();
		PlayerPrefs.SetInt("WWW_BUSY",0);
	}
}


function RefreshNetworkStat()
{
    if( Application.internetReachability != Application.internetReachability.NotReachable ) 
	{ 
		var weekdayPic : WWW = new WWW ("http://www.google.com"); 
		
		while(PlayerPrefs.GetInt("WWW_BUSY")==1){
			yield;
		}
		PlayerPrefs.SetInt("WWW_BUSY",1);
		yield weekdayPic; 
		PlayerPrefs.SetInt("WWW_BUSY",0);
		
		if(weekdayPic.error != null) 
		{ 
			InternetStat="No_Network";
		}else{ 
			InternetStat="online";
		} 
	}
}

function SaveMySettingsOnline()
{
	PlayerPrefs.SetString("SYS_WALLPAPER",PlayerPrefs.GetString("SYS_WALLPAPER"));

	var SaveSettingsPHP = new WWWForm();
	SaveSettingsPHP.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
	SaveSettingsPHP.AddField("password",PlayerPrefs.GetString("USER_PASS"));
	SaveSettingsPHP.AddField("SYSTEM_LANG",PlayerPrefs.GetString("SYSTEM_LANGUAGE"));
	SaveSettingsPHP.AddField("WallpaperType",PlayerPrefs.GetInt("WallpaperType"));
	SaveSettingsPHP.AddField("WEBCAMADDR",PlayerPrefs.GetString("WallpaperOnlineAdress"));
	SaveSettingsPHP.AddField("SYSTEM_COLOR_R",PlayerPrefs.GetFloat("SYSTEM_COLOR_R").ToString());
	SaveSettingsPHP.AddField("SYSTEM_COLOR_G",PlayerPrefs.GetFloat("SYSTEM_COLOR_G").ToString());
	SaveSettingsPHP.AddField("SYSTEM_COLOR_B",PlayerPrefs.GetFloat("SYSTEM_COLOR_B").ToString());
	SaveSettingsPHP.AddField("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("SYSTEM_COLOR_A").ToString());
	SaveSettingsPHP.AddField("SYS_WALLPAPER",SavePath(PlayerPrefs.GetString("SYS_WALLPAPER")));	
	SaveSettingsPHP.AddField("SYS_COLOR_AUTO",PlayerPrefs.GetInt("AutoColor").ToString());
	SaveSettingsPHP.AddField("OnlineWallpaperRandom",PlayerPrefs.GetInt("OnlineWallpaperRandom"));
	SaveSettingsPHP.AddField("WU",Md5Sum(PlayerPrefs.GetString("USER_ID_SISPIC")));
	if(PlayerPrefs.GetString("SERVER_FAV")=="" || PlayerPrefs.GetString("SERVER_FAV")=="|"){
		SaveSettingsPHP.AddField("SERVER_FAV","NOT");
	}else{		
		SaveSettingsPHP.AddField("SERVER_FAV",PlayerPrefs.GetString("SERVER_FAV"));
	}
	
	var wwwUIMG : WWW = new WWW ("file://"+PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png");
	
	yield wwwUIMG; 
	
	if(wwwUIMG.isDone){
		SaveSettingsPHP.AddBinaryData("UserImage",wwwUIMG.bytes);
	}
	
	var PathToWall="";
	
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		PathToWall="file://"+PlayerPrefs.GetString("MyPictures")+"\\"+PlayerPrefs.GetString("SYS_WALLPAPER");
	}else{
		PathToWall="file://"+PlayerPrefs.GetString("MyPictures")+"/"+PlayerPrefs.GetString("SYS_WALLPAPER");
	}
	var wwwUW : WWW = new WWW (PathToWall);
	yield wwwUW; 
	
	if(wwwUW.isDone){
		if(wwwUW.data.Length>0){
			SaveSettingsPHP.AddBinaryData("UserWall",wwwUW.bytes);
		}
	}
	

	if(PlayerPrefs.GetString("ListContacts")=="")
	{
		SaveSettingsPHP.AddField("cnt","NOT");
	}
	else
	{
		SaveSettingsPHP.AddField("cnt",PlayerPrefs.GetString("ListContacts"));
	}
	
	SaveSettingsPHP.AddField("Profile",PlayerPrefs.GetString("UserProfile"));
	
	var wwwSaveMySettings=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/logout.php",SaveSettingsPHP);
	
	PlayerPrefs.SetString("USER_STAT","OFFLINE");
	PlayerPrefs.SetString("USER_ID_SISPIC","");
	PlayerPrefs.SetString("USER_Nick","");
	PlayerPrefs.SetString("USER_PASS","");
	PlayerPrefs.SetString("ListContacts","");
	PlayerPrefs.SetString("SERVER_FAV","");
	
	yield wwwSaveMySettings; 
	Debug.Log(wwwSaveMySettings.text);
	
	DataSave=true;
}

/// Mensagens de sistema SYS_MSG
static function MsgShow(type:int,title:String,msg:String){
	// Types:
	// 0-Error
	// 1-Info
	// 2-Warning
	if(type==0){
		LINUX_RUN("zenity --error --text='"+msg+"' --title='"+title+"'");
	}
	if(type==1){
		LINUX_RUN("zenity --info --text='"+msg+"' --title='"+title+"'");
	}
	if(type==3){
		LINUX_RUN("zenity --warning --text='"+msg+"' --title='"+title+"'");
	}
}

//NotificaÃƒÆ’Ã‚Â§oes de sistema
static function NotifyShow(iconString:String,title:String,msg:String){
	// IconStrings on http://standards.freedesktop.org/icon-naming-spec/icon-naming-spec-latest.html
	LINUX_RUN("notify-send '"+title+"' '"+msg+"' --icon="+iconString);
}

function OnApplicationQuit () {
	Application.CancelQuit();
	Menu_Open=false;
	if(APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
	{
		SHUTDOWN_MENU=true;
	}
	else
	{
		APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
	}
}


static function LINUX_RUN(cmd:String)
{
	if(Application.platform==RuntimePlatform.LinuxPlayer){
    	WriteFile("/ZED/command",cmd);
    }
}

static function WriteFile(path:String,content:String)
{
	var sr = File.CreateText(path); 
    sr.WriteLine(content);
    sr.Close();
}

static function ReadFile(path:String)
{
	var sra : StreamReader = new System.IO.StreamReader(path);
    var resultado : String;
 
    while (!sra.EndOfStream) {
       resultado = resultado+sra.ReadLine();
    }
    
    sra.Close();
    return resultado;
}



static function GetAge(BDate:String){
	var DataA=BDate.Split("/"[0]);
	
	var Dia=System.Convert.ToInt32(DataA[0]);
	var Mes=System.Convert.ToInt32(DataA[1]);
	var Ano=System.Convert.ToInt32(DataA[2]);
	
	
	var AnoActual=System.DateTime.Now.Year-System.Convert.ToInt32(Ano);
	
	if (System.DateTime.Now.Month < Mes || 
        System.DateTime.Now.Month == Mes && System.DateTime.Now.Month < Mes) {
        AnoActual--;
    }
	return AnoActual;
}

function SavePath(Path_TMP:String){
	var NovaString="";
	for(var i=0;i<Path_TMP.Length;i++){
		if(Path_TMP[i]=="/"){
			NovaString=NovaString+"%";
		}
		else
		{
			NovaString=NovaString+Path_TMP[i];
		}
	}
	return NovaString;
}

static var GetUserProfile_RESULT="";
static function GetUserProfile(ID_SISPIC:String){
	var wwwGETpa = new WWWForm();
	wwwGETpa.AddField("Query_ID",ID_SISPIC);
	var wwwGETppaa=new WWW (PlayerPrefs.GetString("SYSTEM_IP")+"/GetUserProfile.php",wwwGETpa);

	yield wwwGETppaa; 
	
	var resultado_GUP:String="";
	
	if(wwwGETppaa.isDone){
		resultado_GUP=wwwGETppaa.text;
	}
	if(resultado_GUP!=""){
		GetUserProfile_RESULT=wwwGETppaa.text;	
	}
	else
	{
		GetUserProfile_RESULT=null;
	}
}

static function ViewUserProfile(ID_SISPIC:String){
	var wwwGETp = new WWWForm();
	wwwGETp.AddField("Query_ID",ID_SISPIC);
	BASE.VP_ID=ID_SISPIC;
	var wwwGETpp=new WWW (PlayerPrefs.GetString("SYSTEM_IP")+"/GetUserProfile.php",wwwGETp);

	yield wwwGETpp; 
	
	if(wwwGETpp.isDone){
		var Infos_Prefs=wwwGETpp.text.Split("#"[0]);
		
		BASE.VP_Name=Infos_Prefs[0];
		BASE.VP_LastName=Infos_Prefs[1];
		BASE.VP_SEX=Infos_Prefs[2];
		BASE.VP_DATN=Infos_Prefs[3];
				
		var awwwUIMGp : WWW = new WWW (PlayerPrefs.GetString("SYSTEM_IP")+"/userimg/"+ID_SISPIC+".png");

		yield awwwUIMGp; 
		
		if(awwwUIMGp.isDone){
			BASE.VP_Actual_profile=awwwUIMGp.texture;
			BASE.VP_Show=true;
		}
	}	
}

 
static function Md5Sum(strToEncrypt: String)
{
	var encoding = System.Text.UTF8Encoding();
	var bytes = encoding.GetBytes(strToEncrypt);
 
	// encrypt bytes
	var md5 = System.Security.Cryptography.MD5CryptoServiceProvider();
	var hashBytes:byte[] = md5.ComputeHash(bytes);
 
	// Convert the encrypted bytes back to a string (base 16)
	var hashString = "";
 
	for (var i = 0; i < hashBytes.Length; i++)
	{
		hashString += System.Convert.ToString(hashBytes[i], 16).PadLeft(2, "0"[0]);
	}
 
	return hashString.PadLeft(32, "0"[0]);
}
