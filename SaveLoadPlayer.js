#pragma strict

function Start () {
	if(PlayerPrefs.HasKey("PlayerX"))
	{
		transform.position.x=PlayerPrefs.GetFloat("PlayerX");
		transform.position.y=PlayerPrefs.GetFloat("PlayerY");
		transform.position.z=PlayerPrefs.GetFloat("PlayerZ");
		transform.localRotation.x=PlayerPrefs.GetFloat("PlayerRX");
		transform.localRotation.y=PlayerPrefs.GetFloat("PlayerRY");
		transform.localRotation.z=PlayerPrefs.GetFloat("PlayerRZ");
	}
}

function Update () {
	PlayerPrefs.SetFloat("PlayerX",transform.position.x);
	PlayerPrefs.SetFloat("PlayerY",transform.position.y);
	PlayerPrefs.SetFloat("PlayerZ",transform.position.z);
	PlayerPrefs.SetFloat("PlayerRX",transform.localRotation.x);
	PlayerPrefs.SetFloat("PlayerRY",transform.localRotation.y);
	PlayerPrefs.SetFloat("PlayerRZ",transform.localRotation.z);
}