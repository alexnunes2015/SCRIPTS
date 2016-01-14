#pragma strict

var PUBScreen:GameObject;

function Start () {
	var PUB=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/pub.jpg");
	yield PUB;
	if(PUB.error==null)
		if(!PUB.text.Contains("Error 404"))
			PUBScreen.GetComponent.<Renderer>().material.mainTexture=PUB.texture;
}
