#pragma strict

var Sencibilidade=10;
var RotacaoX=0;

function Start () {

}

function Update () {
	if(PlayerPrefs.GetInt("LOCK3D")==0)
	{
		RotacaoX+=Input.GetAxisRaw("Mouse Y")*Sencibilidade;
		RotacaoX=Mathf.Clamp(RotacaoX,-90,90);
		transform.localEulerAngles=Vector3(-RotacaoX,0,0);
	}
}