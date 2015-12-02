#pragma strict

var Sensiblidade=10;
var ativo=true;

function Start () {

}

function Update () {
	if(PlayerPrefs.GetInt("LOCK3D")==0)
	{
		transform.Rotate(0,Input.GetAxisRaw("Mouse X")*Sensiblidade,0);
	}
}