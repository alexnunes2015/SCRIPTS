#pragma strict

var linhaChat=new String[10];
var TextoChat:String;
var UIS:GUISkin;
var username:String;

function Start () {
	linhaChat[0]="";
	linhaChat[2]="";
	linhaChat[3]="";
	linhaChat[4]="";
	linhaChat[5]="";
	linhaChat[6]="";
	linhaChat[7]="";
	linhaChat[8]="";
	linhaChat[9]="";
	username=PlayerPrefs.GetString("USER_Nick");
}

function Update () {

}

function OnGUI()
{
	if(Network.peerType!=NetworkPeerType.Disconnected)
	{
		if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0"))
		{
			GUI.skin=UIS;
		
			GUI.Label(Rect(0,Screen.height-290,Screen.width,30),linhaChat[9]);
			GUI.Label(Rect(0,Screen.height-270,Screen.width,30),linhaChat[8]);
			GUI.Label(Rect(0,Screen.height-250,Screen.width,30),linhaChat[7]);
			GUI.Label(Rect(0,Screen.height-230,Screen.width,30),linhaChat[6]);
			GUI.Label(Rect(0,Screen.height-210,Screen.width,30),linhaChat[5]);
			GUI.Label(Rect(0,Screen.height-190,Screen.width,30),linhaChat[4]);
			GUI.Label(Rect(0,Screen.height-170,Screen.width,30),linhaChat[3]);
			GUI.Label(Rect(0,Screen.height-150,Screen.width,30),linhaChat[2]);
			GUI.Label(Rect(0,Screen.height-130,Screen.width,30),linhaChat[1]);
			GUI.Label(Rect(0,Screen.height-110,Screen.width,30),linhaChat[0]);
			
			TextoChat=GUI.TextField(Rect(0,Screen.height-90,200,20),TextoChat,50);
			if(GUI.Button(Rect(200,Screen.height-90,100,20),"Enviar") && TextoChat.Length!=0)
			{
				Send(TextoChat);
			}
		}
	}
}

function Send(text:String)
{
	var tmpText="<b><i><color=#00ff00ff>"+username+":</color></i></b> "+text;
	GetComponent.<NetworkView>().RPC("RelerChat",RPCMode.All,tmpText);
	TextoChat="";
}

function OnConnectedToServer() {
	var atmpText="<b><i><color=#00ff00ff>"+username+" acabou de entrar</color></i></b>";
	GetComponent.<NetworkView>().RPC("RelerChat",RPCMode.All,atmpText);
	TextoChat="";
}

@RPC
function RelerChat(texto:String)
{
	linhaChat[9]=linhaChat[8];
	linhaChat[8]=linhaChat[7];
	linhaChat[7]=linhaChat[6];
	linhaChat[6]=linhaChat[5];
	linhaChat[5]=linhaChat[4];
	linhaChat[4]=linhaChat[3];
	linhaChat[3]=linhaChat[2];
	linhaChat[2]=linhaChat[1];
	linhaChat[1]=linhaChat[0];
	linhaChat[0]=texto;
	
}
