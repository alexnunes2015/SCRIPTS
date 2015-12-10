 #pragma strict

// Timer 1 //
var Timer1_Value=0;
var Timer1_Enable=false;
/////////////

// Timer 2 //
var Timer2_Value=0;
var Timer2_Enable=false;
var Actual_Joke="";
/////////////

// Icones 
var HomeICO:Texture;
var BusinessICO:Texture;
var GamesICO:Texture;
var MediaEditorICO:Texture;
var ProgrammerICO:Texture;
var KioskICO:Texture;

/////////////

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

var RegisterWindow:Texture;
//////////////////////////

var USERNAME="";
var PASSWORD="";


//// CONFIG STEPS /////
// 01 - Language Screen
// 1 - Welcome Screen
// 2 - Ask for SiSpic ID
// 20 - Sign up screen
// 21 - Login Screen
// 30 - Chose primary task of the machine
// 31 - ask to user chose this favaite apps manually ou automatic
/// 32 - Basic
/// 33 - Business
/// 34 - Games
/// 35 - Media Editor
/// 36 - Develop

// 4 - Install all programs with strToInstall command
// 5 - Conclusion

var stepConfig=0;
var strToInstall="";
////////////////////////

//// Strings ////////
// ActualLang vaules
// 0 - EN
// 1 - PT
// 2 - FR
var ActualLang=0;

var str01=["First-Run Assistant","Assistente de primeiro uso","First-Run adjoint"];
var str1=["Welcome to assistant first use of ZED operating system.\n\nThis wizard will help you set up your account SiSpic ID and your entire computer, which will show us what will be the main task of this computer, such as programs to install\n\nTo begin click Next",
			"Bem vindo ao assistente de primeiro uso do sistema operativo ZED.\n\nEste assistente ira o ajudar a configurar a sua conta SiSpic ID e todo o seu computador, onde ira nos mostrar qual será a tarefa principal deste computador, tal como os programas que deseja instalar.\n\nPara começar clique em Próximo",
			"Bienvenue à la première utilisation de l'assistant système d'exploitation ZED.\n\nCet assistant va vous aider a configurer votre compte SiSpic ID et votre ordinateur entier, qui nous montrent ce que sera la tache principale de cet ordinateur, tels que les programmes a installer.\n\nPour commencer cliquez sur Suivant"];
var str2=["Next","Proximo","Suivant"];
var str3=["Back","Voltar","Retourner"];
var str4=["Already have a SiSpic ID?\n\nA SiSpic ID allows you to get in touch with all users of SiSpic Networks can meet new people, communicate and carry out various activities together.",
		  "Já tem uma SiSpic ID?\n\nUma SiSpic ID permite-lhe entrar em contacto com todos os utilizadores da SiSpic Networks, poderá conhecer novas pessoas, comunicar e realizar varias atividades em conjunto.",
		  "Vous avez déjà un SiSpic ID?\n\nUn SiSpic ID vous permet d'entrer en contact avec tous les utilisateurs de SiSpic Networks peuvent rencontrer de nouvelles personnes, de communiquer et effectuer diverses activités ensemble."];
