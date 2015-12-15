#pragma strict

var Back_BTN_Inactive:GUISkin;
var Back_BTN_Active:GUISkin;
var Next_BTN_Inactive:GUISkin;
var Next_BTN_Active:GUISkin;

var Wall:Texture;
var BarTexture:Texture;
var BTN_Type:GUISkin;
var iBTN_Type:GUISkin;
var DEF_SKN:GUISkin;
var BTN_Search:GUISkin;
var Separator:Texture;
var File:Texture;
var Web:Texture;
var Multimedia:Texture;
var Music:Texture;
var People:Texture;
var Search:Texture;

var TMPSearch="";
var KeyPress=false;

var ResultByDisplay=0;

var NoFound:Texture;
var Search0:Texture;
var Search1:Texture;
var Search2:Texture;
var Search3:Texture;
var FRAME_SEARCH=0;
var SearchStat="";

var List_Search_page=new Array ();
var filesList = new Array();
var List_Search_Title:GUISkin;
var ListIndex=0;
var filePaths = new Array();

var KeyMAP="0123456789QWERTYUIOPASDFGHJKLZXCVBNM";

/////////////////////////////
static var POSITION=0;
//0-Files
//1-Web
//2-Multimedia
//3-Music
//4-People
////////////////////////////////

var Search_TXT="";

function Start () {

}

function Update () {
	FRAME_SEARCH++;
	if(FRAME_SEARCH==39){
		FRAME_SEARCH=0;
	}
}

