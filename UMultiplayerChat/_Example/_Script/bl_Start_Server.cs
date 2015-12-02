////////////////////////////////CODE WRITTE BY BRINER LOVO GAMES 2014/////////////////////
//////////THIS SCRIPT IN A EXAMPLE FOR INITIALIZATE A SERVER AND CONECT CHAT SYSTEM///////
///////////ITS A HAVE A SCRIPT IN YOUR PROJECT FOR CONECCT, NOT NEED THIS/////////////////
/////////////////////////////////////////////////////////////////////////////////////////

using UnityEngine;
using System.Collections;

public class bl_Start_Server : MonoBehaviour
{
    public GUISkin m_Skin;
    /// <summary>
    /// List of Host in master server avaible
    /// </summary>
     HostData[] datas;
    /// <summary>
    /// Scroll for list of Host
    /// </summary>
    public Vector2 scroll;
    /// <summary>
    /// Server Name
    /// </summary>
    private string gameName = "ServerName";
    /// <summary>
    /// Game to register in master server
    /// </summary>
    public string uniqueGameName = "ChatGameName";
    /// <summary>
    /// After which time will the server list be refreshed ?
    /// </summary>
    public float refreshTime = 10;

   void Start()
    {
        InvokeRepeating("GetHostList", 0, refreshTime);
        Network.isMessageQueueRunning = true;
    }
    /// <summary>
    /// Get Host List avaible in master server
    /// </summary>
    void GetHostList()
    {
        MasterServer.RequestHostList(uniqueGameName);
    }


    void OnGUI()
    {
        GUI.skin = m_Skin;
         GUI.color = Color.black;
        GUI.Label(new Rect(Screen.width / 2 - 174, Screen.height / 2 - 199, 250, 30), "UMultiplayer Chat", LabelBig);
        GUI.color = Color.white;
        GUI.Label(new Rect(Screen.width / 2 - 175, Screen.height / 2 - 200, 250, 30), "UMultiplayer Chat", LabelBig);
        datas = MasterServer.PollHostList();
        if (!Network.isServer && !Network.isClient)
        {
            
            GUI.Box(new Rect(Screen.width/2 - 150,Screen.height /2 - 100 ,200,150), "");
            GUILayout.BeginArea(new Rect( Screen.width/2 - 150,Screen.height /2 - 100 ,200,200));
            gameName = GUILayout.TextField(gameName);
            if (GUILayout.Button("Start Server",GUILayout.Height(45)))
            {
                Network.InitializeSecurity();
                Network.InitializeServer(17, 25001, !Network.HavePublicAddress());
                MasterServer.RegisterHost(uniqueGameName, gameName);
            }
            if (GUILayout.Button("Quit", GUILayout.Height(45)))
            {
                Application.Quit();
            }
            GUILayout.EndArea();
           /* if (GUILayout.Button("Direct Connect", GUILayout.Height(45)))
            {
                Network.Connect("127.0.0.1", 25001);
            }
            ;*/

            GUILayout.BeginArea(new Rect(Screen.width/2 - 250 ,Screen.height/2 + 100 ,400,250),"","Window");

            if (datas.Length > 0)
            {
                GUILayout.Label("Avaiable Servers: " + datas.Length);
            }
            else
            {
                GUILayout.Label(" Not have Avaiable Servers");
            }
            scroll = GUILayout.BeginScrollView(scroll);
            foreach (HostData data in datas)
            {
                GUILayout.BeginHorizontal();
                GUILayout.Label(data.gameName + " Players: " + data.connectedPlayers + " / " + data.playerLimit);
                if (GUILayout.Button("Connect", GUILayout.Height(30)))
                {
                    Network.Connect(data);
                }
                GUILayout.EndHorizontal();
            }
            GUILayout.EndScrollView();
            GUILayout.EndArea();
        }
    }

    protected GUIStyle LabelBig
    {
        get
        {
            GUIStyle style = new GUIStyle();
            style = m_Skin.customStyles[0];
            return style;
        }
    }
}
