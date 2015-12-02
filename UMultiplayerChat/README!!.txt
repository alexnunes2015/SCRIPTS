Thank buying UMC (Multiplayer Chat). 
All content on Assent is created by Briner Lovo Games and is free for marketing, for whom legally purchase the package. 

Starting with UMC. 
To add "UMC" your multiplayer Project requirements: 
- A MasterServer 


if you have not configured your own Connection to a master server, UMC assent includes an example of how to initialize, see: bl_Start_Server.cs 

If you have all your process server initialization completes, you just have to place the script: "bl_MultiplayerChat.cs" a GameObject, automatically be added An NetworkView in GO. 

once in the room (Play mode) just press the "Enter" key to open, send and close the chat. 

FREQUENT QUESTIONS: 

Q. how to change the user name: 
A. in your scena "menu" or "Lobby" (if you have one) should put a text field to place a string and then send a "PlayerPrefs" with KeyValue "UserName" eg 
    <PlayerPrefs.SetString ("UserName" my_custom_name)> 
to enter scena wing containing UMC, automatically (Start ()) take the name of this.

Q. as adding "UMC" to photon Cloud 
A. to add the chat to Photon Cloud, you must first have the API, Photon Cloud PUN, without you even, you can download the "AssentStore" Free. 
-then, unzip the .UnityPackage in the folder Examples of UMC, called "UMC_Photon". and do the same process as that of UnityNetworking.