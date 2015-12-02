////////////////////////////////CODE WRITTE BY BRINER LOVO GAMES 2014/////////////////////
//////////UMC CHAT SYSTEM////////////////////////////////////////////////////////////////
///////////////IN A SCENE WITH A SERVER READY////////////////////////////////////////////
///////////PUT THIS SCRIPT AND A GO WITH A NETWORKVIEW/////////////////////////////////// 
/////////////////////////////////AND READY TO CHAT//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[RequireComponent(typeof(NetworkView))]
[RequireComponent(typeof(AudioSource))]
public class bl_MultiplayerChat : MonoBehaviour {

    public struct ChatData
    {
        public string name { get; set; } //Name of sender
        public string text { get; set; } //Message text
        public Color color { get; set; } //Sender color
        public float timer { get; set; } //Remove message after certain time

        public ChatData(string string1, string string2, Color color1, float timer1)
        {
            name = string1;
            text = string2;
            color = color1;
            timer = timer1;
        }

    }
    /// <summary>
    /// List with al Messages in Room
    /// </summary>
    public List<ChatData> messages = new List<ChatData>(); 
    /// <summary>
    /// Skin for GUIs
    /// </summary>
    public GUISkin m_Skin = null;
    /// <summary>
    /// Color for playername dysplay
    /// </summary>
    public AudioClip Send_Sound;

    public Color My_Color;
    public Color m_Color;
    public static Color Sender_Color;
    /// <summary>
    /// Get current Chat in Room
    /// </summary>
     public static bl_MultiplayerChat chat; 
    /// <summary>
    /// Chat GUI Height
    /// </summary>
     public int m_Height = 140;
    /// <summary>
    /// Scroll for Chat list
    /// </summary>
     private Vector2 scrollPos = Vector2.zero;
    /// <summary>
    /// Widht of chat gui
    /// </summary>
     public int m_Widht = 250;
    /// <summary>
    /// Max word for send in chat
    /// </summary>
     public int m_Max_Lengh = 15;
    /// <summary>
    /// String for Send new Message
    /// </summary>
     private string chatInput = "";
    /// <summary>
     /// its "Apply_alpha" enabled apply this time for gui chat fade
    /// </summary>
     public float m_Time_To_Fade = 7;
     private float m_alpha = 5;
    /// <summary>
    /// Time for remove old messages
    /// </summary>
     public float m_Remove_Time = 20;
     static float Remove_Time ;
   
    /// <summary>
    /// its false = gui not fade.
    /// </summary>
     public bool Apply_alpha = true;
    /// <summary>
    /// its false =  old messages not remove from chat
    /// </summary>
     public bool Remove_OnTime = true;
     private float lastUnfocusTime = 0;
    /// <summary>
    /// Player Name
    /// </summary>
     private string User;
    /// <summary>
     /// filter to avoid unwanted word
     /// create new string to filter adding: ,"word_to_filter" (all in lowercase).
    /// </summary>
     private string[] blacklist = new string[] { 
		"wrong", "test","nopermit","<"
	};
     private bool m_isEnabled = true;



 /// <summary>
 /// Get Player Name, Send in a PlayerPrefs in other Scene for example  a Lobby
 /// </summary>
     void Start()
     {
		User = PlayerPrefs.GetString("USER_ID_SISPIC");
          
        Sender_Color = m_Color;
        Remove_Time = m_Remove_Time;
     }
 
     void Awake()
     {        
         chat = this;    
     }

     void Update()
     {
         if (Remove_OnTime)
         {
             //Remove chat message after timer reach 0
             for (int i = 0; i < messages.Count; i++)
             {
                 ChatData MInfo = messages[i];
                 MInfo.timer -= Time.deltaTime;
                 if (MInfo.timer > 0)
                 {
                     messages[i] = new ChatData(MInfo.name, MInfo.text, MInfo.color, MInfo.timer);
                 }
                 else
                 {
                     messages.RemoveAt(i);
                 }
             }
         }
         if (!Apply_alpha || !Network.isClient && !Network.isServer)
             return;

         if (m_alpha > 0.0f)
         {
             m_alpha -= Time.deltaTime;
         }
         if (m_isEnabled)
             m_alpha = m_Time_To_Fade;
     }

