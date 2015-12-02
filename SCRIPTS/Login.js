#pragma strict
import System.IO;

var FontT:Font;

var OK_LOGIN=false;

//// Formulario de registo
var NovoNome="";
var NovoApelido="";
var NovoID_SISPIC="";
var NovoEmail="";
var NovoPassword="";
var NovoPasswordVerify="";
var NovoSexo="M";
var NovoDataN="DD/MM/AAAA";
var YES:GUISkin;
var NO:GUISkin;
var MotivoErro="";

var RegisterUI=false;

var RegisterWindow:Texture;
//////////////////////////


var LoginMotivoErro="";
var LoginWindow:Texture;
var Wallpaper:Texture;
var BAR:Texture;

var LoginSKN0:GUISkin;
var BTN_Register:GUISkin;
var BTN_Enter:GUISkin;
var BTN_TurnOFF:GUISkin;

var USERNAME="root";
var PASSWORD="";

var ShowErrorMensage=false;
var ErrorMessageTimer=0;
var CheckBox0:GUISkin;
var CheckBox1:GUISkin;

var LoginUI=false;
var LoginTimer=900;

var PWChanged=false;

function Start () {
	Cursor.visible=true;
	if(PlayerPrefs.HasKey("DERNIER_ID_SISPIC")){
		USERNAME=PlayerPrefs.GetString("DERNIER_ID_SISPIC");
	}
	if(PlayerPrefs.HasKey("AutoLogin"))
	{
		if(PlayerPrefs.GetInt("AutoLogin")==1)
		{
			PASSWORD=PlayerPrefs.GetString("DERNIER_IN");
			PWChanged=true;
			OnlineLogin();
		}
	}
	
}

function Update () {
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
	PlayerPrefs.SetInt("END_BOOT",1);
	PlayerPrefs.SetInt("RESET_TASKS",1);
	PlayerPrefs.SetInt("WWW_BUSY",0);
}

