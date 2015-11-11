#pragma strict

import System.IO;

var FontT:Font;

var Wall:Texture;

var TimerS=0;

var Shutdown=false;

var INVISIBLE:GUISkin;
var EasterEgg=0;

var RESET_DATA=false;

function Start () {

}

function Update () {
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	if(Input.GetKeyDown(KeyCode.I)){
		RESET_DATA=true;
	}
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
	TimerS++;
	if(TimerS==750)
	{
		if(Application.platform==RuntimePlatform.LinuxPlayer){
			PlayerPrefs.SetString("USER_STAT","OFFLINE");
			PlayerPrefs.SetString("USER_ID_SISPIC","");
			PlayerPrefs.SetString("USER_Nick","");
			PlayerPrefs.SetString("USER_PASS","");
			PlayerPrefs.SetString("UserProfile","");
			PlayerPrefs.SetString("ListContacts","");
			try
			{
				for(file in System.IO.Directory.GetFileSystemEntries(PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/"))
				{
					System.IO.File.Delete(file);
				}
			}
			catch(e){
			}
			var LINUX_R = File.CreateText("/ZED/command"); 
			var TMP_CMD=PlayerPrefs.GetString("EXIT_CMD");
			PlayerPrefs.SetString("EXIT_CMD","");
		    LINUX_R.WriteLine(TMP_CMD);
		    LINUX_R.Close();
		}
	}
	if(TimerS==800)
	{
		if(RESET_DATA){
			PlayerPrefs.DeleteAll();
		}
		Shutdown=true;
		Application.Quit();
	}
}

function OnGUI(){
	
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),Wall);
	GUI.skin.font=FontT;
	var FontTMP1=GUI.color;
	GUI.skin.label.fontSize=30;
	GUI.color=Color.black;
	GUI.skin.label.alignment=TextAnchor.MiddleCenter;
	GUI.skin.label.fontStyle=FontStyle.Bold;
	GUI.color.a=0.5;
	if(EasterEgg<=5){
		GUI.Label(Rect(0,(Screen.height/2)-1,Screen.width,50),PlayerPrefs.GetString("SYS_STRING_44"));
		GUI.color=Color.blue;
		GUI.Label(Rect(1,(Screen.height/2)-2,Screen.width,50),PlayerPrefs.GetString("SYS_STRING_44"));
	}else{
		GUI.Label(Rect(0,(Screen.height/2)-1,Screen.width,50),"Hasta la vista baby");
		GUI.color=Color.red;
		GUI.Label(Rect(0,(Screen.height/2)-1,Screen.width,50),"Hasta la vista baby");
	}
	GUI.color=FontTMP1;
	GUI.skin=INVISIBLE;
	if(GUI.Button(Rect(0,0,Screen.width,Screen.height),"")){
		EasterEgg=EasterEgg+1;
	}
}

function OnApplicationQuit () {
	if(!Shutdown)
	{
		Application.CancelQuit();
	}
}



    
