#pragma strict

var MinhaCamera:Transform;


var PegouICON:boolean=false;
var ObjectoActual:RaycastHit;

var File3D_Viwe_Name:String;

var LOCK_3D:Texture;

var ShowServerList=false;
var ServerListBack:Texture;

var SubTitleBar:Texture;

var Edit_ICON:Texture;
var Open_ICON:Texture;

var Invisible:GUISkin;
var BASE_SKN:GUISkin;
var BTN_LATERAL:GUISkin;

function Start () {
}

function Update () {
	if(PlayerPrefs.HasKey("AO_Enable")){
		if(PlayerPrefs.GetInt("AO_Enable")==1){
			(gameObject.GetComponent( "ScreenSpaceAmbientOcclusion" ) as MonoBehaviour).enabled = true;
		}else{
			(gameObject.GetComponent( "ScreenSpaceAmbientOcclusion" ) as MonoBehaviour).enabled = false;
		}
	}else{
		PlayerPrefs.SetInt("AO_Enable",0);
		(gameObject.GetComponent( "ScreenSpaceAmbientOcclusion" ) as MonoBehaviour).enabled = false;
	}
}
function OnGUI(){
	
	if(Application.platform!=RuntimePlatform.Android){
		if(PlayerPrefs.GetInt("LOCK3D")==0)
		{
			ShowServerList=false;
			if(File3D_Viwe_Name!=""){
				GUI.DrawTexture(Rect(0,Screen.height-100,Screen.width,40),SubTitleBar);
				var FontTMP0=GUI.color;
				GUI.skin.label.fontSize=25;
				GUI.color=Color.black;
				GUI.color.a=0.5;
				GUI.Label(Rect(0,Screen.height-100,Screen.width,40),File3D_Viwe_Name);
				GUI.color=Color.yellow;
				GUI.Label(Rect(1,Screen.height-103,Screen.width,40),File3D_Viwe_Name);
				GUI.color=FontTMP0;
			}	
		}else{
			if(ShowServerList && BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0")){
				GUI.skin=BASE_SKN;
				GUI.DrawTexture(Rect((Screen.width/2)-400,(Screen.height/2)-200,800,400),ServerListBack);
				GUI.skin.label.alignment=TextAnchor.UpperCenter;
				GUI.Label(Rect((Screen.width/2)-400,(Screen.height/2)-195,800,400),PlayerPrefs.GetString("SYS_STRING_119"));
				if(GUI.Button(Rect((Screen.width/2)-340,(Screen.height/2)+145,120,30),PlayerPrefs.GetString("SYS_STRING_17"))){
					ShowServerList=false;
				}
				if(!PlayerPrefs.HasKey("SERVER_FAV")){
					GUI.Label(Rect((Screen.width/2)-400,(Screen.height/2)-155,800,400),PlayerPrefs.GetString("SYS_STRING_80"));
				}else{
					if(PlayerPrefs.GetString("SERVER_FAV")==""){
						GUI.Label(Rect((Screen.width/2)-400,(Screen.height/2)-155,800,400),PlayerPrefs.GetString("SYS_STRING_80"));
					}else{
						var DataOfServerTMP = PlayerPrefs.GetString("SERVER_FAV");
						var DataOfServer = DataOfServerTMP.Split("#"[0]);
						
						var Counter=0;
						var Y_List=(Screen.height/2)-135;
						for(server_item in DataOfServer){
							if(server_item!=""){
								var Data_A=server_item.Split("!"[0]);
								if(Data_A[3]!=""){
									if(GUI.Button(Rect((Screen.width/2)-350,Y_List,700,30),"<b>"+Data_A[3]+"</b>  <i>"+Data_A[0]+"</i>")){
										PlayerPrefs.SetInt("ServerActive",0);
										PlayerPrefs.SetInt("ClientActive",1);
										PlayerPrefs.SetInt("ClientPort",System.Convert.ToInt32(Data_A[1]));
										PlayerPrefs.SetString("ClientIP",Data_A[0]);
										PlayerPrefs.SetString("ClientPassword",Data_A[2]);
										PlayerPrefs.SetString("ClientName",Data_A[3]);
									}
								}else{
									if(GUI.Button(Rect((Screen.width/2)-350,Y_List,700,30),"<b>"+PlayerPrefs.GetString("SYS_STRING_113")+"</b>  <i>"+Data_A[0]+"</i>")){
										PlayerPrefs.SetInt("ServerActive",0);
										PlayerPrefs.SetInt("ClientActive",1);
										PlayerPrefs.SetInt("ClientPort",System.Convert.ToInt32(Data_A[1]));
										PlayerPrefs.SetString("ClientIP",Data_A[0]);
										PlayerPrefs.SetString("ClientPassword",Data_A[2]);
										PlayerPrefs.SetString("ClientName",PlayerPrefs.GetString("SYS_STRING_113"));
									}
								}
								Y_List=Y_List+40;
								Counter++;
								if(Counter>=8){
									break;
								}
							}						
						}
					}
				}
			}else{
				ShowServerList=false;
			}
		}
	}else{
		if(File3D_Viwe_Name!=""){
			GUI.DrawTexture(Rect(0,Screen.height-100,Screen.width,40),SubTitleBar);
			var FontTMP22=GUI.color;
			GUI.skin.label.fontSize=25;
			GUI.color=Color.black;
			GUI.color.a=0.5;
			GUI.Label(Rect(0,Screen.height-100,Screen.width,40),File3D_Viwe_Name);
			GUI.color=Color.yellow;
			GUI.Label(Rect(1,Screen.height-103,Screen.width,40),File3D_Viwe_Name);
			GUI.color=FontTMP22;
		}
	}
	
	if(Application.platform!=RuntimePlatform.Android)
	{
		if(PlayerPrefs.GetInt("LOCK3D")==1)
		{
			if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
			{
				GUI.DrawTexture(Rect(0,60,120,40),LOCK_3D);
			}
		}
		else
		{
			// Apontador
			GUI.color=Color.white;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(0,Screen.height/2-20,Screen.width,40),"+");
		}
	}else{
		// Apontador
		GUI.color=Color.white;
		GUI.skin.label.alignment=TextAnchor.MiddleCenter;
		GUI.Label(Rect(0,Screen.height/2-20,Screen.width,40),"+");
	}
		if(PlayerPrefs.GetInt("LOCK3D")==0 || PlayerPrefs.GetString("DEVICE")=="TABLET")
	{
//		if(Input.GetMouseButtonDown(1))
//		{
//			if(PegouICON==true)
//			{
//				ObjectoActual.transform.parent = null;
//				ObjectoActual.rigidbody.useGravity=true;
//				ObjectoActual.rigidbody.freezeRotation=false;
//				ObjectoActual.rigidbody.constraints=RigidbodyConstraints.None;
//				PegouICON=false;
//			}
//		}
		

		var raio : Vector3 = transform.TransformDirection(Vector3.forward) * 10;
		var hit:RaycastHit;
		var ClearTXT=true;
		if(Physics.Raycast(transform.position,raio,hit,10))
		{
			// Apps 3D
			if(hit.collider.gameObject.tag=="APP3D")
			{
				ClearTXT=false;
				File3D_Viwe_Name=hit.collider.gameObject.name;
				
				if(hit.collider.gameObject.name=="ENTRE_TRAIN")
				{
					File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_118");
				}
				if(hit.collider.gameObject.name=="Music")
				{
					if(MusicPlayer.IsPlayingPPM){
						File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_10")+"  ( "+PlayerPrefs.GetString("SYS_STRING_12")+": "+MusicPlayer.ExternalName+" )";
					}else{
						File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_10");	
					}
				}
				if(hit.collider.gameObject.name=="Lixo")
				{
					File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_121");	
				}
				if(hit.collider.gameObject.name=="MailBox")
				{
					File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_3");
				}
				if(hit.collider.gameObject.name=="Store")
				{
					File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_4");
				}
				
				
				var NaoAbriu=true;
				if(Application.platform==RuntimePlatform.Android){
					GUI.skin=BTN_LATERAL;
					if(GUI.Button(Rect(Screen.width-60,Screen.height/2+40,60,80),Open_ICON))
					{
						if(hit.collider.gameObject.name=="Music")
						{
							NaoAbriu=false;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_10");
						}
						if(hit.collider.gameObject.name=="MailBox")
						{
							NaoAbriu=false;
							People.POSITION=2;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
						}
						if(hit.collider.gameObject.name=="Store")
						{
							NaoAbriu=false;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_4");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_4");
						}
						if(NaoAbriu)
						{
							BASE.APP_DISPLAY=hit.collider.gameObject.name;
							BASE.Tasks[BASE.ActualTask]=hit.collider.gameObject.name;
						}
					}
				}else{
					if(Input.GetMouseButtonDown(0))
					{
						if(hit.collider.gameObject.name=="ENTRE_TRAIN")
						{
							NaoAbriu=false;
							ShowServerList=true;
						}
						if(hit.collider.gameObject.name=="Lixo")
						{
							NaoAbriu=false;
							BASE.LINUX_RUN("pcmanfm trash://");
						}
						if(hit.collider.gameObject.name=="Music")
						{
							NaoAbriu=false;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_10");
						}
						if(hit.collider.gameObject.name=="MailBox")
						{
							NaoAbriu=false;
							People.POSITION=2;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_3");
						}
						if(hit.collider.gameObject.name=="Store")
						{
							NaoAbriu=false;
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_4");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_4");
						}
						if(NaoAbriu)
						{
							BASE.APP_DISPLAY=hit.collider.gameObject.name;
							BASE.Tasks[BASE.ActualTask]=hit.collider.gameObject.name;
						}
						if(PlayerPrefs.GetString("DEVICE")!="TABLET")
						{
							PlayerPrefs.SetInt("LOCK3D",1);	
							Cursor.visible=true;
						}
					}
				}
			}
			///////////////
			// Ficheiros 3D
			if(hit.collider.gameObject.tag=="Ficheiro3D")
			{
				ClearTXT=false;
				if(hit.collider.name.Contains("|")){
					var Data=hit.collider.name.Split("|"[0]);
					var Name=Data[0];
					var Extension=Data[1];
					var FilePath=Data[2];
					File3D_Viwe_Name=Name;
					if(Input.GetMouseButtonDown(0))
					{
						if(Extension=="TXT"){
							PlayerPrefs.SetInt("LOCK3D",1);
							Cursor.visible=true;
							Documents.External_file=hit.collider.name;
						}			
					}
				}else{
					if(hit.collider.name.Contains("Quadro")){
						if(Application.platform!=RuntimePlatform.Android){
							File3D_Viwe_Name=PlayerPrefs.GetString("SYS_STRING_114");
							if(Input.GetKeyDown(KeyCode.Q)){
								PlayerPrefs.SetInt("LOCK3D",1);
								Cursor.visible=true;
								Gallery.GetImageQDR=hit.collider.name;
								Gallery.GetImageMode=true;
								BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_2");
							}
						}else{
							GUI.skin=BTN_LATERAL;
							if(GUI.Button(Rect(Screen.width-60,Screen.height/2+40,60,80),Edit_ICON))
							{
								PlayerPrefs.SetInt("LOCK3D",1);
								Gallery.GetImageQDR=hit.collider.name;
								Gallery.GetImageMode=true;
								BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_2");
							}
						}
					}
				}
			}
		}
		if(ClearTXT){
			File3D_Viwe_Name="";
		}
	}

}