var str5=["Yes","Sim","Oui"];
var str6=["Sign up","Registar","Registre"];
var str7=["Ignore","Ignorar","Ignorer"];
var str8=["Login","Entrar","Entrer"];
var str9=["Complete the following form to register in SiSpic Networks","Preencha o seguinte formulário para se registrar na SiSpic Networks","Remplissez le formulaire ci-dessous pour vous inscrire à SiSpic Networks"];
var str10=["Name:","Nome:","Nom:"];
var str11=["Nickname:","Apelido:","Surnom:"];
var str12=["SiSpic ID:","SiSpic ID:","SiSpic ID:"];
var str13=["Password:","Senha:","Mot de passe:"];
var str14=["Verify Password:","Verificar Senha:","Vérifiez Mot de passe:"];
var str15=["Birth date:","Data de nascimento:","Date de naissance:"];
var str16=["Email External:","Email externo:","Email externe:"];
var str17=["Sex:","Sexo:","Sexe:"];
var str18=["This account already exists","Esta conta já existe","Ce compte existe déjà"];
var str19=["DB error","Erro de DB","Erreur du DB"];
var str20=["Server unavailable","Servidor indisponível","serveur indisponible"];
var str21=["What will be the main function of this computer?","Qual será a função principal deste computador?","Quelle est la fonction principale de cet ordinateur?"];
var str22=["Enter your login details","Introduza os seus dados de login","Entrez vos informations de login"];
var str23=["SiSpic ID or password invalid","ID SiSpic ou senha inválidos","ID SiSpic ou mot de passe incorrect"];
var str24=["What is the main function of this computer?","Qual será a função principal deste computador?","Quelle est la fonction principale de cet ordinateur?"];
var str25=["Basic","Basico","Basic"];
var str26=["Business","Empresa","Entreprise"];
var str27=["Games","Jogos","Jeux"];
var str28=["Multimedia Editor","Editor de Multimedia","Multimédia éditeur"];
var str29=["Programmer","Programador","Programmeur"];
var str30=["Kiosk","Quiosque","kiosque"];
var str31=["You want to select the software to be installed for this task?\nOtherwise it will install the software for the specific task assigned to this computer","Quer selecionar o software a instalar para esta tarefa?\nCaso contrario será instalado o software especifico para a tarefa atribuida a este computador","Vous souhaitez sélectionner le logiciel à être installé pour cette tâche?\nSinon, il va installer le logiciel pour la tâche spécifique attribué à cet ordinateur"];
var str32=["No","Nao","Non"];
var str33=["The following software will be installed:","Será instalado o seguinte software:","Le logiciel suivants vont être installés:"];
var str34=["Please wait while we install the selected applications ...","Aguarde enquanto instalamos os aplicativos selecionados ...","S'il vous plaît patienter pendant que nous installons les applications sélectionnées ..."];
var str35=["Congratulations, just complete the first use wizard\nClick Finish to enter the ZED","Parabéns, acabou de Concluir o assistente de primeiro uso,\nClique em concluir para entrar no ZED","Félicitations, il suffit de remplir le premier assistant de l'utilisation\nCliquez sur Terminer pour entrer dans le ZED"];
var str36=["Finish","Concluir","Terminer"];
var str37=["Ignore it","Ignorar isto","Ignorez"];
var str38=["Enter your password to install software","Introduza a sua senha para instalar software","Entrez votre mot de passe pour installer le logiciel"];
/////////////////////

// Joke innstall //
var JOKE0=["","Um dia, estava com tanta fome que comi o meu papagaio - contou o explorador ao amigo. E a que é sabia? Peru, ganso selvagem, tordo... aquele papagaio era capaz de imitar tudo. ",""];
var JOKE1=["","O que faz uma cama elastica no polo norte? \nÉ para o urso polar",""];
var JOKE2=["","O marido ao despedir-se da esposa: Querida, enquanto eu estiver em viagem, como queres que te mande noticias?\nPor telefone, telegrama ou fax?\nDe preferência, por transferência bancária. ",""];
var JOKE3=["","Conheces aquela do Iogurte?\nNao\nÉ natural",""];
var JOKE4=["","A minha mulher fugiu com o meu melhor amigo.\nHa sim? e quem é ele?\nNão sei! Só sei que ele agora é o meu melhor amigo",""];
var JOKE5=["","Explique lá como conseguiu arrombar o cofre - diz o juiz ao réu. Não vale a pena, sr. dr. Juiz. O senhor nunca seria capaz de fazer o mesmo - responder o réu. ",""];

var InstallCh="";

var wallpaper:Texture;
var titleBar:Texture;
var logo:Texture;

var LoginSKN0:GUISkin;

var EN_FLAG:Texture;
var PT_FLAG:Texture;
var FR_FLAG:Texture;

var BASE_SKN:GUISkin;

var Title="";

function Start () {
	Cursor.visible=true;
}

function Update () {
	Display.main.SetRenderingResolution(Display.main.systemWidth,Display.main.systemHeight);
	if(Application.platform!=RuntimePlatform.LinuxPlayer){
		Screen.fullScreen=true;
	}
}