function OnGUI(){
	if(BASE.ShowDisplaySearch){		
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),Screen.width,PlayerPrefs.GetInt("MaxY")),Wall);
		GUI.DrawTexture(Rect(0,PlayerPrefs.GetInt("MinY"),530,45),BarTexture);
		GUI.DrawTexture(Rect(355,PlayerPrefs.GetInt("MinY"),10,45),Separator);
		GUI.DrawTexture(Rect(525,PlayerPrefs.GetInt("MinY"),10,45),Separator);
				
		
		GUI.skin=DEF_SKN;
		GUI.SetNextControlName("SearchBox");
		Search_TXT=GUI.TextField(Rect(10,PlayerPrefs.GetInt("MinY")+10,300,25),Search_TXT);	
		GUI.FocusControl("SearchBox");
		GUI.skin=BTN_Search;
		if(GUI.Button(Rect(320,PlayerPrefs.GetInt("MinY")+10,25,25),Search)){
			CalcMaxSearchByDisplay();
			if(Search_TXT==""){
				BASE.MsgShow(1,PlayerPrefs.GetString("SYS_STRING_20"),PlayerPrefs.GetString("SYS_STRING_21")+"\n"+PlayerPrefs.GetString("SYS_STRING_22")+"\n"+PlayerPrefs.GetString("SYS_STRING_23"));
			}
			else
			{	
				if(Search_TXT.Length>=3){
					if(POSITION==1 ||	POSITION==2){
						if(POSITION==1)
							Application.OpenURL("https://www.google.com/?gws_rd=ssl#q="+Search_TXT);
						else
							Application.OpenURL("https://www.youtube.com/results?search_query="+Search_TXT);
					}else{
						SearchStat="Searching";
						if(POSITION==3){
							SearchMusic();
						}
						if(POSITION==4){
							SearchPerson();
						}
						if(POSITION==0){
							SearchDocument();
						}
					}
				}
				else{
					SearchStat="notfound";
				}
			}
		}
		//////////// TYPES ////////////////////
		GUI.skin=BTN_Type;
		if(POSITION==0){
			GUI.skin=iBTN_Type;
			if(GUI.Button(Rect(370,PlayerPrefs.GetInt("MinY")+10,25,25),File)){
				
			}
		}
		else
		if(GUI.Button(Rect(370,PlayerPrefs.GetInt("MinY")+10,25,25),File)){
			POSITION=0;
			SearchStat="";
		}
		
		GUI.skin=BTN_Type;
		if(POSITION==1){
			GUI.skin=iBTN_Type;
			if(GUI.Button(Rect(400,PlayerPrefs.GetInt("MinY")+10,25,25),Web)){
				
			}
		}
		else
		if(GUI.Button(Rect(400,PlayerPrefs.GetInt("MinY")+10,25,25),Web)){
			POSITION=1;
			SearchStat="";
		}
		
		GUI.skin=BTN_Type;
		if(POSITION==2){
			GUI.skin=iBTN_Type;
			if(GUI.Button(Rect(430,PlayerPrefs.GetInt("MinY")+10,25,25),Multimedia)){
				
			}
		}
		else
		if(GUI.Button(Rect(430,PlayerPrefs.GetInt("MinY")+10,25,25),Multimedia)){
			POSITION=2;
			SearchStat="";
		}
		
		GUI.skin=BTN_Type;
		if(POSITION==3){
			GUI.skin=iBTN_Type;
			if(GUI.Button(Rect(460,PlayerPrefs.GetInt("MinY")+10,25,25),Music)){
				
			}
		}
		else
		if(GUI.Button(Rect(460,PlayerPrefs.GetInt("MinY")+10,25,25),Music)){
			POSITION=3;
			SearchStat="";
		}
		
		GUI.skin=BTN_Type;
		if(POSITION==4){
			GUI.skin=iBTN_Type;
			if(GUI.Button(Rect(490,PlayerPrefs.GetInt("MinY")+10,25,25),People)){
				
			}
		}
		else
		if(GUI.Button(Rect(490,PlayerPrefs.GetInt("MinY")+10,25,25),People)){
			POSITION=4;
			SearchStat="";
		}
		/////////////////////////////////////////
		
		
		if(SearchStat=="Searching"){
			if(FRAME_SEARCH<=10){
				GUI.DrawTexture(Rect(Screen.width/2-100,Screen.height/2-100,200,200),Search0);
			}
			if(FRAME_SEARCH>=11 && FRAME_SEARCH<20){
				GUI.DrawTexture(Rect(Screen.width/2-100,Screen.height/2-100,200,200),Search1);
			}
			if(FRAME_SEARCH>=22 && FRAME_SEARCH<30){
				GUI.DrawTexture(Rect(Screen.width/2-100,Screen.height/2-100,200,200),Search2);
			}
			if(FRAME_SEARCH>=31 && FRAME_SEARCH<40){
				GUI.DrawTexture(Rect(Screen.width/2-100,Screen.height/2-100,200,200),Search3);
			}
		}
		if(SearchStat=="notfound"){
			GUI.DrawTexture(Rect(Screen.width/2-100,Screen.height/2-100,200,200),NoFound);
		}
		if(SearchStat=="Found"){
			
			var YLista=120;
			var ListaVazia=true;
			
			var ItemCount=0; 
			for(var valor:String in filePaths){
				var ActualSearchObject=valor.Split("%"[0]);
				GUI.skin=List_Search_Title;		
				if(POSITION==0){
					if(GUI.Button(Rect(80,YLista,Screen.width-160,30),ActualSearchObject[1]))
					{
						Documents.External_file=ActualSearchObject[1]+"|"+System.IO.Path.GetExtension(ActualSearchObject[0])+"|"+ActualSearchObject[0];
						BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_5");
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";
					}
					if(GUI.Button(Rect(40,YLista,30,30),File))
					{
						Documents.External_file=ActualSearchObject[1]+"|"+System.IO.Path.GetExtension(ActualSearchObject[0])+"|"+ActualSearchObject[0];
						BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_5");
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";						
					}
					ItemCount++;
					if(ItemCount>=ResultByDisplay){
						break;
					}
				}		
				if(POSITION==3){
					if(GUI.Button(Rect(80,YLista,Screen.width-160,30),ActualSearchObject[1]))
					{
						MusicPlayer.OpenMusic(ActualSearchObject[0]);
						BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";
					}
					if(GUI.Button(Rect(40,YLista,30,30),Music))
					{
						MusicPlayer.OpenMusic(ActualSearchObject[0]);
						BASE.APP_DISPLAY=PlayerPrefs.GetString("SYS_STRING_10");
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";						
					}
					ItemCount++;
					if(ItemCount>=ResultByDisplay){
						break;
					}
				}
				if(POSITION==4){
					if(GUI.Button(Rect(80,YLista,Screen.width-160,30),ActualSearchObject[1]))
					{
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";
						BASE.ViewUserProfile(ActualSearchObject[0]);
					}
					if(GUI.Button(Rect(40,YLista,30,30),People))
					{
						BASE.ViewUserProfile(ActualSearchObject[0]);
						BASE.ShowDisplaySearch=false;
						filePaths.clear();
						Search_TXT="";
					}
				}
				YLista=YLista+40;
			}
			YLista=120;	
		}
	}
	else
	{
		if(Search_TXT!=""){
			filePaths.clear();
			Search_TXT="";
			TMPSearch="";
		}
		SearchStat="";
		
		if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0") && Application.loadedLevelName=="DESK2D_TABLET")
		{			
			if(!KeyPress){
				if(Input.anyKeyDown){
					if(!KeyMAP.Contains(Input.inputString)){
						KeyPress=true;
						TMPSearch+Input.inputString;
						BASE.ShowDisplaySearch=true;
						Search_TXT=TMPSearch;
					}
				}
				else
				{
					KeyPress=false;
				}
			}else{
				KeyPress=false;
			}		
		}		
	}
}

