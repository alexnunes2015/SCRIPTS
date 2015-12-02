#pragma strict
// Este Script apenas se Aplica a Interface 2D

var UPBar:GameObject;
var DOWNBar:GameObject;


// Papeis de parede Offline
var TMPWall:Texture2D;
var TempoMudarWallpaper=0;
var WPUltimo=0;
var wp0:Texture;
var wp1:Texture;
var wp2:Texture;
var wp3:Texture;
var wp4:Texture;
var wp5:Texture;
var wp6:Texture;
var wp7:Texture;
var wp8:Texture;
var wp9:Texture;
var wp10:Texture;
/////////////////////////////

var NewYear:GameObject;
var NewYearText:GameObject;
var NewYearFogoArtificio:GameObject;
var PassarAno=false;

var wallpaper:GameObject;
var WPPAN:GameObject;
var wall_path:String;
static var Mundar_wall:boolean=false;
var img:WWW;
var aimg:WWW;

var OnlineWallpaperRefreshNumber=0;

var WallpaperWebCAMTimer=900;

var DownloadReady=true;
var PapelRandom=0;

function Start(){
	PapelRandom=Random.Range(5,10);
	WPUltimo=Random.Range(0,5);
}

function Update () 
{	
	// Festejo Ano Novo
	if(System.DateTime.Now.Month==12 && System.DateTime.Now.Day==31 && System.DateTime.Now.Hour==23 && System.DateTime.Now.Minute==59 && System.DateTime.Now.Second==50)
	{
		PassarAno=true;
	}
	
	if(PassarAno)
	{
		if(System.DateTime.Now.Second<=58 && NewYearFogoArtificio.active==false)
		{
			NewYearText.GetComponent(TextMesh).text = (58-System.DateTime.Now.Second).ToString();
			NewYear.active=true;
			BASE.ShowUI=false;
		}else{
			NewYearText.GetComponent(TextMesh).text = PlayerPrefs.GetString("SYS_STRING_19")+" "+System.DateTime.Now.Year.ToString();
			NewYearFogoArtificio.active=true;
			if(Input.anyKeyDown)
			{
				PassarAno=false;
				BASE.ShowUI=true;
			}
		}
	}else{
		NewYear.active=false;
		NewYearFogoArtificio.active=false;
	}
	
	///////////////////
		
	UPBar.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	UPBar.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	UPBar.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	UPBar.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
	DOWNBar.GetComponent.<GUITexture>().color.r=PlayerPrefs.GetFloat("SYSTEM_COLOR_R");
	DOWNBar.GetComponent.<GUITexture>().color.g=PlayerPrefs.GetFloat("SYSTEM_COLOR_G");
	DOWNBar.GetComponent.<GUITexture>().color.b=PlayerPrefs.GetFloat("SYSTEM_COLOR_B");
	DOWNBar.GetComponent.<GUITexture>().color.a=PlayerPrefs.GetFloat("SYSTEM_COLOR_A");
	
	
	if(PlayerPrefs.GetInt("WallpaperType")==2)
	{
		WPPAN.active=false;
		wallpaper.active=true;
		// Transiçao de papel de parede
		if(TempoMudarWallpaper==0)
		{
			wallpaper.GetComponent.<Renderer>().material.color.r=0;
			wallpaper.GetComponent.<Renderer>().material.color.g=0;
			wallpaper.GetComponent.<Renderer>().material.color.b=0;
			if(PlayerPrefs.GetInt("AutoColor")==1)
			{
				PlayerPrefs.SetFloat("SYSTEM_COLOR_A",0.002);		
			}
		}
		if(TempoMudarWallpaper>=1 && TempoMudarWallpaper<=40)
		{
			wallpaper.GetComponent.<Renderer>().material.color.r=wallpaper.GetComponent.<Renderer>().material.color.r+0.020;
			wallpaper.GetComponent.<Renderer>().material.color.g=wallpaper.GetComponent.<Renderer>().material.color.g+0.020;
			wallpaper.GetComponent.<Renderer>().material.color.b=wallpaper.GetComponent.<Renderer>().material.color.b+0.020;
			if(PlayerPrefs.GetInt("AutoColor")==1)
			{
				PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("SYSTEM_COLOR_A")+0.010);		
			}
		}
		if(TempoMudarWallpaper>=1000-40 && TempoMudarWallpaper<=1000)
		{
			wallpaper.GetComponent.<Renderer>().material.color.r=wallpaper.GetComponent.<Renderer>().material.color.r-0.020;
			wallpaper.GetComponent.<Renderer>().material.color.g=wallpaper.GetComponent.<Renderer>().material.color.g-0.020;
			wallpaper.GetComponent.<Renderer>().material.color.b=wallpaper.GetComponent.<Renderer>().material.color.b-0.020;
			if(PlayerPrefs.GetInt("AutoColor")==1)
			{
				PlayerPrefs.SetFloat("SYSTEM_COLOR_A",PlayerPrefs.GetFloat("SYSTEM_COLOR_A")-0.010);		
			}
		}
		/////////////////////////////////
		
		TempoMudarWallpaper=TempoMudarWallpaper+1;
		
		if(TempoMudarWallpaper==1001)
		{
			if(PlayerPrefs.GetInt("WallpaperType")==2)
			{
				PapelRandom=Random.Range(0,10);
				while(WPUltimo==PapelRandom){
					PapelRandom=Random.Range(0,10);
				}
				WPUltimo=PapelRandom;
				SortearWall();
				if(PlayerPrefs.GetInt("AutoColor")==1)
				{
					try
					{
						PlayerPrefs.SetFloat("SYSTEM_COLOR_R",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).r);
						PlayerPrefs.SetFloat("SYSTEM_COLOR_G",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).g);
						PlayerPrefs.SetFloat("SYSTEM_COLOR_B",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).b);
					}
					catch(e)
					{
						print(e);
					}
				}
			}
			TempoMudarWallpaper=0;
		}
	}
	if(PlayerPrefs.GetInt("WallpaperType")==3)
	{
		WPPAN.active=false;
		wallpaper.active=true;
		if(WallpaperWebCAMTimer==0)
		{
			DownloadImageWebCam();
		}
		WallpaperWebCAMTimer=WallpaperWebCAMTimer-1;
	}
	
	/// Caso haja mudanca de definicoes do papel de parede nas definicoes ou acabado o arranque do sistema
	if(Mundar_wall||PlayerPrefs.GetInt("END_BOOT")==1)
	{
		// Papeis de parede escolhidos pelo utilizador
		if(PlayerPrefs.GetInt("WallpaperType")==0)
		{
			if(PlayerPrefs.HasKey("SYS_WALLPAPER"))
			{
				if(Application.platform!=RuntimePlatform.LinuxPlayer){
					wall_path="file://"+PlayerPrefs.GetString("MyPictures")+"\\"+PlayerPrefs.GetString("SYS_WALLPAPER");
				}else{
					wall_path="file://"+PlayerPrefs.GetString("MyPictures")+"/"+PlayerPrefs.GetString("SYS_WALLPAPER");
				}
				img=new WWW(wall_path);
				if(img.texture.width/2>img.texture.height){
					WPPAN.active=true;
					wallpaper.active=false;
					WPPAN.GetComponent.<Renderer>().material.mainTexture=img.texture;
				}else{
					WPPAN.active=false;
					wallpaper.active=true;
					wallpaper.GetComponent.<Renderer>().material.mainTexture=img.texture;
				}
				TMPWall=img.texture;
				Mundar_wall=false;	
			}
			else
			{
				if(PlayerPrefs.GetString("DEVICE")=="PC")
				{
					var Path02="file://";
					var Path12=System.IO.Directory.GetParent(Application.dataPath);
					var Path22="/BlueAqua.png";
					wall_path=Path02+Path12+Path22;
				}
				else
				{
					var _Path02="file://";
					var _Path12="/sdcard/ZED";
					var _Path22="/BlueAqua.png";
					wall_path=_Path02+_Path12+_Path22;
				}
				img=new WWW(wall_path);
				if(img.texture.width/2>img.texture.height){
					WPPAN.active=true;
					wallpaper.active=false;
					WPPAN.GetComponent.<Renderer>().material.mainTexture=img.texture;
				}else{
					WPPAN.active=false;
					wallpaper.active=true;
					wallpaper.GetComponent.<Renderer>().material.mainTexture=img.texture;
				}
				TMPWall=img.texture;
				PlayerPrefs.SetString("SYS_WALLPAPER","BlueAqua.png");
				if(PlayerPrefs.GetInt("AutoColor")==1)
				{
					PlayerPrefs.SetFloat("SYSTEM_COLOR_R",img.texture.GetPixel(Random.Range(0,img.texture.width),Random.Range(0,img.texture.height)).r);
					PlayerPrefs.SetFloat("SYSTEM_COLOR_G",img.texture.GetPixel(Random.Range(0,img.texture.width),Random.Range(0,img.texture.height)).g);
					PlayerPrefs.SetFloat("SYSTEM_COLOR_B",img.texture.GetPixel(Random.Range(0,img.texture.width),Random.Range(0,img.texture.height)).b);		
				}
			}
		}
		if(PlayerPrefs.GetInt("WallpaperType")==2)
		{
			PapelRandom=Random.Range(0,10);
			SortearWall();
			if(PlayerPrefs.GetInt("OnlineWallpaperRandom")==1){	
				DownloadWallpaper();
			}
			else
			{
				DownloadImageOffline();
			}
		}
		if(PlayerPrefs.GetInt("WallpaperType")==3)
		{
			DownloadImageWebCam();
		}
		if(PlayerPrefs.GetInt("AutoColor")==1)
		{
			try
			{
				PlayerPrefs.SetFloat("SYSTEM_COLOR_R",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).r);
				PlayerPrefs.SetFloat("SYSTEM_COLOR_G",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).g);
				PlayerPrefs.SetFloat("SYSTEM_COLOR_B",TMPWall.GetPixel(Random.Range(0,TMPWall.width),Random.Range(0,TMPWall.height)).b);
			}
			catch(e)
			{
				print(e);
			}
		}
	}
	Mundar_wall=false;
	PlayerPrefs.SetInt("END_BOOT",0);
	
	
	////////////////////////////////////////////////////
}

