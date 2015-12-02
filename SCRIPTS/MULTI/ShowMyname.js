#pragma strict

function Update () {
	var Texto = transform.Find("Nick");
	var labelA = Texto.GetComponent.<TextMesh>();
	labelA.text=gameObject.name;
}