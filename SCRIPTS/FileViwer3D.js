#pragma strict

import System.IO;

var PastaDeSistema:String;

var _AVI:GameObject;
var _WMV:GameObject;
var _WMA:GameObject;
var _MP3:GameObject;
var _MP4:GameObject;
var _OGG:GameObject;
var _PNG:GameObject;
var _TXT:GameObject;
var _JPG:GameObject;
var _ZIP:GameObject;
var _TAR:GameObject;
var _WAV:GameObject;
var label:TextMesh;
var SpawnIcon:Transform;

var ObjectoActual:GameObject;

var timer:int=20;

var tmp:int;

var f_info:System.IO.DirectoryInfo[];
var fi_info:System.IO.FileInfo[];

function ReadIcons()
{
	var info2=new System.IO.DirectoryInfo(PlayerPrefs.GetString("USERDATAPATH"));
	fi_info = info2.GetFiles();
	for (file in fi_info)
	{
		yield WaitForSeconds(0.5);
			if(file.Extension.ToLower()==".mp3")
			{
				ObjectoActual=Instantiate(_MP3,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".wav")
			{
				ObjectoActual=Instantiate(_WAV,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".wma")
			{
				ObjectoActual=Instantiate(_WMA,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".wmv")
			{
				ObjectoActual=Instantiate(_WMV,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".ogg")
			{
				ObjectoActual=Instantiate(_OGG,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".mp4")
			{
				ObjectoActual=Instantiate(_MP4,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".txt")
			{
				ObjectoActual=Instantiate(_TXT,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".zip")
			{
				ObjectoActual=Instantiate(_ZIP,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".tar")
			{
				ObjectoActual=Instantiate(_TAR,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".jpg")
			{
				ObjectoActual=Instantiate(_JPG,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".png")
			{
				ObjectoActual=Instantiate(_PNG,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			if(file.Extension.ToLower()==".avi")
			{
				ObjectoActual=Instantiate(_AVI,SpawnIcon.transform.position,SpawnIcon.transform.rotation);
				ObjectoActual.name=file.Name;
				label = ObjectoActual.GetComponentInChildren(TextMesh);;
				label.text=file.Name[0:8];
			}
			transform.position.x=transform.position.x+3;
			if(transform.position.x>6)
			{
				transform.position.x=tmp;
			}
		}
	}


function SaveIcons()
{
//	if(File.Exists(PastaDeSistema+"/USER/ACTUAL/deskicons.ines"))
//	{
//		System.IO.File.Delete(PastaDeSistema+"/USER/ACTUAL/deskicons.ines");
//	}
	
	var sr = File.CreateText(PastaDeSistema+"/deskicons.system");
		
	var icones;
	icones=GameObject.FindGameObjectsWithTag ("Ficheiro3D");
	for (var icone:GameObject in icones)
	{
		var StrAGravar:String;
		StrAGravar=icone.name+"/"+icone.transform.position.x+"/"+icone.transform.position.y+"/"+icone.transform.position.z;
		sr.WriteLine(StrAGravar);
	}
	sr.Close();	
	
}


function LoadFromFile()
{
	var sr : StreamReader = new System.IO.StreamReader(PastaDeSistema+"/deskicons.system");
    var line : String;
    var arrey = new Array ();
 
    while (!sr.EndOfStream) {
       line = sr.ReadLine();
       arrey = line.Split("/"[0]);
       var icone : GameObject;
       icone = GameObject.Find(arrey[0]);
       if(icone!=null)
       {
       		icone.transform.position.x=float.Parse(arrey[1]);
       		icone.transform.position.y=float.Parse(arrey[2]);
       		icone.transform.position.z=float.Parse(arrey[3]);
       }
    }
}

function Start () {
	PastaDeSistema=PlayerPrefs.GetString("SYSTEM_PATH");
	tmp=SpawnIcon.transform.position.x;
	ReadIcons();
	if(File.Exists(PastaDeSistema+"/deskicons.system"))
	{
		LoadFromFile();
	}
}

function Update () {
	timer=timer-1;
	if(timer==0)
	{
//		var tmp2 = GameObject.FindGameObjectsWithTag("Ficheiro3D"); 
//		for (var tmp3 : GameObject in tmp2)  { 
//			GameObject.Destroy(tmp3);
//		}
		timer=20;
		SaveIcons();
//		ReadIcons();
//		LoadFromFile();
	}
}