function OnGUI(){
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),wallpaper);
	GUI.DrawTexture(Rect(0,40,Screen.width,60),titleBar);
	GUI.DrawTexture(Rect(15,40,220,70),logo);
	
	GUI.skin.label.fontSize=28;
	GUI.skin.label.alignment=TextAnchor.MiddleCenter;
	GUI.Label(Rect(0,40,Screen.width,60),"<b><i>"+Title+"</i></b>");
	
	
	// 01 - Language Screen
	if(stepConfig==0){
		GUI.skin=BASE_SKN;
		if(GUI.Button(Rect((Screen.width/2)-200,Screen.height/2-40,80,80),EN_FLAG)){
			ActualLang=0;
			stepConfig++;
			Title=str01[ActualLang];
		}
		if(GUI.Button(Rect((Screen.width/2)-40,Screen.height/2-40,80,80),PT_FLAG)){
			ActualLang=1;		
			stepConfig++;
			Title=str01[ActualLang];	
		}
		if(GUI.Button(Rect((Screen.width/2)+100,Screen.height/2-40,80,80),FR_FLAG)){
			ActualLang=2;
			stepConfig++;
			Title=str01[ActualLang];
		}
	}
	// 1 - Welcome Screen
	if(stepConfig==1){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str1[ActualLang]);
		GUI.skin=BASE_SKN;
		if(GUI.Button(Rect(Screen.width/2-50,Screen.height-50,100,50),str37[ActualLang])){
			stepConfig=5;
		}
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str2[ActualLang]+"</size>")){
			stepConfig++;
		}
		if(GUI.Button(Rect(0,Screen.height-100,100,50),"<size=21>"+str3[ActualLang]+"</size>")){
			stepConfig=stepConfig-1;
			Title="";
		}
	}
	// 2 - Ask for SiSpic ID
	if(stepConfig==2){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str4[ActualLang]);
		GUI.skin=BASE_SKN;
		if(GUI.Button(Rect(Screen.width-100,Screen.height-220,100,50),"<size=21>"+str5[ActualLang]+"</size>")){
			stepConfig=21;
		}
		if(GUI.Button(Rect(Screen.width-100,Screen.height-160,100,50),"<size=21>"+str6[ActualLang]+"</size>")){
			stepConfig=20;
		}
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str7[ActualLang]+"</size>")){
			stepConfig=30;
		}
		
		if(GUI.Button(Rect(0,Screen.height-100,100,50),"<size=21>"+str3[ActualLang]+"</size>")){
			stepConfig=stepConfig-1;
		}
	}
	// 20 - Sign up screen
	if(stepConfig==20){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str9[ActualLang]);
		
		var TMPSKIN=GUI.skin;
		var TMPCOLOR1=GUI.color;
		GUI.skin.label.fontSize=14;
		GUI.Label(Rect(Screen.width/2-190,Screen.height-455,400,30),str10[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-415,400,30),str11[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-375,400,30),str12[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-335,400,30),str13[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-295,400,30),str14[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-255,400,30),str15[ActualLang]);
		//GUI.Label(Rect(Screen.width/2-190,Screen.height-215,400,30),str16[ActualLang]);
		GUI.Label(Rect(Screen.width/2-190,Screen.height-175,400,30),str17[ActualLang]);
		GUI.color=TMPCOLOR1;
		GUI.skin.textField.alignment=TextAnchor.MiddleLeft;
		NovoNome=GUI.TextField(Rect(Screen.width/2-140,Screen.height-455,300,25),NovoNome);
		NovoApelido=GUI.TextField(Rect(Screen.width/2-120,Screen.height-415,300,25),NovoApelido);
		NovoID_SISPIC=GUI.TextField(Rect(Screen.width/2-120,Screen.height-375,300,25),NovoID_SISPIC.ToLower());
		NovoPassword=GUI.PasswordField (Rect(Screen.width/2-30,Screen.height-335,200,25), NovoPassword, "*"[0], 25);
		NovoPasswordVerify=GUI.PasswordField (Rect(Screen.width/2-30,Screen.height-295,200,25), NovoPasswordVerify, "*"[0], 25);	
		GUI.skin.textField.alignment=TextAnchor.MiddleCenter;
		NovoDataN=GUI.TextField(Rect(Screen.width/2-55,Screen.height-255,130,25),NovoDataN,10);	
		GUI.skin.textField.alignment=TextAnchor.MiddleLeft;
