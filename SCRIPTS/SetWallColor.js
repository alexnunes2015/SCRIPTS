#pragma strict

var ActualColor:Color;

var TimerToRefresh=0;

function Start () {

}

function Update () {
	if(PlayerPrefs.HasKey("WallColorR")){
		TimerToRefresh++;
		if(TimerToRefresh>=7){
			TimerToRefresh=0;
			ActualColor.r=PlayerPrefs.GetFloat("WallColorR");
			ActualColor.g=PlayerPrefs.GetFloat("WallColorG");
			ActualColor.b=PlayerPrefs.GetFloat("WallColorB");
			GetComponent.<Renderer>().materials[5].color = ActualColor;
		}
	}
}