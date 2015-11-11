var tamanho:Vector3;

function Start()
{

}


function Update () {		
		var hit : RaycastHit;
		if (Physics.Raycast (transform.position, -Vector3.up, hit)) {
			if(hit.transform.gameObject.name=="Plataforma")
			{
				transform.parent=hit.transform;
			}
			if(hit.transform.gameObject.name=="Estaçao")
			{
				transform.parent=GameObject.Find("Default3DUI").transform;
			}
		}
	}