function OnGUI(){
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),Wallpaper);
	if(!LoginUI)
	{
		if(ShowErrorMensage)
		{
			if(ErrorMessageTimer>=1)
			{
				var TMPCOLOR=GUI.color;
				GUI.color=Color.red;
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				GUI.skin.label.fontStyle=FontStyle.Bold;
				GUI.Label(Rect(0,(Screen.height/2)-50,Screen.width,40),LoginMotivoErro);
				GUI.color=TMPCOLOR;
				ErrorMessageTimer=ErrorMessageTimer-1;
			}
		}
		GUI.skin=BTN_TurnOFF;
		GUI.DrawTexture(Rect(0,Screen.height-50,Screen.width,50),BAR);
		if(GUI.Button(Rect(10,10,30,30),""))
		{
			Application.LoadLevel("SHUTDOWN");
		}
		
		// Relogio
		var Hora=System.DateTime.Now.Hour;
		var Minuto=System.DateTime.Now.Minute;
		
		var HoraS=Hora.ToString();
		var MinutoS=Minuto.ToString();
		
		if(Hora<10)
		{
			HoraS='0'+HoraS;
		}
		if(Minuto<10)
		{
			MinutoS='0'+MinutoS;
		}
		
		var FontTMP0=GUI.color;
		GUI.skin.label.fontSize=25;
		GUI.color=Color.black;
		GUI.color.a=0.5;
		GUI.Label(Rect(0,2,Screen.width,40),HoraS+":"+MinutoS);
		GUI.color=Color.yellow;
		GUI.Label(Rect(1,3,Screen.width,40),HoraS+":"+MinutoS);
		GUI.color=FontTMP0;
		///////////
		
		GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-((Screen.height/2)/2),400,120),LoginWindow);
		GUI.skin=LoginSKN0;
		GUI.Label(Rect(((Screen.width/2)-200)+20,(Screen.height/2)-((Screen.height/2)/2)+20,(Screen.height/2)-((Screen.height/2)/2),40),PlayerPrefs.GetString("SYS_STRING_36")+":");
		GUI.Label(Rect(((Screen.width/2)-200)+20,(Screen.height/2)-((Screen.height/2)/2)+60,(Screen.height/2)-((Screen.height/2)/2),40),PlayerPrefs.GetString("SYS_STRING_37")+":");
		GUI.skin.textField.alignment=TextAnchor.MiddleLeft;
		USERNAME=GUI.TextField(Rect(((Screen.width/2)-200)+110,(Screen.height/2)-((Screen.height/2)/2)+20,250,25),USERNAME);
		PASSWORD=GUI.PasswordField (Rect(((Screen.width/2)-200)+110,(Screen.height/2)-((Screen.height/2)/2)+60,250,25), PASSWORD, "*"[0], 25);
		GUI.DrawTexture(Rect(0,0,Screen.width,50),BAR);
		GUI.skin=BTN_Register;
		if(GUI.Button(Rect(0,Screen.height-50,100,50),PlayerPrefs.GetString("SYS_STRING_38")))
		{
			LoginUI=true;
			RegisterUI=true;
		}
		
		// Iniciar sessao automaticamente		
		GUI.skin.label.fontSize=25;
		GUI.skin.label.alignment=TextAnchor.MiddleRight;
		GUI.Label(Rect(0,Screen.height-50,Screen.width-150,50),PlayerPrefs.GetString("SYS_STRING_42"));
		if(PlayerPrefs.HasKey("AutoLogin"))
		{
			if(PlayerPrefs.GetInt("AutoLogin")==0)
			{
				GUI.skin=CheckBox0;
				if(GUI.Button(Rect(Screen.width-150,Screen.height-50,50,50),""))
				{
					PlayerPrefs.SetInt("AutoLogin",1);
				}
			}
			if(PlayerPrefs.GetInt("AutoLogin")==1)
			{
				GUI.skin=CheckBox1;
				if(GUI.Button(Rect(Screen.width-150,Screen.height-50,50,50),""))
				{
					PlayerPrefs.SetInt("AutoLogin",0);
					PASSWORD="";
				}
			}
		}
		else
		{
			PlayerPrefs.SetInt("AutoLogin",0);
		}
		/////////////////////
		GUI.skin=BTN_Enter;		
		if(Input.GetKeyDown(KeyCode.Return)||(GUI.Button(Rect(Screen.width-100,Screen.height-50,100,50),PlayerPrefs.GetString("SYS_STRING_39"))))		{
			var ResultadoLogin=false;
			if(USERNAME!="" && PASSWORD!="")
			{
				if(USERNAME=="root" && PASSWORD=="root")
				{
					ResultadoLogin=true;
					LoginUI=true;
					if(Application.platform==RuntimePlatform.LinuxPlayer){
						var sr1 = File.CreateText("/ZED/command"); 
						if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="EN")
						{
					    	sr1.WriteLine("espeak -ven -p 55 'Welcome "+USERNAME+"'");
					    }
					    if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="PT")
						{
					    	sr1.WriteLine("espeak -vpt-pt -p 55 'Bem-vindo "+USERNAME+"'");
					    }
					    if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="FR")
						{
					    	sr1.WriteLine("espeak -vfr -p 55 'Bienvenue "+USERNAME+"'");
					    }
					    sr1.Close();
				    }
					PlayerPrefs.SetString("USER_Nick","Mestre");
					PlayerPrefs.SetString("DERNIER_ID_SISPIC","root");
					PlayerPrefs.SetString("USER_ID_SISPIC","root");
					if(PlayerPrefs.HasKey("root_wall")){
						PlayerPrefs.SetString("SYSTEM_LANGUAGE",PlayerPrefs.GetString("root_sl"));
						PlayerPrefs.SetString("SYSTEM_LANGUAGE_CHANGE","OK");
						PlayerPrefs.SetInt("WallpaperType",PlayerPrefs.GetInt("root_wt"));
						PlayerPrefs.SetString("SYS_WALLPAPER",PlayerPrefs.GetString("root_wall"));
						PlayerPrefs.SetString("WallpaperOnlineAdress",PlayerPrefs.GetString("root_woa"));
						PlayerPrefs.SetFloat("SYSTEM_COLOR_R",PlayerPrefs.GetFloat("root_scR"));
						PlayerPrefs.SetFloat("SYSTEM_COLOR_G",PlayerPrefs.GetFloat("root_scG"));
						PlayerPrefs.SetFloat("SYSTEM_COLOR_B",PlayerPrefs.GetFloat("root_scB"));
						PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("root_scA"));
						PlayerPrefs.SetInt("AutoColor",PlayerPrefs.GetInt("root_ac"));
						PlayerPrefs.SetInt("OnlineWallpaperRandom",PlayerPrefs.GetInt("root_owr"));
					}
					OK_LOGIN=true;
				}
				else
				{
					OnlineLogin();
					PlayerPrefs.SetString("DERNIER_ID_SISPIC",USERNAME);
					if(PlayerPrefs.GetInt("AutoLogin")==1)
					{
						PlayerPrefs.SetString("DERNIER_IN",Md5Sum(PASSWORD));
					}
					ResultadoLogin=true;
				}
			}
			else
			{
				ResultadoLogin=false;
			}
			if(!ResultadoLogin)
			{
				LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_40");
				ShowErrorMensage=true;
				ErrorMessageTimer=800;
			}
		}
	}else{
		if(!RegisterUI){
			LoginTimer=LoginTimer-1;
			GUI.skin.font=FontT;
			var FontTMP1=GUI.color;
			GUI.skin.label.fontSize=30;
			GUI.color=Color.black;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.skin.label.fontStyle=FontStyle.Bold;
			GUI.color.a=0.5;
			GUI.Label(Rect(0,(Screen.height/2)-1,Screen.width,50),PlayerPrefs.GetString("SYS_STRING_41")+" "+PlayerPrefs.GetString("USER_Nick"));
			GUI.color=Color.blue;
			GUI.Label(Rect(1,(Screen.height/2)-2,Screen.width,50),PlayerPrefs.GetString("SYS_STRING_41")+" "+PlayerPrefs.GetString("USER_Nick"));
			GUI.color=FontTMP1;
			
			if(LoginTimer==0 && OK_LOGIN)
			{
				Application.LoadLevel("DESK2D_TABLET");
			}
			else
			{
				LoginTimer=1;
			}
		}else{
			GUI.DrawTexture(Rect(Screen.width/2-200,Screen.height-600,400,450),RegisterWindow);
			var TMPSKIN=GUI.skin;
			var TMPCOLOR1=GUI.color;
			GUI.skin.label.fontSize=18;
			GUI.color=Color.black;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(Screen.width/2-200,Screen.height-600,400,30),PlayerPrefs.GetString("SYS_STRING_38"));
			
			GUI.skin=LoginSKN0;
			GUI.skin.label.alignment=TextAnchor.UpperLeft;
			GUI.skin.label.fontSize=14;
			GUI.Label(Rect(Screen.width/2-190,Screen.height-560,400,30),PlayerPrefs.GetString("SYS_STRING_45")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-520,400,30),PlayerPrefs.GetString("SYS_STRING_46")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-480,400,30),PlayerPrefs.GetString("SYS_STRING_36")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-440,400,30),PlayerPrefs.GetString("SYS_STRING_37")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-400,400,30),PlayerPrefs.GetString("SYS_STRING_47")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-360,400,30),PlayerPrefs.GetString("SYS_STRING_48")+":");
			//GUI.Label(Rect(Screen.width/2-190,Screen.height-320,400,30),PlayerPrefs.GetString("SYS_STRING_49")+":");
			GUI.Label(Rect(Screen.width/2-190,Screen.height-280,400,30),PlayerPrefs.GetString("SYS_STRING_50")+":");
			GUI.color=TMPCOLOR1;
			GUI.skin.textField.alignment=TextAnchor.MiddleLeft;
			NovoNome=GUI.TextField(Rect(Screen.width/2-140,Screen.height-560,300,25),NovoNome);
			NovoApelido=GUI.TextField(Rect(Screen.width/2-120,Screen.height-520,300,25),NovoApelido);
			NovoID_SISPIC=GUI.TextField(Rect(Screen.width/2-120,Screen.height-480,300,25),NovoID_SISPIC.ToLower());
			NovoPassword=GUI.PasswordField (Rect(Screen.width/2-30,Screen.height-440,200,25), NovoPassword, "*"[0], 25);
			NovoPasswordVerify=GUI.PasswordField (Rect(Screen.width/2-30,Screen.height-400,200,25), NovoPasswordVerify, "*"[0], 25);	
			GUI.skin.textField.alignment=TextAnchor.MiddleCenter;
			NovoDataN=GUI.TextField(Rect(Screen.width/2-60,Screen.height-360,130,25),NovoDataN,10);	
			GUI.skin.textField.alignment=TextAnchor.MiddleLeft;
