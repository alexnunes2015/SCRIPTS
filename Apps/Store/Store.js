#pragma strict

var Wall:Texture;


function Start () {

}

function Update () {

}

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_4") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_4"))
	{
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
	}

}