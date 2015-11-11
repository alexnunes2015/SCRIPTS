#pragma strict

// Este Script apenas se Aplica a Interface 3D

var UPBar:GameObject;
var DOWNBar:GameObject;

function Start () {

}

function Update () {
	UPBar.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	UPBar.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	UPBar.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	UPBar.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
	DOWNBar.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	DOWNBar.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	DOWNBar.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	DOWNBar.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
}