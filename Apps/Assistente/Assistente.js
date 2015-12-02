 #pragma strict

var Avatar:Texture;
var Pointer:Texture;
var ZEDResposta="";
var UtilizadorResposta="";

var Assuto_Actual="";

var JogoAdivinha_ACTIVO=false;
var JogoAdivinha_Numero=0;
var JogoAdivinha_Tentativas=0;

var DEFAULTSKIN:GUISkin;

var JaComprimentou=false;

///// Temporizadores ////////////////
var SaveDataTimerOffline=0;
var ConhecedorTimer=0;

//////////////////////////////////////

/////// PERSONALIDADE //////////// (TESTE ONLY)

var Nome="Rafael";
var Sexo="M";
var BET_Interesses="Informatica/Programacao/Filmes";
var USER_Interesses="Informatica/Programaçao/Pesicologia";
var Tempo_conhecer_utilizador=0;
var Humor_media_utilizador:float=0.0; // Humor varia de -100 (Mau humurado) a 100 (Bem humurado)
var Humor_soma_utilizador:int=0;
var Utilizador_Desgostos="FilmesAcacao/Insultos";
var Utilizador_Gostos="Amizade/Aprender";
var Utilizador_Amor="Indi";

/////////////////////////////////

function Start () {

	// Saudacao
	if(System.DateTime.Now.Hour<=23 && System.DateTime.Now.Hour>=20)
	{
		ZEDResposta="Boa Noite "+PlayerPrefs.GetString("USER_Nick");
	}
	if(System.DateTime.Now.Hour<=19 && System.DateTime.Now.Hour>=13)
	{
		ZEDResposta="Boa tarde "+PlayerPrefs.GetString("USER_Nick");
	}
	if(System.DateTime.Now.Hour<=13 && System.DateTime.Now.Hour>=6)
	{
		ZEDResposta="Bom dia "+PlayerPrefs.GetString("USER_Nick");
	}
	if(System.DateTime.Now.Hour<=6 && System.DateTime.Now.Hour>=0)
	{
		ZEDResposta="Ola "+PlayerPrefs.GetString("USER_Nick")+"\n Estou com um pouco de sono :/";
	}
}

function Update () {

}

function OnGUI()
{
	if(BASE.ShowAssistente)
	{
		GUI.skin=DEFAULTSKIN;
		GUI.DrawTexture(Rect(Screen.width-150,150,100,100),Avatar);
		GUI.TextArea(Rect(Screen.width-450,150,300,60),"<size=10>"+ZEDResposta+"</size>");
		GUI.DrawTexture(Rect(Screen.width-155,185,40,20),Pointer);
		UtilizadorResposta=GUI.TextField(Rect(Screen.width-450,210,270,20),UtilizadorResposta);
		if(GUI.Button(Rect(Screen.width-180,210,30,20),">"))
		{
			if(UtilizadorResposta!="")
			{
				Alma();
			}
		}
	}
}