//		NovoEmail=GUI.TextField(Rect(Screen.width/2-30,Screen.height-215,200,25),NovoEmail.ToLower());

		// Para corrigir Arroba
		NovoEmail="EMAIL_INTERNAL_PROBLEM";

		GUI.skin.textField.alignment=TextAnchor.MiddleCenter;
		NovoSexo=GUI.TextField(Rect(Screen.width/2-120,Screen.height-175,40,25),NovoSexo.ToUpper(),1);
		GUI.skin=TMPSKIN;
		GUI.color=TMPCOLOR1;
		
		var TMPCOLOR11=GUI.color;
		GUI.color=Color.red;
		GUI.skin.label.alignment=TextAnchor.MiddleCenter;
		GUI.skin.label.fontStyle=FontStyle.Bold;
		GUI.skin.label.fontSize=11;
		GUI.Label(Rect(Screen.width/2-200,Screen.height-135,400,40),"<size=17>"+MotivoErro+"</size>");
		GUI.color=TMPCOLOR11;
		
		
		
		GUI.skin=BASE_SKN;		
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str6[ActualLang]+"</size>")){
			Registar();
		}
		
		if(GUI.Button(Rect(0,Screen.height-100,100,50),"<size=21>"+str3[ActualLang]+"</size>")){
			stepConfig=2;
		}
	}
	// 21 - Login Screen
	if(stepConfig==21){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str22[ActualLang]);
			
		GUI.Label(Rect(Screen.width/2-200,Screen.height/2-100,200,30),str12[ActualLang]);
		GUI.Label(Rect(Screen.width/2-200,Screen.height/2-50,200,30),str13[ActualLang]);
		
		GUI.skin=LoginSKN0;	
		USERNAME=GUI.TextField(Rect(Screen.width/2-50,Screen.height/2-100,200,30),USERNAME);
		PASSWORD=GUI.PasswordField(Rect(Screen.width/2-50,Screen.height/2-50,200,30), PASSWORD, "*"[0], 25);
				
		GUI.skin=BASE_SKN;		
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str8[ActualLang]+"</size>")){
			OnlineLogin();
		}
		
		if(GUI.Button(Rect(0,Screen.height-100,100,50),"<size=21>"+str3[ActualLang]+"</size>")){
			stepConfig=2;
		}
		
		var TMPCOLOR12=GUI.color;
		GUI.color=Color.red;
		GUI.skin.label.alignment=TextAnchor.MiddleCenter;
		GUI.skin.label.fontStyle=FontStyle.Bold;
		GUI.skin.label.fontSize=11;
		GUI.Label(Rect(Screen.width/2-200,Screen.height-200,400,40),"<size=17>"+MotivoErro+"</size>");
		GUI.color=TMPCOLOR12;
	}
	// 30 - Chose primary task of the machine
	if(stepConfig==30){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str24[ActualLang]);
		
		GUI.skin=BASE_SKN;
		GUI.DrawTexture(Rect(120,200,50,50),HomeICO);
		if(GUI.Button(Rect(200,200,200,50),str25[ActualLang])){
			InstallCh="Home";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","Home");
		}
		GUI.DrawTexture(Rect(120,300,50,50),BusinessICO);
		if(GUI.Button(Rect(200,300,200,50),str26[ActualLang])){
			InstallCh="Business";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","Business");
		}
		GUI.DrawTexture(Rect(120,400,50,50),GamesICO);
		if(GUI.Button(Rect(200,400,200,50),str27[ActualLang])){
			InstallCh="Games";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","Games");
		}
		GUI.DrawTexture(Rect(520,200,50,50),MediaEditorICO);
		if(GUI.Button(Rect(600,200,200,50),str28[ActualLang])){
			InstallCh="MediaEditor";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","MediaEditor");
		}
		GUI.DrawTexture(Rect(520,300,50,50),ProgrammerICO);
		if(GUI.Button(Rect(600,300,200,50),str29[ActualLang])){
			InstallCh="Programmer";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","Programmer");
		}
		GUI.DrawTexture(Rect(520,400,50,50),KioskICO);
		if(GUI.Button(Rect(600,400,200,50),str30[ActualLang])){
			InstallCh="Kiosk";
			stepConfig=31;
			PlayerPrefs.SetString("MY_OS_TASK","Kiosk");
		}
	}
	// 31 - ask to user chose this favaite apps manually ou automatic
	if(stepConfig==31){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		if(InstallCh=="Home"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nGnome-paint\nVlc Player\nPidgenb\nLibreOffice\nK3b");
		}
		if(InstallCh=="Business"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nEvolution\nGimp\nK3b\nLibreOffice");
		}
		if(InstallCh=="Games"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nPlayOnLinx\nSteam");
		}
		if(InstallCh=="MediaEditor"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nVlc Player\nAudacity\nGimp\nBlender\nArdour\nKdenlive\nInkscape\nK3b");
		}
		if(InstallCh=="Programmer"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nGeany\nApache2\nGambas3\nMysql-server\nLibapache2-mod-auth-mysql\nPhp5-mysql\nPhp5\nLibapache2-mod-php5\nPhp5-mcrypt\nEclipse");
		}
		if(InstallCh=="Kiosk"){
			GUI.Label(Rect(30,120,Screen.width-60,700),str31[ActualLang]+"\n\n<i><b>"+str33[ActualLang]+"</b></i>\n\nZED KiosSoft");
		}
		
		GUI.skin=BASE_SKN;
		if(GUI.Button(Rect(0,Screen.height-100,100,50),"<size=21>"+str3[ActualLang]+"</size>")){
			stepConfig=30;
		}
		if(GUI.Button(Rect(Screen.width-100,Screen.height-200,100,50),"<size=21>"+str5[ActualLang]+"</size>")){
			
		}
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str32[ActualLang]+"</size>")){
			if(InstallCh=="Home"){
				strToInstall="#!/bin/bash\napt-get remove -y evolution gimp eclipse playonlinux steam inkscape audacity blender ardour kdenlive geany apache2 gambas3 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt remastersys*\napt-get autoremove -t \napt-get clean -y\n";
			}
			if(InstallCh=="Business"){
				strToInstall="#!/bin/bash\napt-get remove -y gnome-paint vlc pidgin eclipse playonlinux steam inkscape audacity blender ardour kdenlive geany apache2 gambas3 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt remastersys*\napt-get autoremove -t \napt-get clean -y\n";
			}
			if(InstallCh=="Games"){
				strToInstall="#!/bin/bash\napt-get remove -y gnome-paint vlc pidgin libreoffice evolution gimp eclipse k3b inkscape audacity blender ardour kdenlive geany apache2 gambas3 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt remastersys*\napt-get autoremove -t \napt-get clean -y\n";
			}
			if(InstallCh=="MediaEditor"){				
				strToInstall="#!/bin/bash\napt-get remove -y gnome-paint pidgin libreoffice evolution eclipse k3b playonlinux steam geany apache2 gambas3 mysql-server libapache2-mod-auth-mysql php5-mysql php5 libapache2-mod-php5 php5-mcrypt remastersys*\napt-get autoremove -t \napt-get clean -y\n";
			}
			if(InstallCh=="Programmer"){				
				strToInstall="#!/bin/bash\napt-get remove -y gnome-paint vlc pidgin libreoffice evolution gimp k3b playonlinux steam inkscape audacity blender ardour kdenlive remastersys*\napt-get autoremove -t \napt-get clean -y\n";;
			}
			stepConfig=4;
			Timer1_Enable=true;
			Timer2_Enable=true;
			var SH_SETUP = File.CreateText("/ZED/TMP/installing.sh"); 
			SH_SETUP.WriteLine(strToInstall);
			SH_SETUP.Close();
			LINUX_RUN("chmod +x /ZED/TMP/installing.sh;cd /ZED/TMP;gksudo ./installing.sh -m '"+str38[ActualLang]+"';rm -f /ZED/TMP/installing.sh");
		}
	}
	// 4 - Install all programs with strToInstall command
	if(stepConfig==4){
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		if(Timer1_Value<=30){
			GUI.Label(Rect(30,120,Screen.width-60,700),str34[ActualLang]+"\n\n | O O O");
		}
		if(Timer1_Value>=31 && Timer1_Value<=50){
			GUI.Label(Rect(30,120,Screen.width-60,700),str34[ActualLang]+"\n\n O | O O");
		}
		if(Timer1_Value>=51 && Timer1_Value<=60){
			GUI.Label(Rect(30,120,Screen.width-60,700),str34[ActualLang]+"\n\n O O | O");
		}
		if(Timer1_Value>=60){
			GUI.Label(Rect(30,120,Screen.width-60,700),str34[ActualLang]+"\n\n O O O |");
		}
		
		GUI.Label(Rect(50,250,Screen.width-100,500),Actual_Joke);
		
		// Show jokes
		if(Timer2_Enable){
			Timer2_Value++;
			if(Timer2_Value==2){
				var Tmpi=Random.Range(0,6);
				if(Tmpi==0){
					Actual_Joke=JOKE0[ActualLang];
				}
				if(Tmpi==1){
					Actual_Joke=JOKE1[ActualLang];
				}
				if(Tmpi==2){
					Actual_Joke=JOKE2[ActualLang];
				}
				if(Tmpi==3){
					Actual_Joke=JOKE3[ActualLang];
				}
				if(Tmpi==4){
					Actual_Joke=JOKE4[ActualLang];
				}
				if(Tmpi==5){
					Actual_Joke=JOKE5[ActualLang];
				}
			}
			if(Timer2_Value>=1500){
				Timer2_Value=0;
			}
		}
		
		// Verify if Install script is done and deleted
		if(Timer1_Enable){
			Timer1_Value++;
			if(Timer1_Value>=90){
				Timer1_Value=0;
				if(!System.IO.File.Exists("/ZED/TMP/installing.sh")){
					Timer1_Enable=false;
					Timer2_Enable=false;
					stepConfig=5;
				}
			}
		}
	}
	// 5 - Conclusion
	if(stepConfig==5){
		var audio: AudioSource = GetComponent.<AudioSource>();
		audio.volume=audio.volume-0.0002;
		GUI.skin.label.alignment=TextAnchor.UpperLeft;
		GUI.skin.label.fontSize=20;
		GUI.Label(Rect(30,120,Screen.width-60,700),str35[ActualLang]);
		
		GUI.skin=BASE_SKN;		
		if(GUI.Button(Rect(Screen.width-100,Screen.height-100,100,50),"<size=21>"+str36[ActualLang]+"</size>")){
			Application.LoadLevel("Login");
		}
	}
}

