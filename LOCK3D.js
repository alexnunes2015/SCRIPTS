#pragma strict

function Update () {
	if(BASE.APP_DISPLAY==PlayerPrefs.GetString("SYS_STRING_0")){
		if(Input.GetKeyDown(KeyCode.LeftControl))
		{
			if(PlayerPrefs.GetInt("LOCK3D")==0)
			{
				PlayerPrefs.SetInt("LOCK3D",1);
				Cursor.visible=true;
			}
			else
			{
				PlayerPrefs.SetInt("LOCK3D",0);
				Cursor.visible=false;
			}
		}
	}
}