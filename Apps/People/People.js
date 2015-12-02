#pragma strict


//// SONS

var cry:AudioClip;
var fly:AudioClip;
var laughing:AudioClip;
var slap:AudioClip;
var woo_hoo:AudioClip;

var dramatic_scene:AudioClip;
var happy_scene:AudioClip;
var love_scene:AudioClip;
var sad_scene:AudioClip;
var troll_scene:AudioClip;

/////////////

// Timers /////
var MailPushTimer=0;
///////////////

/////////// Novo E-mail /////////////
static var NewTo="";
static var NewSubject="";
static var NewMsg="";
static var NewProtected=false;
/////////////////////////////////////


/////////// Ler E-mail ///////////////
var ReadFrom="";
var ReadSubject="";
var ReadMsg="";
var ReadPretected=false;
var ReadFile="";
var ReadProtectedMailCheck=false;
var SenhaPretected="";
//////////////////////////////////////

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var BOX:Texture;

static var UnReadMail=0;


var Group:GUISkin;
var Contact:GUISkin;

var Mail0:GUISkin;
var Mail1:GUISkin;
var MailKey0:GUISkin;
var MailKey1:GUISkin;

var LoveWallpaper:Texture;
var HappyWallpaper:Texture;
var dramaticWallpaper:Texture;
var SadWallpaper:Texture;
var TrollWallpaper:Texture;

var Key_1:Texture;
var Key_0:Texture;

var SYS_DBG:Texture;
var MiniWindow:Texture;

var AmbientePlayer:AudioSource;
var xatSoundPlayer:AudioSource;

var Disconnected:Texture;
var NewMail:Texture;
var NewContact:Texture;

var BAR01:Texture;
var Wall:Texture;
var DEFAULTSKN:GUISkin;

var BTN_YES:GUISkin;
var BTN_NO:GUISkin;

var filesList_m = new Array();
var List_Mail_Title:GUISkin;
var List_mail_page=new Array ();
var List_contact_page=new Array ();
var ListIndex_mail=0;
var ListIndex_m=0;
var ListIndex_c=0;

var linhaChatGC=new String[10];
var TextoChatGC:String;
var username:String;


//////// NEW CONTACT
var NewContact_DLG=false;
var NewContactName="";
var NewContactADRS="";
////////////////////

var DelContactConfirm=false;
var DeleteContactName="";
var DeleteContactAdress="";


var DEL_FILE_BTN:GUISkin;

static var POSITION=0;
////////////////
//// 0 - CHAT GLOBAL
//// 1 - Contactos
//// 2 - Email
//// 3 - Novo E-mail
//// 4 - Ler E-mail
//// 5 - Ler/Editar

function Start () {
	linhaChatGC[0]="";
	linhaChatGC[2]="";
	linhaChatGC[3]="";
	linhaChatGC[4]="";
	linhaChatGC[5]="";
	linhaChatGC[6]="";
	linhaChatGC[7]="";
	linhaChatGC[8]="";
	linhaChatGC[9]="";
	username=PlayerPrefs.GetString("USER_Nick");
	DontDestroyOnLoad(this);
}

function Update () {
	if(MailPushTimer>=5000)
	{
		MailPushTimer=0;
		PushMail();
	}
	if(ListIndex_mail>=100)
	{
		ListIndex_mail=0;
		GenerateListMail();
	}
	
	MailPushTimer++;	
	
	//// Contador de e-mails
	var filePathsCOUNTM : String[] = Directory.GetFiles(PlayerPrefs.GetString("MyDocuments"),"*.sn_msg");
	
	
	UnReadMail=0;
	for(FileCount in filePathsCOUNTM)
	{
		UnReadMail++;
	}
	////////////////////////
	if(UnReadMail==0){
		BASE.Mail_stat="";
	}else{
		BASE.Mail_stat="HAS";
	}
}

function GenerateListMail()
{
	List_mail_page.Clear();
	var filePaths : String[] = Directory.GetFiles(PlayerPrefs.GetString("MyDocuments"),"*.*");
	
	var x=0;
	var y=0;
	
	
	for(File in filePaths)
	{
		if(y<=8)
		{
			var FileDir=File;
			var FileNameWithExtension=Path.GetFileName(FileDir);
			var FileNameWithoutExtension=Path.GetFileNameWithoutExtension(FileNameWithExtension);
			var FileExtension=Path.GetExtension(FileNameWithExtension);
			if(FileExtension==".sn_msg" || FileExtension==".sn_msg_r")
			{
				if(y==0)
				{
					List_mail_page.Push("");
				}
				List_mail_page[x]=List_mail_page[x]+"#"+FileDir+"!"+FileNameWithoutExtension;
				y++;
				if(y==8)
				{
					y=0;
					x++;
				}
			}
		}			
	}
	if(List_mail_page[List_mail_page.length]=="")
	{
		List_mail_page.Pop();
	}
	
}