//			NovoEmail=GUI.TextField(Rect(Screen.width/2-30,Screen.height-320,200,25),NovoEmail.ToLower());

			// Para corrigir Arroba
			NovoEmail="EMAIL_INTERNAL_PROBLEM";
			
			
			GUI.skin.textField.alignment=TextAnchor.MiddleCenter;
			NovoSexo=GUI.TextField(Rect(Screen.width/2-120,Screen.height-280,40,25),NovoSexo.ToUpper(),1);
			GUI.skin=TMPSKIN;
			GUI.color=TMPCOLOR1;
			
			var TMPCOLOR11=GUI.color;
			GUI.color=Color.red;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.skin.label.fontStyle=FontStyle.Bold;
			GUI.skin.label.fontSize=11;
			GUI.Label(Rect(Screen.width/2-200,Screen.height-240,400,40),MotivoErro);
			GUI.color=TMPCOLOR11;
			
			GUI.skin=NO;
			if(GUI.Button(Rect(Screen.width/2-170,Screen.height-240,40,40),""))
			{
				MotivoErro="";
				NovoNome="";
				NovoApelido="";
				NovoID_SISPIC="";
				NovoEmail="";
				NovoPassword="";
				NovoPasswordVerify="";
				NovoSexo="M";
				NovoDataN="DD/MM/AAAA";
				LoginUI=false;
				RegisterUI=false;
			}
			GUI.skin=YES;
			if(GUI.Button(Rect(Screen.width/2+120,Screen.height-240,40,40),""))
			{
				if(NovoNome!="" && NovoApelido!="" && NovoID_SISPIC!="" && NovoPassword!="" && NovoPasswordVerify!="" && NovoSexo!="" && NovoDataN!="")
				{
					if(NovoPassword==NovoPasswordVerify)
					{
						Registar();						
					}
					else
					{
						MotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_55");
						NovoPassword="";
						NovoPasswordVerify="";
					}
				}
				else
				{
					MotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_54");
				}				
			}
		}
	}
}

