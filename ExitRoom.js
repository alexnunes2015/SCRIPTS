#pragma strict

var GoToSceneName:String;

function OnCollisionEnter(collision : Collision) {
	if(collision.gameObject.name=="Player" || collision.gameObject.name=="PCUI")
	{
		PlayerPrefs.SetFloat("PlayerX",35.1);
		PlayerPrefs.SetFloat("PlayerY",1.50);
		PlayerPrefs.SetFloat("PlayerZ",-22.88487);
		BASE.ChangeScene(GoToSceneName);
	}
}