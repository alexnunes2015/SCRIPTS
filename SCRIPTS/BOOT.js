#pragma strict

import System.IO;

var timer=0;
var GetBug="NONE";
var CursorTexture:Texture2D;
var NCursorTexture:Texture2D;
var DeleteAllData=false;

var SPLASH:Texture;

var KeyBoardAnim=0;
var KeyBoardAnimTmp=0;

var RAY:GameObject;

var Ready=false;

function OnApplicationQuit () {
	Application.CancelQuit();
}

function Start () {
	
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		RAY.active=true;
	}
	
	// Cursor
	var cursorMode : CursorMode = CursorMode.Auto;
	// cursor hotspot (pixels from top left of image)
	var hotSpot : Vector2 = Vector2.zero;
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	if(Application.platform==RuntimePlatform.Android)
	{
		Cursor.SetCursor(NCursorTexture, Vector2.zero, cursorMode);
	}else{
		Cursor.SetCursor(CursorTexture, hotSpot, cursorMode);
	}
	/////
	
	Screen.sleepTimeout = SleepTimeout.NeverSleep;
	Cursor.visible=false;
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
	//Screen.SetResolution(1024,768,true,60);
	var Path1=System.IO.Directory.GetParent(Application.dataPath);
	PlayerPrefs.SetInt("P_LIGADO",1);
	
	PlayerPrefs.SetInt("MinY",62);
	PlayerPrefs.SetInt("MaxY",Screen.height-120);
		
	//Servidor Variaveis
	if(!PlayerPrefs.HasKey("ServerActive"))
	{
		PlayerPrefs.SetInt("ServerActive",0);
		PlayerPrefs.SetString("ServerPassword","SISPIC_ZED");
		PlayerPrefs.SetString("ServerName","My Server");
		PlayerPrefs.SetInt("ServerPort",320);
	}
	if(!PlayerPrefs.HasKey("ClientActive"))
	{
		PlayerPrefs.SetInt("ClientActive",0);
		PlayerPrefs.SetString("ClientPassword","SISPIC_ZED");
		PlayerPrefs.SetString("ClientIP","127.0.0.1");
		PlayerPrefs.SetInt("ClientPort",320);
	}
	///////////////////////////////////////
	
	
	// Variaveis de utilizador actual
	PlayerPrefs.SetString("USER_STAT","OFFLINE");
	PlayerPrefs.SetString("USER_ID_SISPIC","");
	PlayerPrefs.SetString("USER_Nick","");
	PlayerPrefs.SetString("USER_PASS","");
	/////////////////////////////////	

	if(!PlayerPrefs.HasKey("AutoColor"))
	{
		PlayerPrefs.SetInt("AutoColor",1);
	}
	
	if(!PlayerPrefs.HasKey("WallpaperType"))
	{
		// Tipos de papel de parede 
		// 0 - Imagem escolhida pelo utilizador
		// 2 - Papel de parede Random
		// 3 - Webcam Online
		PlayerPrefs.SetInt("WallpaperType",2);
		PlayerPrefs.SetString("WallpaperOnlineAdress","http://www.camscape.com/thumbnails/30579.jpg");
	}
	
	
	// Load System Language
	var LANGUAGE_FILE:String;
	if(PlayerPrefs.HasKey("SYSTEM_LANGUAGE"))
	{
		if(Application.platform==RuntimePlatform.Android)
		{
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="EN")
			{
				LANGUAGE_FILE="/sdcard/ZED/LANGUAGE/EN.language";
			}
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="PT")
			{
				LANGUAGE_FILE="/sdcard/ZED/LANGUAGE/PT.language";
			}
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="FR")
			{
				LANGUAGE_FILE="/sdcard/ZED/LANGUAGE/FR.language";
			}
		}
		if(Application.platform==RuntimePlatform.LinuxPlayer || Application.platform==RuntimePlatform.WindowsPlayer || Application.platform==RuntimePlatform.WindowsEditor)
		{
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="EN")
			{
				LANGUAGE_FILE=Directory.GetParent(Application.dataPath)+"/LANGUAGE/EN.language".ToString();
			}
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="PT")
			{
				LANGUAGE_FILE=Directory.GetParent(Application.dataPath)+"/LANGUAGE/PT.language".ToString();
			}
			if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="FR")
			{
				LANGUAGE_FILE=Directory.GetParent(Application.dataPath)+"/LANGUAGE/FR.language".ToString();
			}
		}
	}
	else
	{
		PlayerPrefs.SetString("SYSTEM_LANGUAGE","EN");
		if(Application.platform==RuntimePlatform.Android || Application.platform==RuntimePlatform.IPhonePlayer)
		{
			LANGUAGE_FILE="/sdcard/ZED/LANGUAGE/EN.language";
		}
		if(Application.platform==RuntimePlatform.LinuxPlayer || Application.platform==RuntimePlatform.WindowsPlayer || Application.platform==RuntimePlatform.WindowsEditor)
		{
			LANGUAGE_FILE=Directory.GetParent(Application.dataPath)+"/LANGUAGE/EN.language".ToString();
		}
	}
	var sr = new File.OpenText(LANGUAGE_FILE);
	PlayerPrefs.SetString("SYS_STRING_0",sr.ReadLine()); // Home
	PlayerPrefs.SetString("SYS_STRING_1",sr.ReadLine()); // Settings
	PlayerPrefs.SetString("SYS_STRING_2",sr.ReadLine()); // Gallery
	PlayerPrefs.SetString("SYS_STRING_3",sr.ReadLine()); // People
	PlayerPrefs.SetString("SYS_STRING_4",sr.ReadLine()); // Store
	PlayerPrefs.SetString("SYS_STRING_5",sr.ReadLine()); // Documents
	PlayerPrefs.SetString("SYS_STRING_6",sr.ReadLine()); // Games
	PlayerPrefs.SetString("SYS_STRING_7",sr.ReadLine()); // Applications
	PlayerPrefs.SetString("SYS_STRING_8",sr.ReadLine()); // Pictures
	PlayerPrefs.SetString("SYS_STRING_9",sr.ReadLine()); // Movies
	PlayerPrefs.SetString("SYS_STRING_10",sr.ReadLine()); // Music
	PlayerPrefs.SetString("SYS_STRING_11",sr.ReadLine()); // Loading
	PlayerPrefs.SetString("SYS_STRING_12",sr.ReadLine()); // Playing
	PlayerPrefs.SetString("SYS_STRING_13",sr.ReadLine()); // Language
	PlayerPrefs.SetString("SYS_STRING_14",sr.ReadLine()); // System Color
	PlayerPrefs.SetString("SYS_STRING_15",sr.ReadLine()); // Opacity
	PlayerPrefs.SetString("SYS_STRING_16",sr.ReadLine()); // OK
	PlayerPrefs.SetString("SYS_STRING_17",sr.ReadLine()); // Cancel
	PlayerPrefs.SetString("SYS_STRING_18",sr.ReadLine()); // Select Color
	PlayerPrefs.SetString("SYS_STRING_19",sr.ReadLine()); // Happy Year
	PlayerPrefs.SetString("SYS_STRING_20",sr.ReadLine()); // Search Empty textbox title - msg
	PlayerPrefs.SetString("SYS_STRING_21",sr.ReadLine()); // Search Empty textbox text0 - msg
	PlayerPrefs.SetString("SYS_STRING_22",sr.ReadLine()); // Search Empty textbox text1 - msg
	PlayerPrefs.SetString("SYS_STRING_23",sr.ReadLine()); // Search Empty textbox text2 - msg
	PlayerPrefs.SetString("SYS_STRING_24",sr.ReadLine()); // Settings - System
	PlayerPrefs.SetString("SYS_STRING_25",sr.ReadLine()); // Settings - Apparence
	PlayerPrefs.SetString("SYS_STRING_26",sr.ReadLine()); // Settings - Sound
	PlayerPrefs.SetString("SYS_STRING_27",sr.ReadLine()); // Settings - Network
	PlayerPrefs.SetString("SYS_STRING_28",sr.ReadLine()); // Settings - Account
	PlayerPrefs.SetString("SYS_STRING_29",sr.ReadLine()); // Settings - World3D
	PlayerPrefs.SetString("SYS_STRING_30",sr.ReadLine()); // Settings - Server
	PlayerPrefs.SetString("SYS_STRING_31",sr.ReadLine()); // Settings - Chose Wallpaper Type
	PlayerPrefs.SetString("SYS_STRING_32",sr.ReadLine()); // Settings - Chose Wallpaper Type - Static Wallpaper
	PlayerPrefs.SetString("SYS_STRING_33",sr.ReadLine()); // Settings - Chose Wallpaper Type - Video
	PlayerPrefs.SetString("SYS_STRING_34",sr.ReadLine()); // Settings - Chose Wallpaper Type - Random Wallpaper
	PlayerPrefs.SetString("SYS_STRING_35",sr.ReadLine()); // Settings - Chose Wallpaper Type - Online Webcam
	PlayerPrefs.SetString("SYS_STRING_36",sr.ReadLine()); // SiSpic ID
	PlayerPrefs.SetString("SYS_STRING_37",sr.ReadLine()); // Password
	PlayerPrefs.SetString("SYS_STRING_38",sr.ReadLine()); // SignIn
	PlayerPrefs.SetString("SYS_STRING_39",sr.ReadLine()); // Enter
	PlayerPrefs.SetString("SYS_STRING_40",sr.ReadLine()); // Inavlid Username or Password
	PlayerPrefs.SetString("SYS_STRING_41",sr.ReadLine()); // Welcome
	PlayerPrefs.SetString("SYS_STRING_42",sr.ReadLine()); // Log in automatically
	PlayerPrefs.SetString("SYS_STRING_43",sr.ReadLine()); // What do you want to do?
	PlayerPrefs.SetString("SYS_STRING_44",sr.ReadLine()); // Bye!
	PlayerPrefs.SetString("SYS_STRING_45",sr.ReadLine()); // Name
	PlayerPrefs.SetString("SYS_STRING_46",sr.ReadLine()); // Last Name
	PlayerPrefs.SetString("SYS_STRING_47",sr.ReadLine()); // Password Reverification
	PlayerPrefs.SetString("SYS_STRING_48",sr.ReadLine()); // Birth Date
	PlayerPrefs.SetString("SYS_STRING_49",sr.ReadLine()); // External Mail
	PlayerPrefs.SetString("SYS_STRING_50",sr.ReadLine()); // Sex
	PlayerPrefs.SetString("SYS_STRING_51",sr.ReadLine()); // Server not found
	PlayerPrefs.SetString("SYS_STRING_52",sr.ReadLine()); // existing account
	PlayerPrefs.SetString("SYS_STRING_53",sr.ReadLine()); // DB Server Error
	PlayerPrefs.SetString("SYS_STRING_54",sr.ReadLine()); // Register Form Error - Invalid data
	PlayerPrefs.SetString("SYS_STRING_55",sr.ReadLine()); // Passwords do not match
	PlayerPrefs.SetString("SYS_STRING_56",sr.ReadLine()); // Create Server
	PlayerPrefs.SetString("SYS_STRING_57",sr.ReadLine()); // Port
	PlayerPrefs.SetString("SYS_STRING_58",sr.ReadLine()); // Start
	PlayerPrefs.SetString("SYS_STRING_59",sr.ReadLine()); // STOP
	PlayerPrefs.SetString("SYS_STRING_60",sr.ReadLine()); // Connect to server
	PlayerPrefs.SetString("SYS_STRING_61",sr.ReadLine()); // Connect
	PlayerPrefs.SetString("SYS_STRING_62",sr.ReadLine()); // Desconnect
	PlayerPrefs.SetString("SYS_STRING_63",sr.ReadLine()); // Yes
	PlayerPrefs.SetString("SYS_STRING_64",sr.ReadLine()); // No
	PlayerPrefs.SetString("SYS_STRING_65",sr.ReadLine()); // Chat Global
	PlayerPrefs.SetString("SYS_STRING_66",sr.ReadLine()); // Contacts
	PlayerPrefs.SetString("SYS_STRING_67",sr.ReadLine()); // Server disconnected
	PlayerPrefs.SetString("SYS_STRING_68",sr.ReadLine()); // Not logged in SiSpic Networks
	PlayerPrefs.SetString("SYS_STRING_69",sr.ReadLine()); // To
	PlayerPrefs.SetString("SYS_STRING_70",sr.ReadLine()); // Subject
	PlayerPrefs.SetString("SYS_STRING_71",sr.ReadLine()); // Send
	PlayerPrefs.SetString("SYS_STRING_72",sr.ReadLine()); // Could not send the message
	PlayerPrefs.SetString("SYS_STRING_73",sr.ReadLine()); // Exist empty fields
	PlayerPrefs.SetString("SYS_STRING_74",sr.ReadLine()); // New message in your email
	PlayerPrefs.SetString("SYS_STRING_75",sr.ReadLine()); // Error while sending message
	PlayerPrefs.SetString("SYS_STRING_76",sr.ReadLine()); // Sent successfully
	PlayerPrefs.SetString("SYS_STRING_77",sr.ReadLine()); // From
	PlayerPrefs.SetString("SYS_STRING_78",sr.ReadLine()); // Connecting to server
	PlayerPrefs.SetString("SYS_STRING_79",sr.ReadLine()); // Please wait
	PlayerPrefs.SetString("SYS_STRING_80",sr.ReadLine()); // No items
	PlayerPrefs.SetString("SYS_STRING_81",sr.ReadLine()); // Enter your password
	PlayerPrefs.SetString("SYS_STRING_82",sr.ReadLine()); // Reply
	PlayerPrefs.SetString("SYS_STRING_83",sr.ReadLine()); // Want to delete this email?
	PlayerPrefs.SetString("SYS_STRING_84",sr.ReadLine()); // Really want to delete this song?
	PlayerPrefs.SetString("SYS_STRING_85",sr.ReadLine()); // Choose automatically
	PlayerPrefs.SetString("SYS_STRING_86",sr.ReadLine()); // New Contact
	PlayerPrefs.SetString("SYS_STRING_87",sr.ReadLine()); // New Group
	PlayerPrefs.SetString("SYS_STRING_88",sr.ReadLine()); // Separator to Group
	PlayerPrefs.SetString("SYS_STRING_89",sr.ReadLine()); // Delete contact
	PlayerPrefs.SetString("SYS_STRING_90",sr.ReadLine()); // Delete group
	PlayerPrefs.SetString("SYS_STRING_91",sr.ReadLine()); // New update Avaliable, Install now?
	PlayerPrefs.SetString("SYS_STRING_92",sr.ReadLine()); // Downloading Updates
	PlayerPrefs.SetString("SYS_STRING_93",sr.ReadLine()); // Download update finish
	PlayerPrefs.SetString("SYS_STRING_94",sr.ReadLine()); // Type of 3D scene
	PlayerPrefs.SetString("SYS_STRING_95",sr.ReadLine()); // None
	PlayerPrefs.SetString("SYS_STRING_96",sr.ReadLine()); // Coast
	PlayerPrefs.SetString("SYS_STRING_97",sr.ReadLine()); // Middle of the city
	PlayerPrefs.SetString("SYS_STRING_98",sr.ReadLine()); // Set as Wallpaper
	PlayerPrefs.SetString("SYS_STRING_99",sr.ReadLine()); // Delete this Picture
	PlayerPrefs.SetString("SYS_STRING_100",sr.ReadLine()); // Years Old
	PlayerPrefs.SetString("SYS_STRING_101",sr.ReadLine()); // Remove account
	PlayerPrefs.SetString("SYS_STRING_102",sr.ReadLine()); // change Password
	PlayerPrefs.SetString("SYS_STRING_103",sr.ReadLine()); // New Password
	PlayerPrefs.SetString("SYS_STRING_104",sr.ReadLine()); // Delete Account - Your account will be irreversibly deleted
	PlayerPrefs.SetString("SYS_STRING_105",sr.ReadLine()); // Delete Account - You will lose: Your settings, emails and contacts.
	PlayerPrefs.SetString("SYS_STRING_106",sr.ReadLine()); // Delete Account - You want to continue?
	PlayerPrefs.SetString("SYS_STRING_107",sr.ReadLine()); // Set as
	PlayerPrefs.SetString("SYS_STRING_108",sr.ReadLine()); // Wallpaper
	PlayerPrefs.SetString("SYS_STRING_109",sr.ReadLine()); // User Image
	PlayerPrefs.SetString("SYS_STRING_110",sr.ReadLine()); // Delete Document
	PlayerPrefs.SetString("SYS_STRING_111",sr.ReadLine()); // Name of document
	PlayerPrefs.SetString("SYS_STRING_112",sr.ReadLine()); // Select Bookshelf
	PlayerPrefs.SetString("SYS_STRING_113",sr.ReadLine()); // Without name
	PlayerPrefs.SetString("SYS_STRING_114",sr.ReadLine()); // Press Q to change
	PlayerPrefs.SetString("SYS_STRING_115",sr.ReadLine()); // Invitation to 3D world
	PlayerPrefs.SetString("SYS_STRING_116",sr.ReadLine()); // Invitation Sent
	PlayerPrefs.SetString("SYS_STRING_117",sr.ReadLine()); // I invite you to come into my 3D server
	PlayerPrefs.SetString("SYS_STRING_118",sr.ReadLine()); // Click to travel
	PlayerPrefs.SetString("SYS_STRING_119",sr.ReadLine()); // List of favorite servers
	PlayerPrefs.SetString("SYS_STRING_120",sr.ReadLine()); // Exit
	PlayerPrefs.SetString("SYS_STRING_121",sr.ReadLine()); // Trash
	PlayerPrefs.SetString("SYS_STRING_122",sr.ReadLine()); // Change wall color
	sr.Close();
	//////////////////////////////////////////////////////////////////////////////////////
	
	/// APPs Instaladas (GERADOR)
	if(!PlayerPrefs.HasKey("APPS_INSTALLED"))
	{
		PlayerPrefs.SetString("APPS_INSTALLED_LABEL",PlayerPrefs.GetString("SYS_STRING_1")+"#"+PlayerPrefs.GetString("SYS_STRING_2")+"#"+PlayerPrefs.GetString("SYS_STRING_3")+"#"+PlayerPrefs.GetString("SYS_STRING_4")+"#"+PlayerPrefs.GetString("SYS_STRING_5")+"#"+PlayerPrefs.GetString("SYS_STRING_6")+"#"+PlayerPrefs.GetString("SYS_STRING_10")+"#"+PlayerPrefs.GetString("SYS_STRING_7"));
		PlayerPrefs.SetString("APPS_INSTALLED_ICONS",PlayerPrefs.GetString("SYS_STRING_1")+"#"+PlayerPrefs.GetString("SYS_STRING_2")+"#"+PlayerPrefs.GetString("SYS_STRING_3")+"#"+PlayerPrefs.GetString("SYS_STRING_4")+"#"+PlayerPrefs.GetString("SYS_STRING_5")+"#"+PlayerPrefs.GetString("SYS_STRING_6")+"#"+PlayerPrefs.GetString("SYS_STRING_10")+"#"+PlayerPrefs.GetString("SYS_STRING_7"));
		
		/// Tipos de APPs
		// 0 - Apps Internos
		// 1 - Apps Externos
		PlayerPrefs.SetString("APPS_INSTALLED_TYPES","0#0#0#0#0#0#0#0#0#0#0");
	}
	//////////////////////////
	
	if(!PlayerPrefs.HasKey("SYSTEM_COLOR_R"))
	{
		PlayerPrefs.SetFloat("SYSTEM_COLOR_R",0);
		PlayerPrefs.SetFloat("SYSTEM_COLOR_G",0.1215686);
		PlayerPrefs.SetFloat("SYSTEM_COLOR_B",0.8156863);
		PlayerPrefs.SetFloat("SYSTEM_COLOR_A",0.3);
	}
	Ready=true;
}

