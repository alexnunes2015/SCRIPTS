var PlayerModel : Transform;
function OnNetworkLoadedLevel () 
{
	var NOVOPLAYER=Network.Instantiate(PlayerModel, transform.position, transform.rotation, 0);
	NOVOPLAYER.name=PlayerPrefs.GetString("USER_ID_SISPIC");
}
	