function OnGUI(){
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_3") || MobileBase.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_3"))
	{
		GetComponent.<AudioSource>().volume=0;
		AmbientePlayer.volume=1;
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
		
		/////////////////// CHAT GLOBAL
		if(POSITION==0)
		{
			if(AmbientePlayer.isPlaying)
			{
				if(AmbientePlayer.clip.name=="happy_scene")
				{
					GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),HappyWallpaper);
				}
				if(AmbientePlayer.clip.name=="sad_scene")
				{
					GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),SadWallpaper);
				}
				if(AmbientePlayer.clip.name=="love_scene")
				{
					GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),LoveWallpaper);
				}
				if(AmbientePlayer.clip.name=="dramatic_scene")
				{
					GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),dramaticWallpaper);
				}
				if(AmbientePlayer.clip.name=="troll_scene")
				{
					GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),TrollWallpaper);
				}
			}
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,30),BAR01);
			GUI.skin=DEFAULTSKN;
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY"),150,30),"<size=20><i><b>"+PlayerPrefs.GetString("SYS_STRING_65")+"</b></i></size>"))
			{
				POSITION=0;
			}
			if(GUI.Button(Rect(170,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_66")))
			{
				POSITION=1;
			}
			if(UnReadMail>=1)
			{
				if(UnReadMail>=10)
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail (+9)"))
					{
						POSITION=2;
					}
				}
				else
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail ("+UnReadMail.ToString()+")"))
					{
						POSITION=2;
					}
				}
			}
			else
			{	
				if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail"))
				{
					POSITION=2;
				}
			}
			if(Network.peerType!=NetworkPeerType.Disconnected)
			{
				GUI.skin=DEFAULTSKN;
				GUI.skin.label.fontSize=17;
				GUI.Label(Rect(0,Screen.height-290,Screen.width,30),linhaChatGC[9]);
				GUI.Label(Rect(0,Screen.height-270,Screen.width,30),linhaChatGC[8]);
				GUI.Label(Rect(0,Screen.height-250,Screen.width,30),linhaChatGC[7]);
				GUI.Label(Rect(0,Screen.height-230,Screen.width,30),linhaChatGC[6]);
				GUI.Label(Rect(0,Screen.height-210,Screen.width,30),linhaChatGC[5]);
				GUI.Label(Rect(0,Screen.height-190,Screen.width,30),linhaChatGC[4]);
				GUI.Label(Rect(0,Screen.height-170,Screen.width,30),linhaChatGC[3]);
				GUI.Label(Rect(0,Screen.height-150,Screen.width,30),linhaChatGC[2]);
				GUI.Label(Rect(0,Screen.height-130,Screen.width,30),linhaChatGC[1]);
				GUI.Label(Rect(0,Screen.height-110,Screen.width,30),linhaChatGC[0]);
					
				TextoChatGC=GUI.TextField(Rect(0,Screen.height-90,Screen.width-100,20),TextoChatGC,145);
				if(( Input.GetKeyDown(KeyCode.Return) || GUI.Button(Rect(Screen.width-100,Screen.height-90,100,20),PlayerPrefs.GetString("SYS_STRING_71"))) && TextoChatGC.Length!=0)
				{
					SendGC(TextoChatGC);
				}
			}
			else
			{
				GUI.DrawTexture(Rect(Screen.width/2-60,Screen.height/2,50,50),Disconnected);
				GUI.Label(Rect(Screen.width/2,Screen.height/2,500,40),PlayerPrefs.GetString("SYS_STRING_67"));
			}
		}
		///////////////////////////////
		
		///// Contactos ////////////////////////
		if(POSITION==1)
		{
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,30),BAR01);
			GUI.skin=DEFAULTSKN;		
			
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_65")))
			{
				POSITION=0;
			}
			if(GUI.Button(Rect(170,PlayerPrefs.GetInt("MinY"),150,30),"<size=20><i><b>"+PlayerPrefs.GetString("SYS_STRING_66")+"</b></i></size>"))
			{
				POSITION=1;
			}
			if(UnReadMail>=1)
			{
				if(UnReadMail>=10)
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail (+9)"))
					{
						POSITION=2;
					}
				}
				else
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail ("+UnReadMail.ToString()+")"))
					{
						POSITION=2;
					}
				}
			}
			else
			{	
				if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"E-mail"))
				{
					POSITION=2;
				}
			}
			if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
			{
				
				if(GUI.Button(Rect(Screen.width-50,PlayerPrefs.GetInt("MinY"),30,30),NewContact))
				{
					NewContact_DLG=true;
				}	
				
				///////////////// Novo Contacto ///////////////////////////
				if(NewContact_DLG){
					GUI.DrawTexture(Rect(Screen.width/2-180,Screen.height/2-100,360,250),BOX);
					var CorTMP1=GUI.color;
					var SkinTMP1=GUI.skin;
					GUI.color=Color.black;
					GUI.skin.label.fontSize=15;
					GUI.skin.label.alignment=TextAnchor.MiddleCenter;
					if(NewContactADRS.Contains(";"))
					{
						GUI.Label(Rect(Screen.width/2-145,Screen.height/2-85,300,30),PlayerPrefs.GetString("SYS_STRING_87"));
					}
					else
					{
						GUI.Label(Rect(Screen.width/2-145,Screen.height/2-85,300,30),PlayerPrefs.GetString("SYS_STRING_86"));

					}
					GUI.skin.label.alignment=TextAnchor.MiddleLeft;
					GUI.skin.label.fontSize=12;
					GUI.Label(Rect(Screen.width/2-165,Screen.height/2-65,200,30),PlayerPrefs.GetString("SYS_STRING_45")+":");
					if(NewContactADRS.Contains(";"))
					{
						GUI.Label(Rect(Screen.width/2-165,Screen.height/2-30,200,30),PlayerPrefs.GetString("SYS_STRING_36")+"'s:");
					}
					else
					{
						GUI.Label(Rect(Screen.width/2-165,Screen.height/2-30,200,30),PlayerPrefs.GetString("SYS_STRING_36")+":");
					}			
					GUI.color=Color.blue;
					GUI.skin.label.fontSize=10;
					GUI.Label(Rect(Screen.width/2-165,Screen.height/2+10,300,30),PlayerPrefs.GetString("SYS_STRING_88"));
					GUI.color=CorTMP1;	
					GUI.skin=SkinTMP1;
					NewContactName=GUI.TextField(Rect(Screen.width/2-165,Screen.height/2-45,325,20),NewContactName);
					NewContactADRS=GUI.TextField(Rect(Screen.width/2-165,Screen.height/2-5,325,20),NewContactADRS);
					
					GUI.skin=BTN_NO;
					if(GUI.Button(Rect(Screen.width/2-145,Screen.height/2+50,50,50),""))
					{
						NewContact_DLG=false;
						NewContactName="";
						NewContactADRS="";
					}
					GUI.skin=BTN_YES;
					if(GUI.Button(Rect(Screen.width/2+88,Screen.height/2+50,50,50),""))
					{
						if(NewContactName!="" && NewContactADRS!="")
						{
							PlayerPrefs.SetString("ListContacts",PlayerPrefs.GetString("ListContacts")+"+"+NewContactName+":"+NewContactADRS);
							NewContact_DLG=false;
							NewContactName="";
							NewContactADRS="";
						}
						else
						{
							BASE.SYSTEM_NOTIFY(2,PlayerPrefs.GetString("SYS_STRING_54"));
						}
					}
					
				}
				/////////////////////////////////////////////////////////	
				
				// Converter String de Contactos/Grupos em Array
				var DataOfContactsTMP = PlayerPrefs.GetString("ListContacts");
				var DataOfContacts = DataOfContactsTMP.Split("+"[0]);
				 
				 
				var q=0;
				var a=0;
				
				List_contact_page.Clear();
							
				for(cnt_data in DataOfContacts)
				{
					if(a<=8)
					{	
						if(cnt_data.Contains(":"))
						{	
							if(a==0)
							{
								List_contact_page.Push("");
							}
							List_contact_page[q]=List_contact_page[q]+"#"+cnt_data;
							a++;
							if(a==8)
							{
								a=0;
								q++;
							}
						}
					}		
				}

				if(List_contact_page[List_contact_page.length-1]=="")
				{
					List_contact_page.Pop();
				}
				////////////////////////////////////////////////////////////													
				
				// BTNS andar para tras e frente na lista
				if(ListIndex_c==0)
				{
					GUI.skin=Back_BTN_Inactive;
					if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
					{}
					if((List_contact_page.length-1)>0)
					{
						GUI.skin=Next_BTN_Active;
						if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
						{
							ListIndex_c++;
						}
					}
				}
				else
				{
					if(ListIndex_c!=List_contact_page.length-1)
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex_c=ListIndex_c-1;
						}
						if((List_contact_page.length-1)>0)
						{
							GUI.skin=Next_BTN_Active;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
								ListIndex_c=ListIndex_c+1;
							}
						}
					}
					else
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex_c=ListIndex_c-1;
						}
						if(List_contact_page.length>0)
						{
							GUI.skin=Next_BTN_Inactive;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
							}
						}
					}
				}
				///////////////////////////////////////////
				
				
				
				
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				
				if((List_contact_page.length-1).ToString()=="-1")
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));				
				}
				else
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),ListIndex_c.ToString()+" / "+(List_contact_page.length-1).ToString());
				}
				GUI.skin.label.alignment=TextAnchor.MiddleLeft;
				
				
				var YListaZ=120;
				
				var ATMPname:String=List_contact_page[ListIndex_c];
				var List_contact_InPage = ATMPname.Split("#"[0]);

				for (var value : String in List_contact_InPage) {
					if(value!="")
					{
						var DataA=value.Split(":"[0]);
						
						var Is_a_contact=true;
						var Contact_Nome=DataA[0];
						var Contact_Endereco=DataA[1];
						
						if(Contact_Endereco.Contains(";"))
						{
							Is_a_contact=false;
						}						
						
						
						
						if(Is_a_contact)
						{
							GUI.skin=Contact;
						}
						else
						{
							GUI.skin=Group;
						}
						if(GUI.Button(Rect(50,YListaZ,30,30),""))
						{
							POSITION=3;
							NewTo=Contact_Endereco;
							NewSubject="";
							NewMsg="";
							NewProtected=false;
						}
						GUI.skin=List_Mail_Title;
						if(GUI.Button(Rect(80,YListaZ,Screen.width-200,30),Contact_Nome))
						{
							BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_0");
							BASE.Tasks[BASE.ActualTask]=PlayerPrefs.GetString("SYS_STRING_0");
							BASE.ViewUserProfile(Contact_Endereco);
						}
						
						GUI.skin=DEFAULTSKN;
						if(GUI.Button(Rect(Screen.width-110,YListaZ,30,30),NewMail))
						{
							POSITION=3;
							NewTo=Contact_Endereco;
							NewSubject="";
							NewMsg="";
							NewProtected=false;
						}
						
						GUI.skin=DEL_FILE_BTN;
						if(GUI.Button(Rect(Screen.width-70,YListaZ,30,30),""))
						{
							DelContactConfirm=true;
							DeleteContactAdress=Contact_Endereco;
							DeleteContactName=Contact_Nome;
						}				 								
					}
					YListaZ=YListaZ+40;	
				}
				YListaZ=120;	
				
			}
			else
			{
				GUI.DrawTexture(Rect(Screen.width/2-60,Screen.height/2,50,50),Disconnected);
				GUI.Label(Rect(Screen.width/2,Screen.height/2,500,40),PlayerPrefs.GetString("SYS_STRING_68"));
			}
		}
		//////////////////////////////////////
						
			
		///// Inbox ////////////////////////
		if(POSITION==2)
		{	
			ListIndex_mail++;
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,30),BAR01);
			GUI.skin=DEFAULTSKN;
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_65")))
			{
				POSITION=0;
			}
			if(GUI.Button(Rect(170,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_66")))
			{
				POSITION=1;
			}
			if(UnReadMail>=1)
			{
				if(UnReadMail>=10)
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"<size=20><i><b>E-mail (+9)</b></i></size>"))
					{
						POSITION=2;
					}
				}
				else
				{
					if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"<size=20><i><b>E-mail ("+UnReadMail.ToString()+")</b></i></size>"))
					{
						POSITION=2;
					}
				}
			}
			else
			{	
				if(GUI.Button(Rect(330,PlayerPrefs.GetInt("MinY"),150,30),"<size=20><i><b>E-mail</b></i></size>"))
				{
					POSITION=2;
				}
			}
			if(PlayerPrefs.GetString("USER_STAT")=="ONLINE")
			{
				if(GUI.Button(Rect(Screen.width-50,PlayerPrefs.GetInt("MinY"),30,30),NewMail))
				{
					POSITION=3;
				}
				GUI.skin.label.alignment=TextAnchor.MiddleCenter;
				if((List_mail_page.length-1).ToString()=="-1")
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),PlayerPrefs.GetString("SYS_STRING_80"));				
				}
				else
				{
					GUI.Label(Rect(0,Screen.height-130,Screen.width,40),ListIndex_m.ToString()+" / "+(List_mail_page.length-1).ToString());
				}
				GUI.skin.label.alignment=TextAnchor.MiddleLeft;
				// BTNS andar para tras e frente na lista
				if(ListIndex_m==0)
				{
					GUI.skin=Back_BTN_Inactive;
					if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
					{}
					if((List_mail_page.length-1)>0)
					{
						GUI.skin=Next_BTN_Active;
						if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
						{
							ListIndex_m++;
						}
					}
				}
				else
				{
					if(ListIndex_m!=List_mail_page.length-1)
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex_m=ListIndex_m-1;
						}
						if((List_mail_page.length-1)>0)
						{
							GUI.skin=Next_BTN_Active;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
								ListIndex_m=ListIndex_m+1;
							}
						}
					}
					else
					{
						GUI.skin=Back_BTN_Active;
						if(GUI.Button(Rect(0,Screen.height-150,50,80),""))
						{
							ListIndex_m=ListIndex_m-1;
						}
						if(List_mail_page.length>0)
						{
							GUI.skin=Next_BTN_Inactive;
							if(GUI.Button(Rect(Screen.width-50,Screen.height-150,50,80),""))
							{
							}
						}
					}
				}
				///////////////////////////////////////////
				var YLista=120;
				var ListaVazia=true;
				
				var TMPname:String=List_mail_page[ListIndex_m];
				var List_Mail_InPage = TMPname.Split("#"[0]);

				for (var value : String in List_Mail_InPage) {
					if(value!="")
					{
						var ActualMailObject=value.Split("!"[0]);
						
						var MailTMPname=ActualMailObject[1].Split("-"[0]);
						var IsProtected=false;
						var tmpContectMail=BASE.ReadFile(ActualMailObject[0]);
						if(tmpContectMail.Contains("!SECURITY_SYSTEM_SISPIC(INDI_KEY)!"))
						{
							IsProtected=true;
						}						
						
						if(ActualMailObject[0].Substring(ActualMailObject[0].Length - 1)=="r")
						{
							if(IsProtected)
							{
								GUI.skin=MailKey0;
							}
							else
							{
								GUI.skin=Mail0;
							}
						}
						else
						{
							if(IsProtected)
							{
								GUI.skin=MailKey1;
							}
							else
							{
								GUI.skin=Mail1;
							}
						}
						if(GUI.Button(Rect(50,YLista,30,30),""))
						{
							if(!IsProtected)
							{
								ReadFile=ActualMailObject[0];
								ReadFrom=MailTMPname[0];
								ReadSubject=MailTMPname[1];
								ReadPretected=false;
								ReadMsg=tmpContectMail;
								if(ActualMailObject[0].Substring(ActualMailObject[0].Length - 1)!="r")
								{
									System.IO.File.Move(ActualMailObject[0],ActualMailObject[0]+"_r");
								}
								POSITION=4;
							}
							else
							{
								ReadFile=ActualMailObject[0];
								ReadFrom=MailTMPname[0];
								ReadSubject=MailTMPname[1];
								ReadPretected=false;
								ReadMsg=BASE.INDIDECrypt(tmpContectMail.Replace('!SECURITY_SYSTEM_SISPIC(INDI_KEY)!',''));
								ReadProtectedMailCheck=true;
								POSITION=4;
							}
						 }
						 GUI.skin=List_Mail_Title;
						 if(GUI.Button(Rect(80,YLista,Screen.width-160,30),MailTMPname[1]+"          "+PlayerPrefs.GetString("SYS_STRING_77")+": "+MailTMPname[0]))
						 {
							if(!IsProtected)
							{
								ReadFile=ActualMailObject[0];
								ReadFrom=MailTMPname[0];
								ReadSubject=MailTMPname[1];
								ReadPretected=false;
								ReadMsg=tmpContectMail;
								if(ActualMailObject[0].Substring(ActualMailObject[0].Length - 1)!="r")
								{
									System.IO.File.Move(ActualMailObject[0],ActualMailObject[0]+"_r");
								}
								POSITION=4;
							}
							else
							{
								ReadFile=ActualMailObject[0];
								ReadFrom=MailTMPname[0];
								ReadSubject=MailTMPname[1];
								ReadPretected=false;
								ReadMsg=BASE.INDIDECrypt(tmpContectMail.Replace('!SECURITY_SYSTEM_SISPIC(INDI_KEY)!',''));
								ReadProtectedMailCheck=true;
								POSITION=4;
							}
						}
						GUI.skin=DEL_FILE_BTN;
						if(GUI.Button(Rect(Screen.width-70,YLista,30,30),""))
						{
							BASE.DeleteFile_Path=ActualMailObject[0];
							BASE.DeleteFile_Msg=PlayerPrefs.GetString("SYS_STRING_83");
							BASE.DeleteFile_Check=true;
						}				 
						YLista=YLista+40;
					}
				}
				YLista=120;			
			}
			else
			{
				GUI.DrawTexture(Rect(Screen.width/2-60,Screen.height/2,50,50),Disconnected);
				GUI.Label(Rect(Screen.width/2,Screen.height/2,500,40),PlayerPrefs.GetString("SYS_STRING_68"));
			}
		}
		//////////////////////////////////////
		
		////// Forumulario de enviar e-mail /////
		if(POSITION==3)
		{
			GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,75),BAR01);
			GUI.skin=DEFAULTSKN;
			if(GUI.Button(Rect(10,PlayerPrefs.GetInt("MinY"),150,75),PlayerPrefs.GetString("SYS_STRING_17")))
			{
				POSITION=2;
				NewTo="";
				NewSubject="";
				NewMsg="";
				NewProtected=false;
			}
			GUI.Label(Rect(170,PlayerPrefs.GetInt("MinY"),150,30),"<size=17>"+PlayerPrefs.GetString("SYS_STRING_69")+":</size>");
			NewTo=GUI.TextField(Rect(240,PlayerPrefs.GetInt("MinY"),Screen.width-450,30),NewTo);
			GUI.Label(Rect(170,PlayerPrefs.GetInt("MinY")+40,150,30),"<size=17>"+PlayerPrefs.GetString("SYS_STRING_70")+":</size>");
			NewSubject=GUI.TextField(Rect(240,PlayerPrefs.GetInt("MinY")+40,Screen.width-400,30),NewSubject,49);
			var TMPSkin2=GUI.skin;
			GUI.skin.textArea.fontSize=17;
			GUI.skin.textArea.fontStyle=FontStyle.Normal;
			NewMsg=GUI.TextArea(Rect(2,PlayerPrefs.GetInt("MinY")+75,Screen.width-4,Screen.height-(PlayerPrefs.GetInt("MinY")+75)-70),NewMsg);
			GUI.skin=TMPSkin2;
			if(GUI.Button(Rect(Screen.width-155,PlayerPrefs.GetInt("MinY"),150,75),PlayerPrefs.GetString("SYS_STRING_71")))
			{
				SendMail();
			}
			if(NewProtected)
			{
				if(GUI.Button(Rect(Screen.width-190,PlayerPrefs.GetInt("MinY"),30,30),Key_1))
				{
					NewProtected=!NewProtected;
				}
			}
			else
			{
				if(GUI.Button(Rect(Screen.width-190,PlayerPrefs.GetInt("MinY"),30,30),Key_0))
				{
					NewProtected=!NewProtected;
				}
			}
		}
		/////////////////////////////////////////
		
		/////////// Forumlario de Leitura de E-mail //////////////
		if(POSITION==4)
		{
			if(!ReadProtectedMailCheck)
			{
				GUI.skin=DEFAULTSKN;
				if(GUI.Button(Rect(5,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_17")))
				{
					ReadFile="";
					ReadMsg="";
					ReadFrom="";
					ReadPretected=false;
					ReadProtectedMailCheck=false;
					ReadSubject="";
					SenhaPretected="";
					POSITION=2;
				}
				if(GUI.Button(Rect(Screen.width-155,PlayerPrefs.GetInt("MinY"),150,30),PlayerPrefs.GetString("SYS_STRING_82")))
				{
					NewMsg="\n===============================\n"+ReadMsg;
					NewProtected=ReadPretected;
					NewTo=ReadFrom;
					NewSubject=ReadSubject;
					POSITION=3;
				}
				var TMPSkin1=GUI.skin;
				GUI.skin.label.alignment=TextAnchor.UpperLeft;
				GUI.skin.label.fontSize=17;
				GUI.Label(Rect(160,PlayerPrefs.GetInt("MinY"),Screen.width-200,30),ReadSubject+"          "+PlayerPrefs.GetString("SYS_STRING_77")+": "+ReadFrom);
				if(ReadMsg.Contains("%COMMAND%")){
					var TMPMSG=ReadMsg[9:ReadMsg.Length];
					var COMMAND=TMPMSG.Split(":"[0]);
					
					if(COMMAND[0]=="CONNECT_3D_TO_ME"){
						var ServerIPs=COMMAND[1].Split("|"[0]);;
						var ServerPorta=COMMAND[2];
						var ServerName=COMMAND[3];
						var ServerSenha=COMMAND[4];
						
						GUI.Label(Rect(5,PlayerPrefs.GetInt("MinY")+40,Screen.width-10,PlayerPrefs.GetInt("MaxY")),PlayerPrefs.GetString("SYS_STRING_117"));
						
						if(GUI.Button(Rect(5,PlayerPrefs.GetInt("MinY")+120,320,40),PlayerPrefs.GetString("SYS_STRING_61")+" (INTERNET)")){
							PlayerPrefs.SetInt("ServerActive",0);
							PlayerPrefs.SetInt("ClientActive",1);
							PlayerPrefs.SetInt("ClientPort",System.Convert.ToInt32(ServerPorta));
							PlayerPrefs.SetString("ClientIP",ServerIPs[1]);
							PlayerPrefs.SetString("ClientPassword",ServerSenha);
							POSITION=0;
							if(Application.loadedLevelName!="map001"){
						        BASE.ChangeScene("map001");
					        }
						}
						if(GUI.Button(Rect(335,PlayerPrefs.GetInt("MinY")+120,320,40),PlayerPrefs.GetString("SYS_STRING_61")+" (LAN)")){
							PlayerPrefs.SetInt("ServerActive",0);
							PlayerPrefs.SetInt("ClientActive",1);
							PlayerPrefs.SetInt("ClientPort",System.Convert.ToInt32(ServerPorta));
							PlayerPrefs.SetString("ClientIP",ServerIPs[0]);
							PlayerPrefs.SetString("ClientPassword",ServerSenha);
							POSITION=0;
							if(Application.loadedLevelName!="map001"){
						        BASE.ChangeScene("map001");
					        }
						}
					}
					
				}else{
					GUI.Label(Rect(5,PlayerPrefs.GetInt("MinY")+40,Screen.width-10,PlayerPrefs.GetInt("MaxY")),ReadMsg);
				}
				GUI.skin=TMPSkin1;
			}
		}
		//////////////////////////////////////////////////////////
		
		/////////// Apagar contacto ////////////////////
		if(DelContactConfirm){
			GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),SYS_DBG);
			GUI.DrawTexture(Rect((Screen.width/2)-200,(Screen.height/2)-100,400,200),MiniWindow);
			var FontTMP2=GUI.color;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=18;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			if(DeleteContactAdress.Contains(";"))
			{
				GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),PlayerPrefs.GetString("SYS_STRING_90")+" '"+DeleteContactName+"'?");	
			}
			else
			{
				GUI.Label(Rect(((Screen.width/2)-200)+10,((Screen.height/2)-100)+10,390,50),PlayerPrefs.GetString("SYS_STRING_89")+" '"+DeleteContactName+"'?");	

			}
				
			GUI.color=FontTMP2;
			GUI.skin=BTN_YES;
			if(GUI.Button(Rect((Screen.width/2)+100,(Screen.height/2)+10,50,50),""))
			{
				var DataOfContactsTMP1 = PlayerPrefs.GetString("ListContacts");
				var DataOfContacts1 = DataOfContactsTMP1.Split("+"[0]);
				
				var NewContactStringDelet="";
				var TMPStringContact=DeleteContactName+":"+DeleteContactAdress;
				
				var NumeroContactoDelet=0;
				for(contacto in DataOfContacts1){
					if(TMPStringContact!=contacto){
						if(contacto!="")
						{
							NewContactStringDelet=NewContactStringDelet+contacto+"+";
							NumeroContactoDelet=NumeroContactoDelet+1;
						}
					}
				}
				
				if(NumeroContactoDelet==0)
				{
					NewContactStringDelet="";
				}
										
				DelContactConfirm=false;
				DeleteContactAdress="";
				DeleteContactName="";
				PlayerPrefs.SetString("ListContacts",NewContactStringDelet);
			}
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect((Screen.width/2)-150,(Screen.height/2)+10,50,50),""))
			{
				DelContactConfirm=false;
				DeleteContactAdress="";
				DeleteContactName="";
			}
		}
		///////////////////////////////////////////////	
		
		
		//////////// Protecao de senha em e-mail /////////////////////
		if(ReadProtectedMailCheck)
		{
			GUI.DrawTexture(Rect(Screen.width/2-150,Screen.height/2-70,300,140),BOX);
			var CorTMP=GUI.color;
			var SkinTMP=GUI.skin;
			GUI.color=Color.black;
			GUI.skin.label.fontSize=15;
			GUI.skin.label.alignment=TextAnchor.MiddleCenter;
			GUI.Label(Rect(Screen.width/2-145,Screen.height/2-67,300,30),PlayerPrefs.GetString("SYS_STRING_81")+":");
			GUI.color=CorTMP;	
			GUI.skin=SkinTMP;	
			GUI.skin=DEFAULTSKN;
			SenhaPretected=GUI.PasswordField(Rect(Screen.width/2-145,Screen.height/2-30,283,30),SenhaPretected, "*"[0], 25);
			GUI.skin=BTN_NO;
			if(GUI.Button(Rect(Screen.width/2-145,Screen.height/2+8,50,50),""))
			{
				ReadFile="";
				ReadMsg="";
				ReadFrom="";
				ReadPretected=false;
				ReadProtectedMailCheck=false;
				ReadSubject="";
				SenhaPretected="";
				POSITION=2;
			}
			GUI.skin=BTN_YES;
			if(GUI.Button(Rect(Screen.width/2+88,Screen.height/2+8,50,50),""))
			{
				if(PlayerPrefs.GetString("USER_PASS")==BASE.Md5Sum(SenhaPretected))
				{
					if(ReadFile.Substring(ReadFile.Length - 1)!="r")
					{
						System.IO.File.Move(ReadFile,ReadFile+"_r");
					}
					ReadProtectedMailCheck=false;
					SenhaPretected="";					
				}
				else
				{
					BASE.SYSTEM_NOTIFY(2,PlayerPrefs.GetString("SYS_STRING_55"));
				}
			}
		}
		//////////////////////////////////////////////////////////////
	}
	else
	{
		GetComponent.<AudioSource>().volume=1;
		AmbientePlayer.volume=0;
	}

}

