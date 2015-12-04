#pragma strict

var ArvoreDeNatal:GameObject;
var AnoNovo:GameObject;
var Sino:GameObject;

function Start () {

}

function Update () {
	////// Sino do meio dia //////
	if(Sino.active)
	{
		if(System.DateTime.Now.Hour==12 && System.DateTime.Now.Minute==0 && System.DateTime.Now.Second==0)
		{
			Sino.GetComponent.<AudioSource>().Play();
		}
	}
	///////////////////////////////////
	
	////// NATAL ////////
	if(System.DateTime.Now.Month==12)
	{
		ArvoreDeNatal.active=true;
	}
	else
	{
		ArvoreDeNatal.active=false;
	}
	///////////////////////
	
	////// Ano Novo //////
	if(System.DateTime.Now.Month==1 && System.DateTime.Now.Day==1 && System.DateTime.Now.Hour==0 && (System.DateTime.Now.Minute<=2 && System.DateTime.Now.Minute>=0))
	{
		AnoNovo.active=true;
	}
	else
	{
		AnoNovo.active=false;
	}
	//////////////////////
}