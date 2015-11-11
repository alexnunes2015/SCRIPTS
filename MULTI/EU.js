#pragma strict

var Jogador:Transform;
var Spawn:GameObject;
var Ativo=false;
var BASE:GUISkin;

function Start () {

}

function Update () {

}

function OnGUI()
{
	GUI.skin=BASE;
	if(Network.peerType==NetworkPeerType.Client || Network.peerType==NetworkPeerType.Server)
	{
		if(Ativo==false)
		{
			Ativo=true;
			Jogador.name=PlayerPrefs.GetString("USER_ID_SISPIC");
			Network.Instantiate(Jogador,Spawn.transform.position,Spawn.transform.rotation,0);
		}
	}
	else
	{
		Ativo=false;
	}
}