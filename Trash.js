#pragma strict

import System;

var TrashFull:GameObject;
var TrashEmpty:GameObject;
var Flyes:GameObject;

var TrashPath="";

var Timer=0;

function Start () {
	TrashPath="~/.local/share/Trash";
	Debug.Log(TrashPath);
	if(System.IO.Directory.Exists(TrashPath)){
		if(System.IO.Directory.GetFiles(TrashPath+"/files/").Length>=1){
			if(!PlayerPrefs.HasKey("TrashTimes")){
				PlayerPrefs.SetInt("TrashTimes",600);
			}else{
				if(PlayerPrefs.GetInt("TrashTimes")<=0){
					Flyes.active=true;
				}
			}
		}
		
	}
}

function Update () {
	Timer++;
	if(Timer>=15){
		Timer=0;
		if(System.IO.Directory.Exists(TrashPath)){
			if(System.IO.Directory.GetFiles(TrashPath+"/files/").Length>=1){
				TrashFull.active=true;
				TrashEmpty.active=false;
				PlayerPrefs.SetInt("TrashTimes",PlayerPrefs.GetInt("TrashTimes")-1);				
			}else{
				TrashFull.active=false;
				TrashEmpty.active=true;
				PlayerPrefs.SetInt("TrashTimes",0);
			}
		}else{
			TrashFull.active=false;
			TrashEmpty.active=true;
			PlayerPrefs.SetInt("TrashTimes",0);
		}
	}
}