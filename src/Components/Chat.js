import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';
import { useSelector } from 'react-redux';

const refreshToken = localStorage.getItem('refresh_token');
const socket = io("http://localhost:4000", { query: { refreshToken } });

export const Chat = () => {
  const userId = useSelector(state => state.user.id)
  // CHATS INFO
  const [chatsInfos, setChatsInfo] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  
  // CHATS CONTENT
  const [chat, setChat] = useState(null)
  const [messageToBeSent, setMessageToBeSent] = useState("")
  const [tempMessageId, setTempMessageId] = useState(0)

  const chatboxBottomRef = useRef();
  const chatRef = useRef(chat);
  
  // SOCKET
  useEffect(() => {
    chatRef.current = chat
  });
  useEffect(() => {
    socket.on("message", (data) => {
      console.log('# socket io res :', data)
    })
    //
    return () => {
      socket.disconnect()
    }
  }, []);
  

  // GET CHATS INFO
  useEffect(() => {
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/chats/`
        )
        console.log('# get /chats/ :', data)
        setChatsInfo(data)
        setActiveChatId(data[0]._id)
        chatboxBottomRef.current?.scrollIntoView()
      } catch(err) {
        console.error(
          'get /chats/:', err
        )
      }
    }
    fetchApi();
  }, []);
  
  // GET CHAT BY ID
  useEffect(() => {
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/chats/single/${activeChatId}/?messageQty=${10}` 
        )
        setChat(data)
        console.log('# /chats/single/ res :', data)
      } catch(err) {
        console.error('/chats/single/:', err)
      }
    }
    if(activeChatId){
      fetchApi();
    }
  }, [activeChatId]);
  
  // AUTO SCROLL
  useEffect(() => {
    chatboxBottomRef.current?.scrollIntoView()
  }, [chat]);
  
  // ACTIVE CHAT
  const handleActiveChat = (e) => {
    setActiveChatId(e.target.id)
  }

  // SEND MESSAGE
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    setTempMessageId(tempMessageId + 1)
    setChat({
      ...chat,
      "messages": [
        ...chat.messages,
        {
          "id": tempMessageId,
          "text": messageToBeSent,
          "sender": userId,
          "loading": true
        }
      ]
    })
    setMessageToBeSent("")
        
    try {
      const { data } = await nutritivApi.post(
        `/chats/message/${activeChatId}`,
        {
          text: messageToBeSent
        }
      )
      setChat({
        ...chat,
        "messages": [
          ...chat.messages,
          {...data}
        ]
      })
      console.log('# /chats/message/ :', data)
    } catch(err) {
      console.error('/chats/message/:', err)
    }
  }
  const handleMessageToBeSent = (e) => {
    setMessageToBeSent(e.target.value)
  }
  
  return (
    <div>
      <h2>
        Chats
      </h2>
      {
        chatsInfos.map(chatInfo => (
          <React.Fragment key={chatInfo._id}>
            <br />
            <button
              id={chatInfo._id} 
              onClick={handleActiveChat}
              style={chatInfo._id === activeChatId ? {color: "grey"} : undefined}
            >
              {chatInfo._id}
            </button>
            {
              chatInfo._id === activeChatId && (
                <span role="img" aria-label='active' >
                  ◀
                </span>
              )
            }
          </React.Fragment>
        ))
      }
      <br />
      <br />
      
      {/* CHATBOX */}
      <div style={{
        background: "lightblue",
        display: "flex",
        flexDirection: "column", 
        height: '300px', 
        overflow: 'auto'
      }}>
        {
          chat && (
            <>
              {
                chat.messages.length > 0 ? (
                  chat.messages.map(message => (
                    message.sender === userId ? (
                      <p 
                        key={message.id} 
                        style={{
                          alignSelf: "end",
                          textAlign: "right", 
                          width: "100%"
                        }}
                      >
                        <span style={{fontWeight: "bold"}}>
                          You:
                        </span>
                        <br />
                        {message.loading ? (
                          <span role="status" aria-label='sending'>
                            🕘
                          </span>
                        ) : (
                          <span role="status" aria-label='sent'>
                            ✔️
                          </span>
                        )}
                        {message.text}
                      </p>
                    ) : (
                      <p key={message.id} style={{width: "100%"}}>
                        <span style={{fontWeight: "bold", textAlign: "end"}}>
                          {message.sender}:
                        </span>
                        <br />
                        {message.text}
                      </p>
                    )
                  ))
                ) : (
                  <p>
                    No messages in {chat._id}.
                  </p>
                )
              }
              <div ref={chatboxBottomRef} />
            </>
          )
        }
        {/* SUBMIT */}
      </div>
      <form 
        onSubmit={handleSendMessage} 
        style={{display: 'flex'}}
      >
        <input 
          onChange={handleMessageToBeSent} 
          style={{flexGrow: 1}}
          type="text" 
          value={messageToBeSent} 
        />
        <input type="submit" value="send" />
      </form>
    </div>
  )
}