// Descarregar Wallpapers
function DownloadWallpaper(){
	DownloadReady=false;
	for(var iw=0;iw<=10;iw++){
		var wwwNAME=new WWW(PlayerPrefs.GetString("SYSTEM_IP")+"/GetRandomWall.php");
		yield wwwNAME;	
		var wwwWallpaper=new WWW("http://"+PlayerPrefs.GetString("SYSTEM_IP")+"/wallserver/"+wwwNAME.text);	
		yield wwwWallpaper;		
		if(wwwWallpaper.isDone){
			switch(iw)
			{
				case 0:
					wp0=wwwWallpaper.texture;
					break;
				case 1:
					wp1=wwwWallpaper.texture;
					break;
				case 2:
					wp2=wwwWallpaper.texture;
					break;
				case 3:
					wp3=wwwWallpaper.texture;
					break;
				case 4:
					wp4=wwwWallpaper.texture;
					break;
				case 5:
					wp5=wwwWallpaper.texture;
					break;
				case 6:
					wp6=wwwWallpaper.texture;
					break;
				case 7:
					wp7=wwwWallpaper.texture;
					break;
				case 8:
					wp8=wwwWallpaper.texture;
					break;
				case 9:
					wp9=wwwWallpaper.texture;
					break;
				case 10:
					wp10=wwwWallpaper.texture;
					break;
				default:
					wp0=wwwWallpaper.texture;
					break;
			}
		}
	}
	DownloadReady=true;
}


