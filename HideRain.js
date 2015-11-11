#pragma strict

function Update () {
	if(transform.position.x<=82.59736 && transform.position.x>=55.0298 && transform.position.z<=18.6087 && transform.position.z>=-17.08625){
		transform.position.y=-100;
	}
	else
	{
		transform.position.y=1.5;
	}
}