function OnApplicationQuit () {
	Application.CancelQuit();
}


function OnlineLogin()
{
	LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_79");
	ShowErrorMensage=true;
	ErrorMessageTimer=800;
	
	var LoginPHP = new WWWForm();
	LoginPHP.AddField("username",USERNAME);
	
	if(PWChanged)
	{
		LoginPHP.AddField("password",PASSWORD);
	}else{
		LoginPHP.AddField("password",Md5Sum(PASSWORD));
	}
	
	var wwwLogin=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/login.php",LoginPHP);
	
	yield wwwLogin;
	if(wwwLogin.error!=null)
	{
		LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_51");
		ShowErrorMensage=true;
		ErrorMessageTimer=800;
		PlayerPrefs.SetInt("AutoLogin",0);
	}
	else
	{	
		print(wwwLogin.text);
		if(wwwLogin.text.Substring(0,1)=="0" || wwwLogin.text.Substring(0,1)=="1")
		{
			if(wwwLogin.text.Substring(0,1)=="0")
			{
				LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_53");
				ShowErrorMensage=true;
				ErrorMessageTimer=800;
				PlayerPrefs.SetInt("AutoLogin",0);
				PASSWORD="";
				PlayerPrefs.SetString("DERNIER_ID_SISPIC","");
				PlayerPrefs.SetString("DERNIER_IN","");
			}
			if(wwwLogin.text.Substring(0,1)=="1")
			{
				LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_40");
				ShowErrorMensage=true;
				ErrorMessageTimer=800;
				PlayerPrefs.SetInt("AutoLogin",0);
				PASSWORD="";
				PlayerPrefs.SetString("DERNIER_ID_SISPIC","");
				PlayerPrefs.SetString("DERNIER_IN","");				
			}
		}
		else
		{
			if(!wwwLogin.text.Contains("Warning") && !wwwLogin.text.Contains("Error") && !wwwLogin.text.Contains("error")){
				PlayerPrefs.SetString("USER_STAT","ONLINE");
				var UserData = wwwLogin.text.Split("|"[0]);
				PlayerPrefs.SetString("USER_Nick",UserData[0]+" "+UserData[1]);
				PlayerPrefs.SetString("SYSTEM_LANGUAGE",UserData[2]);
				PlayerPrefs.SetString("SYSTEM_LANGUAGE_CHANGE","OK");
				
				PlayerPrefs.SetInt("WallpaperType",parseInt(UserData[3].ToString()));
				if(UserData[4]=="NONE")
				{
					var wall_path="";
					if(PlayerPrefs.GetString("DEVICE")=="PC")
					{
						var Path02="file://";
						var Path12=System.IO.Directory.GetParent(Application.dataPath);
						var Path22="/WALLPAPER/BlueAqua.png";
						wall_path=Path02+Path12+Path22;
					}
					else
					{
						var _Path02="file://";
						var _Path12="/sdcard/PORTAS";
						var _Path22="/WALLPAPER/BlueAqua.png";
						wall_path=_Path02+_Path12+_Path22;
					}
					PlayerPrefs.SetString("SYS_WALLPAPER",wall_path);
				}
				else
				{
					PlayerPrefs.SetString("SYS_WALLPAPER",LoadPath(UserData[4]));
				}
				PlayerPrefs.SetString("WallpaperOnlineAdress",UserData[5]);
				
				PlayerPrefs.SetFloat("SYSTEM_COLOR_R",parseFloat(UserData[6].ToString()));
				PlayerPrefs.SetFloat("SYSTEM_COLOR_G",parseFloat(UserData[7].ToString()));
				PlayerPrefs.SetFloat("SYSTEM_COLOR_B",parseFloat(UserData[8].ToString()));
				PlayerPrefs.SetFloat("SYSTEM_COLOR_A",parseFloat(UserData[9].ToString()));
				PlayerPrefs.SetInt("AutoColor",System.Convert.ToInt32(UserData[10]));
				if(UserData[11]=="NOT")
				{
					PlayerPrefs.SetString("ListContacts","");	
				}
				else
				{
					PlayerPrefs.SetString("ListContacts",UserData[11]);	
				}	
				PlayerPrefs.SetInt("OnlineWallpaperRandom",System.Convert.ToInt32(UserData[12]));
				if(UserData[13]=="NOT"){
					PlayerPrefs.SetString("SERVER_FAV","");
				}else{		
					PlayerPrefs.SetString("SERVER_FAV",UserData[13]);
				}
				
				PlayerPrefs.SetString("USER_ID_SISPIC",USERNAME);
				
				if(PlayerPrefs.GetInt("AutoLogin")==1)
				{
					if(PWChanged){
						PlayerPrefs.SetString("USER_PASS",PASSWORD);
					}else{
						PlayerPrefs.SetString("USER_PASS",Md5Sum(PASSWORD));
					}
				}else{
					PlayerPrefs.SetString("USER_PASS",Md5Sum(PASSWORD));
				}				
				
				var wwwUIMG : WWW = new WWW ("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/userimg/"+USERNAME+".png");
				yield wwwUIMG;
				
				if(wwwUIMG.isDone){
					System.IO.File.WriteAllBytes(PlayerPrefs.GetString("SYSTEM_PATH")+"/TMP/im.png",wwwUIMG.bytes);
				}
				
				
				if(!System.IO.File.Exists(PlayerPrefs.GetString("USERDATAPATH")+PlayerPrefs.GetString("SYS_WALLPAPER"))){
					var wwwUW : WWW = new WWW ("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/wu/"+Md5Sum(USERNAME));
					yield wwwUW;
					
					if(wwwUW.isDone){
						if(!wwwUW.data.Contains("Error 404") && wwwUW.data.Length!=0){
							if(Application.platform!=RuntimePlatform.LinuxPlayer){
								if(!System.IO.File.Exists(PlayerPrefs.GetString("MyPictures")+"\\"+PlayerPrefs.GetString("SYS_WALLPAPER"))){
									System.IO.File.WriteAllBytes(PlayerPrefs.GetString("MyPictures")+"\\"+PlayerPrefs.GetString("SYS_WALLPAPER"),wwwUW.bytes);
								}
							}else{
								if(!System.IO.File.Exists(PlayerPrefs.GetString("MyPictures")+"/"+PlayerPrefs.GetString("SYS_WALLPAPER"))){
									System.IO.File.WriteAllBytes(PlayerPrefs.GetString("MyPictures")+"/"+PlayerPrefs.GetString("SYS_WALLPAPER"),wwwUW.bytes);
								}
							}
						}
					}
				}
				
				var UserProfile = new WWWForm();
				UserProfile.AddField("Query_ID",USERNAME);
				
				var UserProfileA=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/GetUserProfile.php",UserProfile);
				
				yield UserProfileA;
				
				if(UserProfileA.isDone){
					if(UserProfileA.error==null){
						PlayerPrefs.SetString("UserProfile",UserProfileA.text);
					}
				}
				
				LoginUI=true;
				var sr2 = File.CreateText("/ZED/command"); 
				if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="EN")
				{
			    	sr2.WriteLine("espeak -ven -p 55 'Welcome "+PlayerPrefs.GetString("USER_Nick")+"'");
			    }
			    if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="PT")
				{
			    	sr2.WriteLine("espeak -vpt-pt -p 55 'Bem-vindo "+PlayerPrefs.GetString("USER_Nick")+"'");
			    }
			    if(PlayerPrefs.GetString("SYSTEM_LANGUAGE")=="FR")
				{
			    	sr2.WriteLine("espeak -vfr -p 55 'Bienvenue "+PlayerPrefs.GetString("USER_Nick")+"'");
			    }
			    sr2.Close();
			}else{
				LoginMotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_51");
				ShowErrorMensage=true;
				ErrorMessageTimer=800;
				PlayerPrefs.SetInt("AutoLogin",0);
			}
		}
	}
	OK_LOGIN=true;
}