function Alma()
{
	var numeroAleatorio=0;
	var Sei_o_que_E=false;
	
	UtilizadorResposta=UtilizadorResposta.ToLower();
	
	
	if(JogoAdivinha_ACTIVO==false)
	{
		/// Respostas entendidas
		
		// Respostas a preguntas anteriores
		if((UtilizadorResposta.Contains("bem") || UtilizadorResposta.Contains("feliz") || UtilizadorResposta.Contains("contente") || UtilizadorResposta.Contains("alegre") || UtilizadorResposta.Contains(":D") || UtilizadorResposta.Contains(":)") || UtilizadorResposta.Contains("c:")) && !Sei_o_que_E)
		{
			if(Assuto_Actual=="como o utilizador se sente")
			{
				ZEDResposta="Ainda bem :)";
				Assuto_Actual="";
				Sei_o_que_E=true;
			}
		}
		if((UtilizadorResposta.Contains("mal") || UtilizadorResposta.Contains("triste") || UtilizadorResposta.Contains("infeliz") || UtilizadorResposta.Contains(":'(" || UtilizadorResposta.Contains(":(") || UtilizadorResposta.Contains(":/") || UtilizadorResposta.Contains(":'/") || UtilizadorResposta.Contains(":c"))) && !Sei_o_que_E)
		{
			if(Assuto_Actual=="como o utilizador se sente")
			{
				ZEDResposta="Porque? :( \n Se quiser pode confiar em mim :)";
				Assuto_Actual="";
				Sei_o_que_E=true;
			}
		}
		if((UtilizadorResposta.Contains("mais ou menos") || UtilizadorResposta.Contains("+\\-") || UtilizadorResposta.Contains("+/-") || UtilizadorResposta.Contains(":s") || UtilizadorResposta.Contains("indo") || UtilizadorResposta.Contains("andando") && !Sei_o_que_E))
		{
			if(Assuto_Actual=="como o utilizador se sente")
			{
				ZEDResposta="Porque? \n Seja o que for anine-se ;)";
				Assuto_Actual="";
				Sei_o_que_E=true;
			}
		}
		/////////////////////////////
			
		/// Respostas complexas
		// Respostas chave
		// -como
		// -quem
		// -onde
		// -quando
		// -qual
		// -quantos
		// -por que / pq
		// -que
		// -quero
		// -pode/podes
		// -eu
		
		// QUERO
		if(UtilizadorResposta.Contains("quero") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("jogar") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("adivinha")  && !Sei_o_que_E)
				{
					ZEDResposta="Ok, tem de adivinhar o numero \n De 0 a 100";
					JogoAdivinha_Numero=Random.Range(0,101);
					JogoAdivinha_ACTIVO=true;
					Sei_o_que_E=true;
				}	
			}
			if(UtilizadorResposta.Contains("ouvir") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("musica") || UtilizadorResposta.Contains("coisa")  && !Sei_o_que_E)
				{
					var filePaths_MusicRandom : String[];
					var filePaths_MusicRandomTMP=new Array();
					filePaths_MusicRandom = Directory.GetFiles(PlayerPrefs.GetString("MyMusic"),"*.*");
					for(File_MusicRandom in filePaths_MusicRandom)
					{
						var FileDir_MusicRandom=File_MusicRandom;
						var FileNameWithExtension_MusicRandom=Path.GetFileName(FileDir_MusicRandom);
						var FileNameWithoutExtension_MusicRandom=Path.GetFileNameWithoutExtension(FileNameWithExtension_MusicRandom);
						var FileExtension_MusicRandom=Path.GetExtension(FileNameWithExtension_MusicRandom);
						if(FileExtension_MusicRandom==".wav" || FileExtension_MusicRandom==".ogg")
						{
							filePaths_MusicRandomTMP.Add(File_MusicRandom);
						}			
					}
					MusicPlayer.OpenMusic(filePaths_MusicRandomTMP[Random.Range(0,filePaths_MusicRandomTMP.length)]);
					BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
					ZEDResposta="Ok ;)";
					Sei_o_que_E=true;
				}else{			
					UtilizadorResposta=UtilizadorResposta.Replace("ouvir ","#");
					var tmp2=UtilizadorResposta.Split("#"[0]);
					UtilizadorResposta="";
					
					/// Procurar pela musica
					var filePaths_Music : String[];
					var filePaths_Music_TMP=new Array();
					
					filePaths_Music = Directory.GetFiles(PlayerPrefs.GetString("MyMusic"),"*.*");
					
					var ToSeacrh_Music=tmp2[1].Split(" "[0]);
					for(File_Music in filePaths_Music)
					{
						var FileDir_Music=File_Music.ToLower();
						var FileNameWithExtension_Music=Path.GetFileName(FileDir_Music);
						var FileNameWithoutExtension_Music=Path.GetFileNameWithoutExtension(FileNameWithExtension_Music);
						var FileExtension_Music=Path.GetExtension(FileNameWithExtension_Music);
						var MUSIC_TEMP_NAME:String=FileNameWithoutExtension_Music.ToLower();
						if(FileExtension_Music==".wav" || FileExtension_Music==".ogg")
						{
							var Musica_Existe=false;
							for(TermoMusica in ToSeacrh_Music){
								if(TermoMusica!=""){
									if(MUSIC_TEMP_NAME.Contains(TermoMusica)){
										Musica_Existe=true;
									}
								}
							}
							if(Musica_Existe){
								filePaths_Music_TMP.Add(File_Music);
							}
						}		
					}
					////////////////////////////
					if(filePaths_Music_TMP.length>=1){
						ZEDResposta="vamos ouvir '"+tmp2[1]+"'";
						MusicPlayer.OpenMusic(filePaths_Music_TMP[Random.Range(0,filePaths_Music_TMP.length-1)]);
						BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
					}else{
						ZEDResposta="Nao encontrei '"+tmp2[1]+"'\nVou procurar no youtube";
						Application.OpenURL("https://www.youtube.com/results?search_query="+tmp2[1]);
					}
					Sei_o_que_E=true;
				}
				UtilizadorResposta="";
			}
		}
		
		// QUANTOS
		if(UtilizadorResposta.Contains("quantos") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("anos") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("tens?") && !Sei_o_que_E)
				{
					var ZEDIdadeQUANTOS=System.DateTime.Now.Year-2004;
					ZEDResposta="actualmente tenho "+ZEDIdadeQUANTOS+" anos";
					Sei_o_que_E=true;
				}	
			}
		}	
		// QUE
		if(UtilizadorResposta.Contains("que") && !Sei_o_que_E)
		{
			if((UtilizadorResposta.Contains("idade") || UtilizadorResposta.Contains("data")) && !Sei_o_que_E)
			{
				if((UtilizadorResposta.Contains("tens") || UtilizadorResposta.Contains("data")) && !Sei_o_que_E)
				{
					var ZEDIdadeQUAL1=System.DateTime.Now.Year-2004;
					ZEDResposta="actualmente tenho "+ZEDIdadeQUAL1+" anos";
					Sei_o_que_E=true;
				}
			}
			if((UtilizadorResposta.Contains("dia") || UtilizadorResposta.Contains("data")) && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("hoje") && !Sei_o_que_E)
				{
					var MesActualQUE="";
					if(System.DateTime.Now.Month==1)
					{
						MesActualQUE="Janeiro";
					}
					if(System.DateTime.Now.Month==2)
					{
						MesActualQUE="Fevereiro";
					}
					if(System.DateTime.Now.Month==3)
					{
						MesActualQUE="Março";
					}
					if(System.DateTime.Now.Month==4)
					{
						MesActualQUE="Abril";
					}
					if(System.DateTime.Now.Month==5)
					{
						MesActualQUE="Maio";
					}
					if(System.DateTime.Now.Month==6)
					{
						MesActualQUE="Junho";
					}
					if(System.DateTime.Now.Month==7)
					{
						MesActualQUE="Julho";
					}
					if(System.DateTime.Now.Month==8)
					{
						MesActualQUE="Agosto";
					}
					if(System.DateTime.Now.Month==9)
					{
						MesActualQUE="Setembro";
					}
					if(System.DateTime.Now.Month==10)
					{
						MesActualQUE="Outubro";
					}
					if(System.DateTime.Now.Month==11)
					{
						MesActualQUE="Novembro";
					}
					if(System.DateTime.Now.Month==12)
					{
						MesActualQUE="Dezembro";
					}
					
					ZEDResposta="A data de hoje E \n "+System.DateTime.Now.Day+" do mes "+MesActualQUE+" de "+System.DateTime.Now.Year;
					Sei_o_que_E=true;
				}
			}
		}	
		
		// COMO
		if(UtilizadorResposta.Contains("como") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("te chamas"))
			{
				ZEDResposta="O meu nome E "+Nome+"! \n Mas podes mudar o meu nome";
				Sei_o_que_E=true;
			}
		}
		
		
		// QUEM
		if(UtilizadorResposta.Contains("quem") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("es") && !Sei_o_que_E)
			{
				ZEDResposta="Eu sou o Assistente ZED. \n Criado para te ajudar em que necessitares :)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("e") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("vc") || UtilizadorResposta.Contains("voce") && !Sei_o_que_E)
				{
					ZEDResposta="Eu sou o Assistente ZED. \n Criado para te ajudar em que necessitares :)";
					Sei_o_que_E=true;
				}
			}
		}
		
		
		// QUAL
		if(UtilizadorResposta.Contains("qual") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("idade") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("tens") && !Sei_o_que_E)
				{
					var ZEDIdadeQUAL2=System.DateTime.Now.Year-2004;
					ZEDResposta="actualmente tenho "+ZEDIdadeQUAL2+" anos";
					Sei_o_que_E=true;
				}
			}
			if(UtilizadorResposta.Contains("teu") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("nome") && !Sei_o_que_E)
				{
					ZEDResposta="O meu nome E "+Nome+"! \n Mas podes mudar o meu nome";
					Sei_o_que_E=true;	
				}
			}
			if(UtilizadorResposta.Contains("tua") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("idade") && !Sei_o_que_E)
				{
					var ZEDIdadeQUAL=System.DateTime.Now.Year-2004;
					ZEDResposta="actualmente tenho "+ZEDIdadeQUAL+" anos";
					Sei_o_que_E=true;
				}
			}
			if((UtilizadorResposta.Contains("dia") || UtilizadorResposta.Contains("data")) && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("hoje") && !Sei_o_que_E)
				{
					var MesActualQUAL="";
					if(System.DateTime.Now.Month==1)
					{
						MesActualQUAL="Janeiro";
					}
					if(System.DateTime.Now.Month==2)
					{
						MesActualQUAL="Fevereiro";
					}
					if(System.DateTime.Now.Month==3)
					{
						MesActualQUAL="Março";
					}
					if(System.DateTime.Now.Month==4)
					{
						MesActualQUAL="Abril";
					}
					if(System.DateTime.Now.Month==5)
					{
						MesActualQUAL="Maio";
					}
					if(System.DateTime.Now.Month==6)
					{
						MesActualQUAL="Junho";
					}
					if(System.DateTime.Now.Month==7)
					{
						MesActualQUAL="Julho";
					}
					if(System.DateTime.Now.Month==8)
					{
						MesActualQUAL="Agosto";
					}
					if(System.DateTime.Now.Month==9)
					{
						MesActualQUAL="Setembro";
					}
					if(System.DateTime.Now.Month==10)
					{
						MesActualQUAL="Outubro";
					}
					if(System.DateTime.Now.Month==11)
					{
						MesActualQUAL="Novembro";
					}
					if(System.DateTime.Now.Month==12)
					{
						MesActualQUAL="Dezembro";
					}
					
					ZEDResposta="A data de hoje E \n "+System.DateTime.Now.Day+" do mes "+MesActualQUAL+" de "+System.DateTime.Now.Year;
					Sei_o_que_E=true;
				}
			}
		}
		
		// PODE/PODES
		if(UtilizadorResposta.Contains("pode") || UtilizadorResposta.Contains("podes") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("me") && !Sei_o_que_E)
			{
				if(UtilizadorResposta.Contains("ajuda") && !Sei_o_que_E)
				{
					ZEDResposta="Claro que sim \n Basta pedir";
					Sei_o_que_E=true;
				}
			}
		}
		
		/// Respostas Simples
		if((UtilizadorResposta.Contains("pesquisar")) || (UtilizadorResposta.Contains("pesquisa")) && !Sei_o_que_E)
		{
			numeroAleatorio=Random.Range(0,3);
			if(numeroAleatorio==0)
			{
				ZEDResposta="Entao vamos ver no Google";
			}
			if(numeroAleatorio==1)
			{
				ZEDResposta="Vamos pesquisar";
			}
			if(numeroAleatorio==2)
			{
				ZEDResposta="Abre-te Google";
			}
			
			var termopesquisa="";
			
			if(UtilizadorResposta.Contains("pesquisa de"))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisa de","#");
			}
			if(UtilizadorResposta.Contains("pesquisar por "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisar por ","#");
			}
			if(UtilizadorResposta.Contains("pesquisa por "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisa por ","#");
			}
			if(UtilizadorResposta.Contains("pesquisar sobre "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisar sobre ","#");
			}
			if(UtilizadorResposta.Contains("pesquisa sobre "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisa sobre ","#");
			}
			if(UtilizadorResposta.Contains("pesquisar "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisar ","#");
			}	
			if(UtilizadorResposta.Contains("pesquisa "))
			{
				UtilizadorResposta=UtilizadorResposta.Replace("pesquisa ","#");
			}	
			
			var tmp1=UtilizadorResposta.Split("#"[0]);
				
			Application.OpenURL("https://www.google.pt/?gfe_rd=cr&ei=M1zNVJWtDYSs8wfWpoH4Aw&gws_rd=ssl#q="+tmp1[1]);
			Sei_o_que_E=true;
		}
		if((UtilizadorResposta.Contains("ola")) || (UtilizadorResposta.Contains("bom dia")) || (UtilizadorResposta.Contains("boa tarde")) || (UtilizadorResposta.Contains("boa noite")) && !Sei_o_que_E)
		{
			if(!JaComprimentou){
				ZEDResposta="Entao, como vai?";
				Assuto_Actual="como o utilizador se sente";
				Sei_o_que_E=true;
				JaComprimentou=true;
			}else{
				ZEDResposta="ja nos comprimentamos";
				Sei_o_que_E=true;
			}
		}
		if(UtilizadorResposta.Contains("hora") && !Sei_o_que_E)
		{
			ZEDResposta="Agora sao \n "+System.DateTime.Now.Hour+" horas e "+System.DateTime.Now.Minute+" minutos";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("ok") && !Sei_o_que_E)
		{
			numeroAleatorio=Random.Range(0,3);
			if(numeroAleatorio==0)
			{
				ZEDResposta="Otimo.";
				Sei_o_que_E=true;
			}
			if(numeroAleatorio==1)
			{
				ZEDResposta=":)";
				Sei_o_que_E=true;
			}
			if(numeroAleatorio==2)
			{
				ZEDResposta="OK, entao";
				Sei_o_que_E=true;
			}
		}
		if(UtilizadorResposta.Contains("obrigado") && !Sei_o_que_E)
		{
			ZEDResposta="De nada \n Sempre que presizar ja sabe ;)";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("otimo") && !Sei_o_que_E)
		{
			ZEDResposta="Perfeito";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("abre") && !Sei_o_que_E)
		{
			if(UtilizadorResposta.Contains("jogos") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_6");
				ZEDResposta="Diverte-te ;)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("definiçoes") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_1");
				ZEDResposta="Personaliza a vontade :)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("galeria") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_2");
				ZEDResposta="Boa viagem nas tuas memorias ;)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("pessoas") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_3");
				ZEDResposta="Comunicacao faz bem ;)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("loja") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_4");
				ZEDResposta="Mais funcoes para mim :D";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("documentos") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_5");
				ZEDResposta="Bom trabalho ;)";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("aplicacoes") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_7");
				ZEDResposta="Ok... esta aberto";
				Sei_o_que_E=true;
			}
			if(UtilizadorResposta.Contains("music") && !Sei_o_que_E)
			{
				BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
				ZEDResposta="Vamos viagar ao ritmo da musica \nd(-.-)b";
				Sei_o_que_E=true;
			}
		}
			
		/////////////////////////	
		
		
		/// Significados /////////////
		if(UtilizadorResposta.Contains("musica") && !Sei_o_que_E)
		{
			ZEDResposta="Musica meche na nossa mente, tem um poder formidavel :D";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("amor") && !Sei_o_que_E)
		{
			ZEDResposta="Amor, um sentimento muito bom, mas quando E de mais pode fazer mal";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("amizade") && !Sei_o_que_E)
		{
			ZEDResposta="Um tipo de amor quase perfeito ;)";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("reiva") && !Sei_o_que_E)
		{
			ZEDResposta="que horror :(, nao vale a pena ter";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("pessoas") && !Sei_o_que_E)
		{
			ZEDResposta="pessoas.....";
			Sei_o_que_E=true;
		}
		if(UtilizadorResposta.Contains("help") || UtilizadorResposta.Contains("ajuda") && !Sei_o_que_E)
		{
			ZEDResposta="pode pedir";
			Sei_o_que_E=true;
		}
		//////////////////////////////
		
		/// Caso nao saiba responder
		if(!Sei_o_que_E)
		{
			SendAskToServer(UtilizadorResposta);
			numeroAleatorio=Random.Range(0,4);
			if(numeroAleatorio==0)
			{
				ZEDResposta="Desculpa mas nao \n sei do que se trata";	
			}
			if(numeroAleatorio==1)
			{
				ZEDResposta="Nao entendi o que quis dizer!";	
			}
			if(numeroAleatorio==2)
			{
				ZEDResposta="Nao entendi! \n pode me esplicar de outra forma?";	
			}
			if(numeroAleatorio==3)
			{
				ZEDResposta="Nao sei o que se trata \n mas brevemente saberei ;)";	
			}
		}
		/////////////////////////////	
	}
	else
	{
		if(UtilizadorResposta.Contains("nao") || UtilizadorResposta.Contains("sair"))
		{
			ZEDResposta="Ok, vamos parar o jogo";
			JogoAdivinha_ACTIVO=false;
		}
		else
		{
			try
			{
				var num=System.Convert.ToInt32(UtilizadorResposta);
				if(num<JogoAdivinha_Numero)
				{
					ZEDResposta="Maior que isso";
					JogoAdivinha_Tentativas++;
				}
				else
				{
					ZEDResposta="Mais pequeno que isso";
					JogoAdivinha_Tentativas++;
				}
				if(num==JogoAdivinha_Numero)
				{
					numeroAleatorio=Random.Range(0,3);
					if(numeroAleatorio==0)
					{
						ZEDResposta="BRAVO!! \n Ganhou em "+JogoAdivinha_Tentativas+" tentativas";
					}
					if(numeroAleatorio==1)
					{
						ZEDResposta="PERFEITO!! \n Ganhou em "+JogoAdivinha_Tentativas+" tentativas";
					}
					if(numeroAleatorio==2)
					{
						ZEDResposta="OTIMO!!! \n Ganhou em "+JogoAdivinha_Tentativas+" tentativas";
					}
					JogoAdivinha_ACTIVO=false;
				}
			}
			catch(e)
			{
				ZEDResposta="Tem de ser numero";
			}
		}
	}
	UtilizadorResposta="";
}

function SendAskToServer(ask:String)
{
	var AskPHP = new WWWForm();
	AskPHP.AddField("ask",ask);
	var wwwAsk=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/ask.php",AskPHP);
	
	yield wwwAsk;
}
