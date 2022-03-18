import React, { useEffect, useRef, useState } from 'react'
import socketIOClient from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';
import Multiselect from 'multiselect-react-dropdown';

const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_ADDRESS

export const Chat = () => {
  const scrollRef = useRef()
  // const [response, setResponse] = useState("")
  
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  
  const [test, setTest] = useState("")
  

  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState("")
  
  
  // # EFFECTS #
  
  // GET ALL USERS
  useEffect(() => {
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/users`
        )
        setUsers(data)
        console.log('# /users :', data)
      } catch(err) {
        console.error(
          '/users:', err
        )
      }
    }
    fetchApi();
  }, []);

  // GET CHATS
  useEffect(() => {
    let fetchApi = async () => {
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
    fetchApi();
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
      let members = selectedUsers.map(user => user._id)
      const { data } = await nutritivApi.post(
        `/chats/`,
        { members }
      )
      setSelectedChat(data)
      setChats([...chats, data])
      console.log('# create chat /chats/ :', data)
    } catch(err) {
      console.error('/chats/:', err)
    }
  }
  const handleUserSelect = (selectedList) => {
    setSelectedUsers(selectedList)
  }
  const handleUserRemove = (selectedList) => {
    setSelectedUsers(selectedList)
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
    console.log("Message sending...")
    try {
      // await nutritivApi.post(
      //   `/chats/message/${selectedChat._id}`,
      //   {
      //     "text": newMessage
      //   }
      // )
      //
      let chatsCopy = [...chats]
      let newChats = chatsCopy.map(chat => (
        chat._id === selectedChat._id ? {
          ...chat, "messages": [...chat.messages, { "text": newMessage }]
        } : chat
      ))
      setChats(newChats)
      setSelectedChat(newChats.find(chat => chat._id === selectedChat._id))
    } catch (err) {
      console.error('# chats/message/:chatId :', err)
    }
  }
  
  console.log('# selectedChat :', selectedChat)
  console.log('# chats :', chats)

  // DELETE CHAT
  const handleDeleteChat = async (e) => {
    e.preventDefault();
    try {
      let idChatToDelete = e.target.id
      await nutritivApi.delete(
        `/chats/single/${idChatToDelete}`,
      )
      let newChats = chats.filter(chat => chat._id !== idChatToDelete)
      setChats(newChats);
      console.log('# idChatToDelete :', idChatToDelete)
      selectedChat._id === idChatToDelete && setSelectedChat(newChats[0])
    } catch(err) {
      console.error('/chats/single:', err)
    }
  }

  return (
    <div>
      <h2>
        Chats
      </h2>
      {/* CREATE CHAT */}
      <Multiselect 
        onSelect={handleUserSelect}
        onRemove={handleUserRemove}
        options={users}
        displayValue="username"
      />
      <button onClick={handleCreateChat}>
        Create chatroom
      </button>
      <br />
      <h3>
        Chatrooms
      </h3>
      {/* SELECT CHAT */}
      {
        chats.map((chat, index) => (
          <React.Fragment key={chat._id}>
            <input
              checked={
                chat._id === selectedChat?._id
              }
              id="selectedChat"
              name="selectedChat"
              onChange={e => handleSelectChat(e)}
              type="radio"
              value={chat._id}
            />
            <label htmlFor="selectedChat">
              {chat._id}
            </label>
            <button
              id={chat._id}
              onClick={e => handleDeleteChat(e)}
              type="submit"
            >
              X
            </button>
            <br />
          </React.Fragment>
        ))
      }
      {/* CHAT BOX */}
      <div 
        ref={scrollRef}
        style={{
          background: "lightblue",
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
                There are no messages in {selectedChat._id}.
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
        <input 
          type="text"
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