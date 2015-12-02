#pragma strict

var Livro:GameObject;
var ArmarioName="";
var RefreshTimer=0;
var Files;


var PosicaoInicial:Vector3;


function Start () {	
	ArmarioName=gameObject.name;
	if(!PlayerPrefs.HasKey("arm_"+ArmarioName)){
		PlayerPrefs.SetString("arm_"+ArmarioName,"");
	}
	if(PlayerPrefs.GetString("arm_"+ArmarioName)!=""){
		ARMReload();
	}
}

function Update () {
	RefreshTimer++;
	if(RefreshTimer>=200){		
		if(PlayerPrefs.GetString("arm_"+ArmarioName)!=""){
			for(var fooObj : GameObject in GameObject.FindGameObjectsWithTag("Ficheiro3D"))
		    {
		        if(fooObj.name.Contains("TXT"))
		        {
		            Destroy(fooObj);
		        }
		    }
			ARMReload();
		}
		RefreshTimer=0;
	}
}

function ARMReload(){
	// Verificacao de files
	var NewListFile="";
	var TFiles = PlayerPrefs.GetString("arm_"+ArmarioName).Split("&"[0]);
		
	if(TFiles!=null){	
		for(livro in TFiles){
			if(livro!=""){
				var Data=livro.Split("|"[0]);
				if(System.IO.File.Exists(Data[2])){
					NewListFile=NewListFile+"&"+livro;
				}
			}
		}
		if(NewListFile!=PlayerPrefs.GetString("arm_"+ArmarioName)){
			PlayerPrefs.SetString("arm_"+ArmarioName,NewListFile);
		}
	}
	////////////////////////////////

	Files = PlayerPrefs.GetString("arm_"+ArmarioName).Split("&"[0]);
	
	var Y=10;
	
	var NivelParteleira=0;
	
	var NewPos=transform.position;
	var NewRot=transform.rotation;
	
	NewPos.x=NewPos.x-1.75;
	NewPos.y=NewPos.y+2.47;

	
	var Contador=0;
	
	PosicaoInicial=NewPos;
	
	var ContadorTMP=0;
	
	for(var Ficheiro in Files){
		if(Ficheiro!=""){
			ContadorTMP++;
			if(ContadorTMP<=24){
				switch(NivelParteleira){
					case 0:
						NewRot.SetEulerRotation(1.60,0.2,0);
						break;
					case 1:
						NewRot.SetEulerRotation(0,0,20);
						break;
					case 2:
						NewRot.SetEulerRotation(0,0,20);
						break;	
				}
				var TMP=Instantiate(Livro,NewPos, NewRot);
				TMP.name=Ficheiro;
				Contador++;
				if(Contador>=8){
					Contador=0;
					NewPos=PosicaoInicial;
					NewPos.x=NewPos.x-0.5;
					if(NivelParteleira==0){
						NewPos.y=NewPos.y-1.17;
					}
					if(NivelParteleira==1){
						NewPos.y=NewPos.y-2.22;
					}
					NivelParteleira++;
				}
				NewPos.x=NewPos.x+0.5;
			}else{
				break;
			}
		}
	}
}