function Update () {
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
	// DEBUG RESET ALL SYSTEM DATA
	if(Input.GetKeyDown(KeyCode.I))
	{
		DeleteAllData=true;
		GetBug="!ALL SYSTEM DATA IS RESET!";
	}
	/////////////////////////// END DEBUG
	timer++;
	
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		if(timer>=520 && Ready)
		{
			if(Application.platform==RuntimePlatform.Android || Application.platform==RuntimePlatform.IPhonePlayer)
			{
				PlayerPrefs.SetString("SYSTEM_PATH","/sdcard/ZED/");
				if(Screen.width==960 && Screen.height==540)
				{
					System.IO.Directory.CreateDirectory("/sdcard/ZED");
					System.IO.Directory.CreateDirectory("/sdcard/ZED/userdata");
					PlayerPrefs.SetString("USERDATAPATH","/sdcard/ZED/userdata/");
					Screen.orientation = ScreenOrientation.Portrait;
					PlayerPrefs.SetString("DEVICE","SMARTPHONE");
					if(DeleteAllData)
					{
						PlayerPrefs.DeleteAll();
						Application.Quit();
					}
					else
					{
						Application.LoadLevel("DESK2D_SMARTPHONE");
					}
					
				}
				else
				{
					System.IO.Directory.CreateDirectory("/sdcard/ZED");
					System.IO.Directory.CreateDirectory("/sdcard/ZED/userdata");
					PlayerPrefs.SetString("USERDATAPATH","/sdcard/ZED/userdata/");
					PlayerPrefs.SetString("DEVICE","TABLET");
					if(DeleteAllData)
					{
						PlayerPrefs.DeleteAll();
						Application.Quit();
					}
					else
					{
						//Application.LoadLevel("DESK2D_TABLET");
						Application.LoadLevel("Login");
					}
				}
			}else{
				PlayerPrefs.SetString("USERDATAPATH",Directory.GetParent(Application.dataPath)+"/UserData/");
				PlayerPrefs.SetString("DEVICE","PC");
				PlayerPrefs.SetString("SYSTEM_PATH",Directory.GetParent(Application.dataPath).ToString());
				if(DeleteAllData)
				{
					PlayerPrefs.DeleteAll();
					Application.Quit();
				}
				else
				{
					if(PlayerPrefs.HasKey("MY_OS_TASK")){
						Application.LoadLevel("Login");
					}else{
						Application.LoadLevel("FirstUse");
					}
				}
			}
		}
	}else{
		PlayerPrefs.SetString("USERDATAPATH",Directory.GetParent(Application.dataPath)+"/UserData/");
		PlayerPrefs.SetString("DEVICE","PC");
		PlayerPrefs.SetString("SYSTEM_PATH",Directory.GetParent(Application.dataPath).ToString());
		if(DeleteAllData)
		{
			PlayerPrefs.DeleteAll();
			Application.Quit();
		}
		else
		{
			if(PlayerPrefs.HasKey("MY_OS_TASK")){
				Application.LoadLevel("Login");
			}else{
				Application.LoadLevel("FirstUse");
			}
		}
	}
}

function OnGUI()
{
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SPLASH);
		// APENAS PARA DEBUG / DEBUG ONLY
		GUI.Label(Rect(0,0,Screen.width,Screen.height),"STARTING SISPIC ZED  DEBUG="+GetBug);
	}
}