function Registar()
{
	var RegisterPHP = new WWWForm();
	RegisterPHP.AddField("Nome",NovoNome);
	RegisterPHP.AddField("Apelido",NovoApelido);
	RegisterPHP.AddField("ID_SISPIC",NovoID_SISPIC);
	RegisterPHP.AddField("Password",Md5Sum(NovoPasswordVerify));
	RegisterPHP.AddField("SYSTEM_LANG",PlayerPrefs.GetString("SYSTEM_LANGUAGE"));
	if(NovoEmail!="")
	{
		RegisterPHP.AddField("Ext_mail",NovoEmail);
	}
	else
	{
		RegisterPHP.AddField("Ext_mail","NONE");
	}
	RegisterPHP.AddField("sex",NovoSexo);
	RegisterPHP.AddField("Data_Nasc",NovoDataN);
	
	var wwwRegister=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/register_sispic.php",RegisterPHP);
	
	yield wwwRegister;
	
	Debug.Log(wwwRegister.text);
	if(wwwRegister.error!=null)
	{
		MotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_51");
	}
	else
	{
		if(wwwRegister.text.Substring(0,1)=="0")
		{
			USERNAME=NovoID_SISPIC;
			PASSWORD="";
			NovoNome="";
			NovoApelido="";
			NovoID_SISPIC="";
			NovoEmail="";
			NovoPassword="";
			NovoPasswordVerify="";
			NovoSexo="M";
			NovoDataN="DD/MM/AAAA";
			LoginUI=false;
			RegisterUI=false;
		}
		if(wwwRegister.text.Substring(0,1)=="1")
		{
			MotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_52");
			NovoID_SISPIC="";
		}
		if(wwwRegister.text.Substring(0,1)=="2")
		{
			MotivoErro="*"+PlayerPrefs.GetString("SYS_STRING_53");
		}
	}	
}

function Md5Sum(strToEncrypt: String)
{
	var encoding = System.Text.UTF8Encoding();
	var bytes = encoding.GetBytes(strToEncrypt);
 
	// encrypt bytes
	var md5 = System.Security.Cryptography.MD5CryptoServiceProvider();
	var hashBytes:byte[] = md5.ComputeHash(bytes);
 
	// Convert the encrypted bytes back to a string (base 16)
	var hashString = "";
 
	for (var i = 0; i < hashBytes.Length; i++)
	{
		hashString += System.Convert.ToString(hashBytes[i], 16).PadLeft(2, "0"[0]);
	}
 
	return hashString.PadLeft(32, "0"[0]);
}

function LoadPath(Path_TMP:String){
	var NovaString="";
	for(var i=0;i<Path_TMP.Length;i++){
		if(Path_TMP[i]=="%"){
			NovaString=NovaString+"/";
		}
		else
		{
			NovaString=NovaString+Path_TMP[i];
		}
	}
	return NovaString;
}