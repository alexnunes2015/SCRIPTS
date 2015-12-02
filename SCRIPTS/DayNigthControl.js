#pragma strict

// Cores do ceu
var CorNoite:Color;
var CorMadrugada:Color;
var CorManha:Color;
var CorMeioDia:Color;
var CorTarde:Color;
var CorPorDoSol:Color;
////////////////

///// Materiais do ceu
var Noite:Material;
var Madrugada:Material;
var Manha:Material;
var MeioDia:Material;
var PorDoSol:Material;
//////////////////////

///// Sons de Ambiente
var SomNoite:AudioClip;
var SomDia:AudioClip;
var Fonte_Audio:AudioSource;
//////////////////////


/// Luzes
var LuzesCidade:GameObject;
var LuzesEstrada:GameObject;
var CityCheck:GameObject;
/////////////

function Start () {
}

function Update () {
	// dia e noite
	if((System.DateTime.Now.Hour<6)||(System.DateTime.Now.Hour>19))
	{
		RenderSettings.ambientLight=CorNoite;
		RenderSettings.skybox=Noite;
		if(!Fonte_Audio.isPlaying)
		{
			Fonte_Audio.clip=SomNoite;
			Fonte_Audio.Play();
		}
		if(CityCheck.active)
		{
			LuzesCidade.active=true;
			CityCheck.GetComponent.<AudioSource>().volume=1;
		}
		LuzesEstrada.active=true;
	}
	if((System.DateTime.Now.Hour>=6)&&(System.DateTime.Now.Hour<9))
	{
		RenderSettings.ambientLight=CorMadrugada;
		RenderSettings.skybox=Madrugada;
		if(!Fonte_Audio.isPlaying)
		{
			Fonte_Audio.clip=SomDia;
			Fonte_Audio.Play();
		}
		if(CityCheck.active)
		{
			LuzesCidade.active=true;
			CityCheck.GetComponent.<AudioSource>().volume=0;
		}
		LuzesEstrada.active=true;
	}
	if((System.DateTime.Now.Hour>=9)&&(System.DateTime.Now.Hour<12))
	{
		RenderSettings.ambientLight=CorManha;
		RenderSettings.skybox=Manha;
		if(!Fonte_Audio.isPlaying)
		{
			Fonte_Audio.clip=SomDia;
			Fonte_Audio.Play();
			CityCheck.GetComponent.<AudioSource>().volume=1;
		}
		if(CityCheck.active)
		{
			LuzesCidade.active=false;
		}
		LuzesEstrada.active=false;
	}
	if((System.DateTime.Now.Hour>=12)&&(System.DateTime.Now.Hour<17))
	{
		RenderSettings.ambientLight=CorMeioDia;
		RenderSettings.skybox=MeioDia;
		if(!Fonte_Audio.isPlaying)
		{
			Fonte_Audio.clip=SomDia;
			Fonte_Audio.Play();
		}
		if(CityCheck.active)
		{
			LuzesCidade.active=false;
			CityCheck.GetComponent.<AudioSource>().volume=1;
		}
		LuzesEstrada.active=false;
	}
	if((System.DateTime.Now.Hour>=17)&&(System.DateTime.Now.Hour<=19))
	{
		RenderSettings.ambientLight=CorPorDoSol;
		RenderSettings.skybox=PorDoSol;
		if(!Fonte_Audio.isPlaying)
		{
			Fonte_Audio.clip=SomDia;
			Fonte_Audio.Play();
		}
		if(CityCheck.active)
		{
			LuzesCidade.active=true;
			CityCheck.GetComponent.<AudioSource>().volume=1;
		}
		LuzesEstrada.active=true;
	}
}