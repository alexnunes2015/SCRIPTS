#pragma strict
@script RequireComponent(CharacterController)

var VelocidadeMovimento=14;
var Movimentacao:Vector3=Vector3.zero;
var salto=1;
var Gravidade=20;

var Jogador:CharacterController;
Jogador=GetComponent(CharacterController);
function Start () {
	if(GetComponent.<NetworkView>().isMine==false)
	{
		gameObject.GetComponent(PlayerS).enabled=false;
		gameObject.GetComponent(RotaY).enabled=false;
		gameObject.GetComponentInChildren(Camera).enabled=false;		
		gameObject.GetComponentInChildren(GUILayer).enabled=false;
		gameObject.GetComponentInChildren(AudioListener).enabled=false;	
		gameObject.GetComponentInChildren(MouseLoock).enabled=false;	
	}
}

function Update () {
	if(PlayerPrefs.GetInt("LOCK3D")==0)
	{
		if(Input.GetKeyDown(KeyCode.Space) && Jogador.isGrounded==true)
		{
			Movimentacao.y=salto;
		}
		if(Jogador.isGrounded==false)
		{
			Movimentacao.y-=Gravidade*Time.deltaTime;
		}
		Movimentacao.z=Input.GetAxisRaw("Vertical");
		Movimentacao.x=Input.GetAxisRaw("Horizontal");
		
		Movimentacao=transform.TransformDirection(Movimentacao);
		Jogador.Move(Movimentacao*Time.deltaTime*VelocidadeMovimento);
	}
}