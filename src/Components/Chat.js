import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';

const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_ADDRESS

export const Chat = () => {
  const scrollRef = useRef()
  // const [response, setResponse] = useState("")
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  
  
  // # EFFECTS #

  // GET CHATS
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/chats/`
        )
        console.log('# chats :', data)
        setChats(data)
        setSelectedChat(data[0])
      } catch (err) {
        console.error(err)
      }
    }
    getChats();
  }, []);
  
  // SOCKET
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("welcome", data => {
      // setResponse(data)
      console.log('# socket res :', data)
    })
    
    return () => socket.disconnect();
  }, []);
  

  // # HANDLERS #

  // CREATE CHAT
  const handleCreateChat = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nutritivApi.post(
        `/chats/`,
        {
          members: [
            "123",
            "456",
          ]
        }
      )
      console.log('# /chats/ :', data)
    } catch(err) {
      console.error('/chats/:', err)
    }
  }
  
  // SELECT CHAT
  const handleSelectChat = (e) => {
    let chat = chats.find(chat => chat._id === e.target.value)
    setSelectedChat(chat)
  }

  // PREPARE MESSAGE
  const handleNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  // SEND MESSAGE
  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    
    try {
      await nutritivApi.post(
        `/chats/message/${selectedChat._id}`,
        {
          "text": newMessage
        }
      )
    } catch (err) {
      console.error('# chats/message/:chatId :', err)
    }
  }
  
  // DELETE CHAT
  const handleDeleteChat = async (e) => {
    e.preventDefault();
    
    try {
      let chat = e.target.id
      const { data } = await nutritivApi.delete(
        `/chats/${chat}`,
      )
      console.log('# delete chat res :', data)
    } catch(err) {
      console.error('/chats/:', err)
    }
  }
  
  return (
    <div>
      <h2>
        Chats
      </h2>
      {/* CREATE CHAT */}
      <form>
        <input type="text" placeholder=''/>
        <input
          onClick={handleCreateChat}
          type="submit"
          value="Create"
        />
      </form>
      {/* SELECT CHAT */}
      {
        chats.map((chat, index) => (
          <form 
            id={chat._id}
            key={chat._id}
            onSubmit={e => handleDeleteChat(e)} 
          >
            <input
              defaultChecked={index === 0}
              id="selectedChat"
              name="selectedChat"
              onChange={e => handleSelectChat(e)}
              type="radio"
              value={chat._id}
            />
            <label htmlFor="selectedChat">
              {chat._id}
            </label>
            <input
              name="delete"
              type="submit" 
              value="X"
            />
          </form>
        ))
      }
      {/* CHAT BOX */}
      <div 
        ref={scrollRef}
        style={{
          maxHeight: "250px",
          overflow: "auto",
        }}
      >
        {
          selectedChat ? (
            selectedChat.messages.length > 0 ? (
              selectedChat.messages.map(msg => (
                <div key={msg._id}>
                  <p>
                    {msg.text}
                  </p>
                  <br />
                </div>
              ))
            ) : (
              <p>
                There are no messages.
              </p>
            )
          ) : (
            <p>
              Select a chat.
            </p>
          )
        }
      </div>
      {/* TYPE IN CHAT */}
      <form>
        <textarea 
          placeholder='Type something...'
          onChange={handleNewMessage}
        />
        <button 
          onClick={handleSubmitMessage}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  )
}