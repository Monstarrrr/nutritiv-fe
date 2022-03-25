import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';
import { useSelector } from 'react-redux';

export const Chat = () => {
  const userId = useSelector(state => state.user.id)
  const chatboxBottomRef = useRef();
  const [chatList, setChatList] = useState([])
  const [activeChatInfo, setActiveChatInfo] = useState(null)
  const [chatContent, setChatContent] = useState(null)
  
  const [messageToBeSent, setMessageToBeSent] = useState("")
  const [tempMessageId, setTempMessageId] = useState(0)
  
  console.log('# chat :', chatContent)
  console.log('# chatList :', chatList)
  console.log('# activeChatId :', activeChatInfo)
  
  // GET CHATS INFO
  useEffect(() => {
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/chats/`
        )
        console.log('# get /chats/ :', data)
        setChatList(data)
        setActiveChatInfo(data[0])
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
          `/chats/single/${activeChatInfo._id}/?messageQty=${10}` 
        )
        setChatContent(data)
        console.log('# /chats/single/ res :', data)
      } catch(err) {
        console.error('/chats/single/:', err)
      }
    }
    if(activeChatInfo){
      fetchApi();
    }
  }, [activeChatInfo]);
  
  console.log('# messagesCount :', tempMessageId)
  
  // AUTO SCROLL
  useEffect(() => {
    chatboxBottomRef.current?.scrollIntoView()
  }, []);
  
  // SELECT CHAT
  const handleSelectedChat = (e) => {
    // TODO
  }

  // SEND MESSAGE
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    setTempMessageId(tempMessageId + 1)
    
    try {
      const { data } = await nutritivApi.post(
        `/chats/message/${activeChatInfo._id}`,
        {
          text: messageToBeSent
        }
      )
      
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
        chatList.map(chat => (
          <React.Fragment key={chat._id}>
            <br />
            <button 
              id={chat._id} 
              onClick={handleSelectedChat}
            >
              {
                chat._id === activeChatInfo?._id && (
                  <span role="img" aria-label='active' >
                    ▶
                  </span>
                )
              }
              {chat._id}
            </button>
            <br />
            <br />
          </React.Fragment>
        ))
      }
      <br />
      
      {/* CHATBOX */}
      <div style={{background: "lightblue", maxHeight: '300px', overflow: 'auto'}}>
        {
          
        }
        {/* SUBMIT */}
        <form onSubmit={handleSendMessage} style={{display: 'flex'}}>
          <input 
            onChange={handleMessageToBeSent} 
            style={{flexGrow: 1}}
            type="text" 
            value={messageToBeSent} 
          />
          <input type="submit" value="send" />
        </form>
      </div>
    </div>
  )
}