     void OnGUI()    
     {
         if (!Network.isClient && !Network.isServer)
             return;

         GUI.skin = m_Skin;
         GUI.color = new Color(1, 1, 1, m_alpha);
         GUI.SetNextControlName("");
         //use this for static chat
         GUILayout.BeginArea(new Rect(0, Screen.height - (m_Height+70), m_Widht+ 30, m_Height),"Chat Room");
         GUILayout.BeginHorizontal();
         GUILayout.BeginVertical("window");
         scrollPos = GUILayout.BeginScrollView(scrollPos);
         GUILayout.FlexibleSpace(); 
         for (int i = messages.Count - 1; i >= 0; i--)       
         {
             GUILayout.BeginHorizontal("Box");
             if (messages[i].name == User)
             {
                 GUI.color = new Color(My_Color.r, My_Color.g, My_Color.b, m_alpha);
             }
             else
             {
                 GUI.color = new Color(messages[i].color.r, messages[i].color.g, messages[i].color.b, m_alpha);

             }
             GUILayout.Label("[ "+messages[i].name+" ] ");
             GUILayout.Space(5);
             GUI.color = new Color(1, 1, 1, m_alpha);
             GUILayout.Label(messages[i].text);
             GUILayout.EndHorizontal();
         }        
         GUILayout.EndScrollView();
         GUILayout.EndVertical();
         GUI.color = new Color(1, 0, 0, m_alpha);
         if (GUILayout.Button("X",GUILayout.Width(30),GUILayout.Height(m_Height-35)))
         {
             m_alpha = 0;
             m_isEnabled = false;
             GUI.FocusControl("");
             GUI.UnfocusWindow();
         }
         GUILayout.EndHorizontal();
         GUI.color = new Color(1, 1, 1, m_alpha);
         GUILayout.BeginHorizontal("Box");

         if (m_isEnabled)
         {
             GUI.color = Color.white;
             GUI.SetNextControlName("ChatField");
             chatInput = GUILayout.TextField(chatInput, m_Max_Lengh, GUILayout.MinWidth(225));
             if (GUILayout.Button("SEND", GUILayout.Height(25), GUILayout.Width(69)))
             {
                 SendChat(RPCMode.All);
             }
             if (GUILayout.Button("CLOSET", GUILayout.Height(25), GUILayout.Width(69)))
             {
                 m_isEnabled = false;
             }
                 if (Apply_alpha)
                 {
                     GUI.color = Color.green;
                 }
                 else
                 {
                     GUI.color = Color.red;
                 }
                 if (GUILayout.Button("FADE", GUILayout.Height(25), GUILayout.Width(69)))
                 {
                     Apply_alpha = !Apply_alpha;
                 }


         }
         else
         {
             GUI.SetNextControlName("");
         }

             if (Event.current.type == EventType.keyDown && Event.current.character == '\n' && m_isEnabled)
             {
                 
                     if (GUI.GetNameOfFocusedControl() == "ChatField")
                     {
                         if (chatInput.Length > 0)
                         {
                         SendChat(RPCMode.All);
                        // lastUnfocusTime = Time.time;
                         GUI.FocusControl("ChatField");
                     }
                     else
                     {
                         m_isEnabled = false;
                         GUI.SetNextControlName("");
                         GUI.FocusControl("");
                         GUI.UnfocusWindow();
                     }
                 }
                 else
                 {
                     if (lastUnfocusTime < Time.time - 0.1f)
                     {
                         GUI.FocusControl("ChatField");
                     }
                 }
             }
		else if (Event.current.type == EventType.keyDown && Event.current.character == '<' && !m_isEnabled)
             {
                 m_isEnabled = true;
                 GUI.FocusControl("ChatField");
             }

             GUILayout.FlexibleSpace();
             GUILayout.EndHorizontal();
             GUILayout.EndArea();
     }     

    /// <summary>
    /// Send a new message to server for all player
    /// </summary>
    /// <param name="text">text for show in chat</param>
     public static void AddMessage(string text,string sender)    
     {
         Color color = new Color();
         color = Sender_Color;
         chat.messages.Add( new ChatData( sender, text,color,Remove_Time));
         if (chat.messages.Count > 15)            
             chat.messages.RemoveAt(0);    
     }   
  

     [RPC]    
     void SendChatMessage(string text,string name)    
     {
         m_alpha = m_Time_To_Fade;
         AddMessage(text,name);
         if (Send_Sound != null)
         {
             GetComponent<AudioSource>().clip = Send_Sound;
             GetComponent<AudioSource>().Play();
         }
     }     
 
    /// <summary>
    /// Get and Send a new message and apply filter string for wrong labels
    /// </summary>
    /// <param name="target"> Networking targets</param>
     void SendChat( RPCMode target)    
     {        
         if (chatInput != "")        
         {
             
             foreach (string filter in this.blacklist)
             {
                 if (chatInput.ToLower().IndexOf(filter) != -1)
                 {
                     chatInput = chatInput.ToLower().Replace(filter, "****");
                 }
             }
            
            GetComponent<NetworkView>().RPC("SendChatMessage", target, chatInput,User);
             chatInput = "";
         }    
     }     
 
 }
