#pragma strict

var FlagY:GameObject;
var FlagN:GameObject;

function Update () {
	if(People.UnReadMail>=1)
	{
		FlagY.active=true;
		FlagN.active=false;
	}
	else
	{
		FlagY.active=false;
		FlagN.active=true;
	}
}