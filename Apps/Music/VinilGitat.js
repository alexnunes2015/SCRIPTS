#pragma strict

function Start () {

}

function Update () {
	if(MusicPlayer.IsPlayingPPM)
	{
		transform.Rotate(0,2,0);
	}
}