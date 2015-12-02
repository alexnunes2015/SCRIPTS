 #pragma strict

var Running=true;

var RunningSoung:AudioClip;
var STOPSoung:AudioClip;

var TimerToStart=0;

function Start () {
	TimerToStart=Random.Range(10,1900);
	
}

var Som:AudioSource;

function Update () {
	if(Running){
		if(!Som.isPlaying){
			Som.clip=RunningSoung;
			Som.Play();
		}
		TimerToStart=TimerToStart-1;
		if(TimerToStart<=0){
			transform.Translate(Vector3.forward * Time.deltaTime*25, Space.World);
			if(TimerToStart<=-1709){
				TimerToStart=Random.Range(10,1900);
				transform.position.z=-572;
			}
		}
	}else{
		if(!Som.isPlaying){
			Som.clip=STOPSoung;
			Som.Play();
		}
	}
}

function OnCollisionEnter(colisor:Collision){
	if(Running && TimerToStart<=-100){
		Debug.Log(colisor.gameObject.name);
	}
}

function OnTriggerEnter(colisor:Collider){
	if(Running && TimerToStart<=-100){
		if(colisor.name=="PCUI" || colisor.name=="TabletUI"){
			Running=false;
			Som.Stop();
		}
	}
}

function OnTriggerExit(colisor:Collider){
	if(colisor.name=="PCUI" || colisor.name=="TabletUI"){
		Running=true;
		Som.Stop();
	}
}