static function SendMailExternal(NewToE:String,NewSubjectE:String,NewMsgE:String,NewProtectedE:boolean)
{	
	if(NewToE!="" && NewSubjectE!="" && NewMsgE!="")
	{
		POSITION=2;
		var SendMailPHPE = new WWWForm();
		SendMailPHPE.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
		SendMailPHPE.AddField("password",PlayerPrefs.GetString("USER_PASS"));
		SendMailPHPE.AddField("To",NewToE);
		SendMailPHPE.AddField("Subject",NewSubjectE);
		if(NewProtectedE)
		{
			SendMailPHPE.AddField("Msg",BASE.INDICrypt(NewMsgE));
			SendMailPHPE.AddField("IsProtected","1");
		}
		else
		{
			SendMailPHPE.AddField("Msg",NewMsgE);
			SendMailPHPE.AddField("IsProtected","0");
		}
		
		var wwwSendMailE=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/send_mail.php",SendMailPHPE);

		while(PlayerPrefs.GetInt("WWW_BUSY")==1){
			yield;
		}
		PlayerPrefs.SetInt("WWW_BUSY",1);
		yield wwwSendMailE; 
		PlayerPrefs.SetInt("WWW_BUSY",0);
		
		if(wwwSendMailE.error!=null)
		{
			BASE.SYSTEM_NOTIFY(2,PlayerPrefs.GetString("SYS_STRING_75"));
		}
	}
}

