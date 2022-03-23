import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';

const socket = io("http://localhost:4000")

export const Chat = () => {
  const scrollRef = useRef()
  const userId = useSelector(state => state.user.id)
  const [socketResponse, setSocketResponse] = useState(null)
  
  const [users, setUsers] = useState([])
  // const [selectedUsers, setSelectedUsers] = useState([])
  
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [getChats, setGetChats] = useState(false) // temp
  
  const [newMessage, setNewMessage] = useState("")
  
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
          `/chats/?messagesQty=${20}`
        )
        console.log('# chats :', data)
        setChats(data)
        setSelectedChat(data[0])
        scrollRef.current?.scrollIntoView({
          block: 'nearest',
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchApi();
  }, [getChats]);
  
  // SOCKET
  useEffect(() => {
    socket.on("message", data => {
      setSocketResponse(data)
      // let chatsCopy = [...chats]
      // let newChats = chatsCopy.map(chat => (
      //   chat._id === selectedChat._id ? (
      //     {
      //       ...chat,
      //       "messages": [
      //         ...chat.messages,
      //         { 
      //           "text": data, 
      //           sender: userId
      //         }
      //       ]
      //     }
      //   ) : chat
      // ))
      console.log('# socket-io res :', data)
    })
    return () => socket.disconnect();
  }, []);
  
  
  // # HANDLERS #
  
  // CREATE CHAT
  // const handleCreateChat = async (e) => {
  //   e.preventDefault();
  //   try {
  //     let members = selectedUsers.map(user => user._id)
  //     const { data } = await nutritivApi.post(
  //       `/chats/`,
  //       { members }
  //     )
  //     setSelectedChat(data)
  //     setChats([data, ...chats])
  //     console.log('# create chat /chats/ :', data)
  //   } catch(err) {
  //     console.error('/chats/:', err)
  //   }
  // }
  // const handleUserSelect = (selectedList) => {
  //   setSelectedUsers(selectedList)
  // }
  // const handleUserRemove = (selectedList) => {
  //   setSelectedUsers(selectedList)
  // }
  
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

    socket.emit('message', newMessage)
    
    let chatsCopy = [...chats]
    let newChats = chatsCopy.map(chat => (
      chat._id === selectedChat._id ? (
        {
          ...chat,
          "messages": [
            ...chat.messages,
            { 
              "text": newMessage, 
              sender: userId
            }
          ]
        }
      ) : chat
    ))
    setChats(newChats)
    setSelectedChat(newChats.find(chat => chat._id === selectedChat._id))
    
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
    
    try {
      await nutritivApi.post(
        `/chats/message/${selectedChat._id}`,
        {
          "text": newMessage
        }
      )
      setNewMessage("");
      setGetChats(!getChats) // temp
    } catch (err) {
      console.error('# chats/message/:chatId :', err)
    }
  }
  
  // AUTO SCROLL
  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      block: 'nearest',
    })
  }, [selectedChat]);

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

  console.log('# userId :', userId)  
  console.log('# users :', users)
  
  return (
    <div>
      <h2>
        Chats
      </h2>
      {/* CREATE CHAT */}
      {/* <Multiselect 
        onSelect={handleUserSelect}
        onRemove={handleUserRemove}
        options={users}
        displayValue="username"
      />
      <button onClick={handleCreateChat}>
        Create chatroom
      </button>
      <br /> */}
      {/* SELECT CHAT */}
      {
        chats.map((chat, index) => (
          <div key={index} id={index}>
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
          </div>
        ))
      }
      <br />
      {/* CHAT MEMBERS */}
      {
        selectedChat && users.filter(user => selectedChat.members.includes(user._id)).map(member => (
          <span key={member._id}>
            --{member.username}--
          </span>
        ))
      }
      <br />
      <br />
      {/* CHAT BOX */}
      <div
        style={{
          background: "lightblue",
          maxHeight: "250px",
          maxWidth: "400px",
          overflow: "auto",
        }}
      >
        {
          selectedChat ? (
            selectedChat.messages.length > 0 ? (
              selectedChat.messages.map(msg => (
                <div
                  key={msg.id}
                  ref={scrollRef}
                >                
                    <div>                      
                      {
                        userId === msg.sender ? (
                          <p style={{textAlign: "end", margin: 0}}>
                            <span style={{fontWeight: "bold"}}>
                              You:
                            </span>
                            <br />
                            <span>
                              {
                                msg.id ? (
                                  <span role="img">
                                    ✔️
                                  </span>
                                ) : (
                                  <span role="img">
                                    🕘
                                  </span>
                                )
                              }
                              {msg.text}
                            </span>
                          </p>
                        ) : (
                          <p>
                            <span style={{fontWeight: "bold"}}>
                              {
                                users.filter(user => (
                                  user._id === msg.sender
                                ))[0].username
                              }
                            </span>
                            :
                            <br />
                            <span>
                              {msg.text}
                            </span>
                          </p>
                        )
                      }
                    </div>
                    <br />
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
          value={newMessage}
        />
        <button 
          onClick={handleSubmitMessage}
          type="submit"
        >
          Send
        </button>
      </form>
      <br />
      Socket response:
      <pre>
        {JSON.stringify(socketResponse, null, 2)}
      </pre>
      Chats:
      <pre>
        {JSON.stringify(chats, null, 2)}
      </pre>
    </div>
  )
}