// Regenerar imagens Offline
var _0:Texture;
var _1:Texture;
var _2:Texture;
var _3:Texture;
var _4:Texture;
var _5:Texture;
var _6:Texture;
var _7:Texture;
var _8:Texture;
var _9:Texture;
var _10:Texture;
function DownloadImageOffline(){
	wp0=_0;
	wp1=_1;
	wp2=_2;
	wp3=_3;
	wp4=_4;
	wp5=_5;
	wp6=_6;
	wp7=_7;
	wp8=_8;
	wp9=_9;
	wp10=_10;
}

// Descarregar Imagens da WebCanm
function DownloadImageWebCam()
{
	WallpaperWebCAMTimer=900;
	aimg=new WWW(PlayerPrefs.GetString("WallpaperOnlineAdress"));
	
	
	while(PlayerPrefs.GetInt("WWW_BUSY")==1){
		yield;
	}
	PlayerPrefs.SetInt("WWW_BUSY",1);
	yield aimg;
	PlayerPrefs.SetInt("WWW_BUSY",0);

	wallpaper.GetComponent.<Renderer>().material.mainTexture=aimg.texture;
	if(PlayerPrefs.GetInt("AutoColor")==1)
	{
		PlayerPrefs.SetFloat("SYSTEM_COLOR_R",aimg.texture.GetPixel(Screen.width/2,Screen.height/2).r);
		PlayerPrefs.SetFloat("SYSTEM_COLOR_G",aimg.texture.GetPixel(Screen.width/2,Screen.height/2).g);
		PlayerPrefs.SetFloat("SYSTEM_COLOR_B",aimg.texture.GetPixel(Screen.width/2,Screen.height/2).b);		
	}
}