function CalcMaxSearchByDisplay(){
	ResultByDisplay=0;
	var Y_CalcMSBD=120;
	while(Y_CalcMSBD<=Screen.height-100){
		ResultByDisplay++;
		Y_CalcMSBD=Y_CalcMSBD+40;
	}
}

function SearchPerson(){
	var wwwGETpa = new WWWForm();
	wwwGETpa.AddField("Query_ID",Search_TXT);
	var wwwGETppaa=new WWW (PlayerPrefs.GetString("SYSTEM_IP")+"/search_contact.php",wwwGETpa);
	
	yield wwwGETppaa;
		
	if(wwwGETppaa.error==null){
		if(wwwGETppaa.isDone){
			if(wwwGETppaa.text!=""){
				filePaths.clear();
				var CONTACTOSTMP=wwwGETppaa.text.Split("#"[0]);
				for(contacto in CONTACTOSTMP){
					if(contacto!=""){
						filePaths.Add(contacto);
					}
				}
				SearchStat="Found";
			}else{
				SearchStat="notfound";
			}
		}else{
			SearchStat="notfound";
		}
	}else{
		SearchStat="notfound";
	}
}

function SearchDocument(){
	var AEncontrou=0;
	var filePathsB : String[];
	filePaths.Clear();
	
	filePathsB = Directory.GetFiles(PlayerPrefs.GetString("MyDocuments"),"*.*");		
	
	for(File in filePathsB)
	{
		var bFileDir:String=File;
		var bFileNameWithExtension:String=Path.GetFileName(bFileDir);
		var bFileNameWithoutExtension:String=Path.GetFileNameWithoutExtension(bFileNameWithExtension).ToLower();
		var bFileExtension:String=Path.GetExtension(bFileNameWithExtension);
		if(bFileExtension==".txt")
		{
			var ToSeacrh_Document=Search_TXT.ToLower().Split(" "[0]);
			var Document_Existe=false;
			for(TermoDocument in ToSeacrh_Document){
				if(TermoDocument!=""){
					if(bFileNameWithoutExtension.ToLower().Contains(TermoDocument.ToLower())){
						Document_Existe=true;
					}
				}
			}
			if(Document_Existe){
				filePaths.Add(bFileDir+"%"+bFileNameWithoutExtension);
				AEncontrou++;
			}
		}		
	}
	
	if(AEncontrou>=1){
		SearchStat="Found";
	}else{
		SearchStat="notfound";
	}
}

function SearchMusic(){
	var Encontrou=0;
	var filePathsA : String[];
	filePaths.Clear();
	
	filePathsA = Directory.GetFiles(PlayerPrefs.GetString("MyMusic"),"*.*");	
	
	
	for(File in filePathsA)
	{
		var aFileDir:String=File;
		var aFileNameWithExtension:String=Path.GetFileName(aFileDir);
		var aFileNameWithoutExtension:String=Path.GetFileNameWithoutExtension(aFileNameWithExtension);
		var aFileExtension:String=Path.GetExtension(aFileNameWithExtension);
		if(aFileExtension==".wav" || aFileExtension==".ogg")
		{
			var ToSeacrh_Music=Search_TXT.ToLower().Split(" "[0]);
			var Musica_Existe=false;
			for(TermoMusica in ToSeacrh_Music){
				if(TermoMusica!=""){
					if(aFileNameWithoutExtension.ToLower().Contains(TermoMusica.ToLower())){
						Musica_Existe=true;
					}
				}
			}
			if(Musica_Existe){
				filePaths.Add(aFileDir+"%"+aFileNameWithoutExtension);
				Encontrou++;
			}			
		}		
	}
	
	if(Encontrou>=1){
		SearchStat="Found";
	}else{
		SearchStat="notfound";
	}
}
