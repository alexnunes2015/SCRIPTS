
function Update()
{
	if(Network.peerType!=NetworkPeerType.Disconnected)
	{
		if(Network.isServer)
		{
			GetComponent(TextMesh).text = PlayerPrefs.GetString("ServerName");
		}
		if(Network.isClient)
		{
			GetComponent(TextMesh).text = PlayerPrefs.GetString("ClientName");
		}
	}
	else
	{
		GetComponent(TextMesh).text = "Offline";	
	}
}