function OnlineLogin(){
	var LoginPHP = new WWWForm();
	LoginPHP.AddField("username",USERNAME);
	LoginPHP.AddField("password",Md5Sum(PASSWORD));
	var wwwLogin=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/login.php",LoginPHP);
	
	yield wwwLogin;
	if(wwwLogin.error!=null)
	{
		MotivoErro="*"+str20[ActualLang];
	}
	else
	{	
		if(wwwLogin.text.Substring(0,1)=="0" || wwwLogin.text.Substring(0,1)=="1")
		{
			if(wwwLogin.text.Substring(0,1)=="0")
			{
				MotivoErro="*"+str22[ActualLang];
			}
			if(wwwLogin.text.Substring(0,1)=="1")
			{
				MotivoErro="*"+str23[ActualLang];
			}
		}
		else
		{
			if(!wwwLogin.text.Contains("Warning") && !wwwLogin.text.Contains("Error") && !wwwLogin.text.Contains("error")){
				stepConfig=30;
				PlayerPrefs.SetString("DERNIER_ID_SISPIC",USERNAME);
			}else{
				MotivoErro="*"+str20[ActualLang];
			}
		}
	}
}

function OnApplicationQuit () {
	Application.CancelQuit();
}

function LINUX_RUN(cmd:String){
	var LINUX_R = File.CreateText("/ZED/command"); 
	LINUX_R.WriteLine(cmd);
	LINUX_R.Close();
}

function Registar(){
	var RegisterPHP = new WWWForm();
	RegisterPHP.AddField("Nome",NovoNome);
	RegisterPHP.AddField("Apelido",NovoApelido);
	RegisterPHP.AddField("ID_SISPIC",NovoID_SISPIC);
	RegisterPHP.AddField("Password",Md5Sum(NovoPasswordVerify));
	if(ActualLang==0){
		RegisterPHP.AddField("SYSTEM_LANG","EN");
	}
	if(ActualLang==1){
		RegisterPHP.AddField("SYSTEM_LANG","PT");
	}
	if(ActualLang==2){
		RegisterPHP.AddField("SYSTEM_LANG","FR");
	}

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
	
	if(wwwRegister.error!=null)
	{
		MotivoErro="*"+str20[ActualLang];
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
			stepConfig=30;
			PlayerPrefs.SetString("DERNIER_ID_SISPIC",USERNAME);
		}
		if(wwwRegister.text.Substring(0,1)=="1")
		{
			MotivoErro="*"+str18[ActualLang];
			NovoID_SISPIC="";
		}
		if(wwwRegister.text.Substring(0,1)=="2")
		{
			MotivoErro="*"+str19[ActualLang];
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
