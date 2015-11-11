#pragma strict

function Start () {

}

function Update () {
	if(Network.peerType==NetworkPeerType.Disconnected)
	{
		for(Pessoa in GameObject.FindGameObjectsWithTag("PlayerNET"))
		{
			Destroy(Pessoa);
		}
	}
}