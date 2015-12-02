#pragma strict

var Mar:GameObject;
var City:GameObject;

var UltimoValor=-1;

var OnLineScene=100;

function Start () {
}

function Update () {
	if(Network.peerType==NetworkPeerType.Disconnected){
		if(UltimoValor!=PlayerPrefs.GetInt("3DScene"))
		{
			Mar.active=false;
			City.active=false;
			if(PlayerPrefs.GetInt("3DScene")==1)
			{
				Mar.active=true;
			}
			if(PlayerPrefs.GetInt("3DScene")==2)
			{
				City.active=true;
			}
		}
		UltimoValor=PlayerPrefs.GetInt("3DScene");
	}else{
		if(Network.isServer){
			if(UltimoValor!=PlayerPrefs.GetInt("3DScene"))
			{
				GetComponent.<NetworkView>().RPC("GetServerScene",RPCMode.All,PlayerPrefs.GetInt("3DScene"));
				Mar.active=false;
				City.active=false;
				if(PlayerPrefs.GetInt("3DScene")==1)
				{
					Mar.active=true;
				}
				if(PlayerPrefs.GetInt("3DScene")==2)
				{
					City.active=true;
				}
			}
			UltimoValor=PlayerPrefs.GetInt("3DScene");
		}else{
			if(UltimoValor!=OnLineScene)
			{
				Mar.active=false;
				City.active=false;
				if(OnLineScene==1)
				{
					Mar.active=true;
				}
				if(OnLineScene==2)
				{
					City.active=true;
				}
			}
			UltimoValor=OnLineScene;
		}
	}
}

function OnPlayerConnected(player: NetworkPlayer) {
	GetComponent.<NetworkView>().RPC("GetServerScene",RPCMode.All,PlayerPrefs.GetInt("3DScene"));
}

@RPC
function GetServerScene(ID:int)
{
	if(Network.isClient)
	{
		OnLineScene=ID;
	}
}