function SendMail()
{	
	if(NewTo!="" && NewSubject!="" && NewMsg!="")
	{
		POSITION=2;
		var SendMailPHP = new WWWForm();
		SendMailPHP.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
		SendMailPHP.AddField("password",PlayerPrefs.GetString("USER_PASS"));
		SendMailPHP.AddField("To",NewTo);
		SendMailPHP.AddField("Subject",NewSubject);
		if(NewProtected)
		{
			SendMailPHP.AddField("Msg",BASE.INDICrypt(NewMsg));
			SendMailPHP.AddField("IsProtected","1");
		}
		else
		{
			SendMailPHP.AddField("Msg",NewMsg);
			SendMailPHP.AddField("IsProtected","0");
		}
		
		var wwwSendMail=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/send_mail.php",SendMailPHP);

		while(PlayerPrefs.GetInt("WWW_BUSY")==1){
			yield;
		}
		PlayerPrefs.SetInt("WWW_BUSY",1);
		yield wwwSendMail; 
		PlayerPrefs.SetInt("WWW_BUSY",0);
		
		if(wwwSendMail.error!=null)
		{
			BASE.SYSTEM_NOTIFY(2,PlayerPrefs.GetString("SYS_STRING_75"));
		}
		else
		{
			if(wwwSendMail.text=="OK")
			{
				BASE.SYSTEM_NOTIFY(1,PlayerPrefs.GetString("SYS_STRING_76"));
			}
			else
			{
				BASE.SYSTEM_NOTIFY(2,PlayerPrefs.GetString("SYS_STRING_75"));
			}
		}
		NewTo="";
		NewSubject="";
		NewMsg="";
		NewProtected=false;
	}
	else
	{
		BASE.SYS_MSG_TITLE=PlayerPrefs.GetString("SYS_STRING_72");
		BASE.SYS_MSG_TEXT=PlayerPrefs.GetString("SYS_STRING_73");
		BASE.SYS_MSG_SHOW=true;
	}
}

