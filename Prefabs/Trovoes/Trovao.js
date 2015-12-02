#pragma strict

var vezesAberto=0;

var Som=0;

var Tunder1:AudioClip;
var Tunder2:AudioClip;
var Tunder3:AudioClip;
var Tunder4:AudioClip;
var Tunder5:AudioClip;
var Tunder6:AudioClip;
var Tunder7:AudioClip;
var Tunder8:AudioClip;
var Tunder9:AudioClip;

function Start () {
	Som=Random.Range(1,9);
	if(Som==1)
	{
		GetComponent.<AudioSource>().clip=Tunder1;
	}
	if(Som==2)
	{
		GetComponent.<AudioSource>().clip=Tunder2;
	}
	if(Som==3)
	{
		GetComponent.<AudioSource>().clip=Tunder3;
	}
	if(Som==4)
	{
		GetComponent.<AudioSource>().clip=Tunder4;
	}
	if(Som==5)
	{
		GetComponent.<AudioSource>().clip=Tunder5;
	}
	if(Som==6)
	{
		GetComponent.<AudioSource>().clip=Tunder6;
	}
	if(Som==7)
	{
		GetComponent.<AudioSource>().clip=Tunder7;
	}
	if(Som==8)
	{
		GetComponent.<AudioSource>().clip=Tunder8;
	}
	if(Som==9)
	{
		GetComponent.<AudioSource>().clip=Tunder9;
	}
	
	GetComponent.<AudioSource>().Play();
}

function Update () {
	vezesAberto++;
	if(vezesAberto>=3)
	{
		if(!GetComponent.<AudioSource>().isPlaying)
		{
			Destroy(gameObject);
		}
	}	
}