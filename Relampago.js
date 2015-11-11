#pragma strict

var x:int;
var z:int;
var Tempo:int;
var Tempo2:int;
var Flag1:boolean;
var cor_tmp:Color;

var Trovao:GameObject;

var Faiscas=0;

function Start () {
	Tempo=Random.Range(5,1000);
	x=Random.Range(-400,400);
	z=Random.Range(-400,400);
	transform.Rotate(Random.Range(0,90),Random.Range(0,90),Random.Range(0,90));
	GetComponent.<Light>().intensity=0;
	
}

function Update () 
{
	if(Faiscas==1)
	{
		Instantiate(Trovao,transform.position,transform.rotation);
	}
	if(Faiscas==0)
	{
		Tempo=Tempo-1;
		if(Flag1)
		{
			Tempo2=Tempo2-1;
			if(Tempo2==0)
			{
				GetComponent.<Light>().intensity=0;
				RenderSettings.fogColor=cor_tmp;
				Flag1=false;
			}
		} 
		if(Tempo==0)
		{
			Faiscas=Random.Range(1,45);
			transform.position=Vector3(x,140.3,z);
			Tempo=Random.Range(5,1000);
			GetComponent.<Light>().intensity=Random.Range(1,8);
			Tempo2=Random.Range(1,4);
			Flag1=true;
			x=Random.Range(-400,400);
			z=Random.Range(-400,400);
			transform.Rotate(Random.Range(0,90),Random.Range(0,90),Random.Range(0,90));
			cor_tmp=RenderSettings.fogColor;
		}
	}
	else
	{
		GetComponent.<Light>().intensity=Random.Range(0,8);
		Tempo2=Random.Range(1,4);
		cor_tmp=RenderSettings.fogColor;
		Faiscas=Faiscas-1;
	}
}