#pragma strict

var stat="";

var SendServerNameTimer=0;

function Start () {	
}

function Update()
{
	
	if(Application.loadedLevelName=="map001")
	{
		if(stat=="")
		{
			if(Network.peerType==NetworkPeerType.Disconnected)
			{
				if(PlayerPrefs.GetInt("ClientActive")==1)
				{
					Network.Connect(PlayerPrefs.GetString("ClientIP"),PlayerPrefs.GetInt("ClientPort"),PlayerPrefs.GetString("ClientPassword"));
					stat="Client";
				}
				if(PlayerPrefs.GetInt("ServerActive")==1)
				{
					Network.incomingPassword = PlayerPrefs.GetString("ServerPassword");
					var useNat = !Network.HavePublicAddress();
					Network.InitializeServer(20, PlayerPrefs.GetInt("ServerPort"), useNat);
					stat="Server";
					
				}
			}
		}
		else
		{
			if(PlayerPrefs.GetInt("ClientActive")==0 && stat=="Client")
			{
				stat="";
				Network.Disconnect();
			}
			if(PlayerPrefs.GetInt("ServerActive")==0 && stat=="Server")
			{
				stat="";
				Network.Disconnect();
			}
		}
	}
	
	if(Network.isServer)
	{
		SendServerNameTimer=SendServerNameTimer+1;
		if(SendServerNameTimer==230)
		{
			GetComponent.<NetworkView>().RPC("GetServerName",RPCMode.All,PlayerPrefs.GetString("ServerName"));
			SendServerNameTimer=0;
		}
	}
}

@RPC
function GetServerName(name:String)
{
	if(Network.isClient)
	{
		PlayerPrefs.SetString("ClientName",name);
	}
}