function SendGC(text:String)
{
	var tmpText="<b><i><color=#00ff00ff>"+username+":</color></i></b> "+text;
	GetComponent.<NetworkView>().RPC("RelerChatGC",RPCMode.All,tmpText);
	TextoChatGC="";
}

function OnConnectedToServer() {
	var atmpText="<b><i><color=#00ff00ff>"+username+" acabou de entrar</color></i></b>";
	GetComponent.<NetworkView>().RPC("RelerChatGC",RPCMode.All,atmpText);
	TextoChatGC="";
}

function PushMail()
{
	var PushMailPHP = new WWWForm();
	PushMailPHP.AddField("username",PlayerPrefs.GetString("USER_ID_SISPIC"));
	PushMailPHP.AddField("password",PlayerPrefs.GetString("USER_PASS"));
	
	var wwwPushMail=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/get_mail.php",PushMailPHP);
	
	while(PlayerPrefs.GetInt("WWW_BUSY")==1){
		yield;
	}
	PlayerPrefs.SetInt("WWW_BUSY",1);
	yield wwwPushMail; 
	PlayerPrefs.SetInt("WWW_BUSY",0);
	
	if(wwwPushMail.error==null)
	{
		if(wwwPushMail.text!="")
		{
			var MailsTMP = wwwPushMail.text.Split("«"[0]);
			for(actualM in MailsTMP)
			{
				var tmpMailData=actualM.Split("»"[0]);
				
				var From=tmpMailData[0];
				var Subject=tmpMailData[2];
				var Menssage=tmpMailData[3];
				var SecurityKey=tmpMailData[4];
				
				var FileMSGContent="";
				
				var SaveToFile=true;
				var MensagemComum=true;
				
				if(SecurityKey=="0")
				{
					// Tratamento de comandos de sistema remoto e Mensagens CHAT
					if(Menssage.Contains("%COMMAND%")){
						MensagemComum=false;
						// Comandos
						var Command_str=Menssage[9:Menssage.Length];
						var COMMAND_EXT=Command_str.Split(":"[0]);
						if(COMMAND_EXT[0]=="CONNECT_3D_TO_ME"){
							MensagemComum=true;
						}
						////////////////
					}
					/////////////////////////////////////////////////////
					if(MensagemComum){
						FileMSGContent=Menssage;
					}
				}
				else
				{
						FileMSGContent=Menssage+"!SECURITY_SYSTEM_SISPIC(INDI_KEY)!";
				}
				if(SaveToFile){
					BASE.WriteFile(PlayerPrefs.GetString("MyDocuments")+"/"+From+"-"+Subject+".sn_msg",FileMSGContent);	
				}		
			}
			BASE.SYSTEM_NOTIFY(4,PlayerPrefs.GetString("SYS_STRING_74"));
		}
	}
}

