#pragma strict

var Luz:GameObject;

function Start () {

}

function Update () {
	transform.Rotate(0,0.2,0);
	if(System.DateTime.Now.Hour>=18 || System.DateTime.Now.Hour<=6){
		Luz.active=true;
	}
	else
	{
		Luz.active=false;
	}
}