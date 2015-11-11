#pragma strict

var OldString="";

var Refreshtimer=0;


function Start () {
	if(PlayerPrefs.HasKey("qdr_"+gameObject.name)){
		LoadImage();
	}
}

function Update () {
	Refreshtimer++;
	if(Refreshtimer>=50){
		if(PlayerPrefs.HasKey("qdr_"+gameObject.name)){
			if(OldString!=PlayerPrefs.GetString("qdr_"+gameObject.name)){
				LoadImage();
			}
		}
		Refreshtimer=0;
	}
}

function LoadImage(){
	if(PlayerPrefs.GetString("qdr_"+gameObject.name)!=OldString){
		var Adress=PlayerPrefs.GetString("qdr_"+gameObject.name);
		var wwwUIMG : WWW = new WWW ("file://"+Adress);
		yield wwwUIMG;
		if(wwwUIMG.error==null){
			GetComponent.<Renderer>().material.mainTexture = wwwUIMG.texture;
			OldString=PlayerPrefs.GetString("qdr_"+gameObject.name);
		}
	}
}