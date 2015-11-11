#pragma strict

var UI_Tablet:GameObject;
var UI_R_PAD:GameObject;
var UI_L_PAD:GameObject;


var UI_PC:GameObject;

function Start () {
	if(Application.platform==RuntimePlatform.Android || Application.platform==RuntimePlatform.IPhonePlayer)
	{
		UI_Tablet.active=true;
		UI_R_PAD.active=true;
		UI_L_PAD.active=true;
	}
	if(Application.platform==RuntimePlatform.LinuxPlayer || Application.platform==RuntimePlatform.WindowsPlayer || Application.platform==RuntimePlatform.WindowsEditor)
	{
		UI_PC.active=true;
	}
}

function Update () {
	if(Network.peerType==NetworkPeerType.Disconnected)
	{
		if(Application.platform==RuntimePlatform.Android || Application.platform==RuntimePlatform.IPhonePlayer)
		{
			UI_Tablet.active=true;
			UI_R_PAD.active=true;
			UI_L_PAD.active=true;
		}
		if(Application.platform==RuntimePlatform.LinuxPlayer || Application.platform==RuntimePlatform.WindowsPlayer || Application.platform==RuntimePlatform.WindowsEditor)
		{
			UI_PC.active=true;
		}
	}
	else
	{
		if(Application.platform==RuntimePlatform.LinuxPlayer || Application.platform==RuntimePlatform.WindowsPlayer || Application.platform==RuntimePlatform.WindowsEditor)
		{
			UI_PC.active=false;
		}
	}
}