// Papeis de parede Aleatorio
function SortearWall()
{
	if(DownloadReady){
		switch(PapelRandom)
		{
			case 0:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp0;
				TMPWall=wp0;
				break;
			case 1:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp1;
				TMPWall=wp1;
				break;
			case 2:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp2;
				TMPWall=wp2;
				break;
			case 3:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp3;
				TMPWall=wp3;
				break;
			case 4:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp4;
				TMPWall=wp4;
				break;
			case 5:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp5;
				TMPWall=wp5;
				break;
			case 6:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp6;
				TMPWall=wp6;
				break;
			case 7:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp7;
				TMPWall=wp7;
				break;
			case 8:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp8;
				TMPWall=wp8;
				break;
			case 9:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp9;
				TMPWall=wp9;
				break;
			case 10:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp10;
				TMPWall=wp10;
				break;
																											
			default:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp0;
				TMPWall=wp0;
				break;
		}
	}else{
		switch(Random.Range(0,10))
		{
			case 0:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_0;
				TMPWall=_0;
				break;
			case 1:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_1;
				TMPWall=_1;
				break;
			case 2:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_2;
				TMPWall=_2;
				break;
			case 3:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_3;
				TMPWall=_3;
				break;
			case 4:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_4;
				TMPWall=_4;
				break;
			case 5:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_5;
				TMPWall=_5;
				break;
			case 6:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_6;
				TMPWall=_6;
				break;
			case 7:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_7;
				TMPWall=_7;
				break;
			case 8:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_8;
				TMPWall=_8;
				break;
			case 9:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_9;
				TMPWall=_9;
				break;
			case 10:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=_10;
				TMPWall=_10;
				break;
																											
			default:
				wallpaper.GetComponent.<Renderer>().material.mainTexture=wp0;
				TMPWall=wp0;
				break;
		}
	}
	if(PlayerPrefs.GetInt("OnlineWallpaperRandom")==1){	
		OnlineWallpaperRefreshNumber++;
		if(OnlineWallpaperRefreshNumber>=15){
			DownloadWallpaper();
			OnlineWallpaperRefreshNumber=0;
		}
	}
}