@RPC
function RelerChatGC(texto:String)
{
	GetComponent.<AudioSource>().Play();
	linhaChatGC[9]=linhaChatGC[8];
	linhaChatGC[8]=linhaChatGC[7];
	linhaChatGC[7]=linhaChatGC[6];
	linhaChatGC[6]=linhaChatGC[5];
	linhaChatGC[5]=linhaChatGC[4];
	linhaChatGC[4]=linhaChatGC[3];
	linhaChatGC[3]=linhaChatGC[2];
	linhaChatGC[2]=linhaChatGC[1];
	linhaChatGC[1]=linhaChatGC[0];
	linhaChatGC[0]=texto;
	
	/// Sons 
	if(texto.Contains("!cry"))
	{
		xatSoundPlayer.clip=cry;
		xatSoundPlayer.Play();
	}
	if(texto.Contains("!fly"))
	{
		xatSoundPlayer.clip=fly;
		xatSoundPlayer.Play();
	}
	if(texto.Contains("!slap"))
	{
		xatSoundPlayer.clip=slap;
		xatSoundPlayer.Play();
	}
	if(texto.Contains("!laughing"))
	{
		xatSoundPlayer.clip=laughing;
		xatSoundPlayer.Play();
	}
	if(texto.Contains("!woo_hoo"))
	{
		xatSoundPlayer.clip=woo_hoo;
		xatSoundPlayer.Play();
	}
	
	///// Ambiente
	if(texto.Contains("sad_scene"))
	{
		AmbientePlayer.clip=sad_scene;
		AmbientePlayer.Play();
	}
	if(texto.Contains("love_scene"))
	{
		AmbientePlayer.clip=love_scene;
		AmbientePlayer.Play();
	}
	if(texto.Contains("happy_scene"))
	{
		AmbientePlayer.clip=happy_scene;
		AmbientePlayer.Play();
	}
	if(texto.Contains("dramatic_scene") || texto.Contains("terror_scene"))
	{
		AmbientePlayer.clip=dramatic_scene;
		AmbientePlayer.Play();
	}
	if(texto.Contains("troll_scene"))
	{
		AmbientePlayer.clip=troll_scene;
		AmbientePlayer.Play();
	}

	
	if(texto.Contains("stop_scene"))
	{
		AmbientePlayer.Stop();
	}
	////////////////////
}