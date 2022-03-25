import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector } from 'react-redux';

const refreshToken = localStorage.getItem('refresh_token')
console.log('# refreshToken :', refreshToken)
const socket = io("http://localhost:4000", { query: { refreshToken }});

export const Chat = () => {
  const scrollRef = useRef()
  const chatsRef = useRef()
  const selectedChatRef = useRef()
  const userId = useSelector(state => state.user.id)
  const [socketResponse, setSocketResponse] = useState(null)
  
  const [users, setUsers] = useState([])
  // const [selectedUsers, setSelectedUsers] = useState([])
  
  const [chats, setChats] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [chatStack, setChatStack] = useState(2)
  
  const [getChats, setGetChats] = useState(false) // temp
  const [fetchedAllMessages, setFetchedAllMessages] = useState(false)
  
  const [newMessage, setNewMessage] = useState("")
  
  const MSG_QTY = 20;

  // GET ALL USERS
  useEffect(() => {
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/users`
        )
        setUsers(data)
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
          `/chats/?messagesQty=${MSG_QTY}`
        )
        setChats(data)
        setSelectedChat(data[0])
        console.log('# setSelectedChat(', data[0])
        scrollRef.current?.scrollIntoView({
          block: 'nearest',
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchApi();
  }, []);
  
  // UPDATE CHATS REF FOR SOCKET
  useEffect(() => {
    chatsRef.current = chats
    selectedChatRef.current = selectedChat
  });
  
  // SOCKET
  useEffect(() => {
    socket.on("message", ({text, id, sender}) => { // USES DEFAULT STATES (???)
      console.log('# SOCKET - res :', text, id, sender)
      setSocketResponse({text, id, sender})
      console.log('# chatsRef.current :', chatsRef.current ) // []
      // let chatsCopy = [...chatsRef]
      let newChats = chatsRef.current.map(chat => (
        chat._id === selectedChatRef.current._id ? (
          {
            ...chat,
            "messages": [
              ...chat.messages,
              {
                text,
                sender,
                id
              }
            ]
          }
        ) : chat
      ))
      setChats(newChats)
      setSelectedChat(newChats.find(chat => chat._id === selectedChatRef.current._id))
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
    
    let chatsCopy = [...chats]
    let newChats = chatsCopy.map(chat => (
      chat._id === selectedChat._id ? (
        {
          ...chat,
          "messages": [
            ...chat.messages,
            { 
              "text": newMessage, 
              sender: userId,
              id: "0",
            }
          ]
        }
      ) : chat
    ))
    setChats(newChats)
    setSelectedChat(newChats.find(chat => chat._id === selectedChat._id))

    try {
      const { data } = await nutritivApi.post(
        `/chats/message/${selectedChat._id}`,
        {
          "text": newMessage
        }
      )
      const { text, id } = data;
      socket.emit('message', { text, id })
      setNewMessage("");
      // setGetChats(!getChats) // temp
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
      selectedChat._id === idChatToDelete && setSelectedChat(newChats[0])
    } catch(err) {
      console.error('/chats/single:', err)
    }
  }

  const handleLoadMoreMessages = async () => {
    try {
      const { data } = await nutritivApi.get(
        `/chats/messages/${selectedChat._id}/?stack=${chatStack}&quantity=${MSG_QTY}`,
      )
      setSelectedChat({
        ...selectedChat,
        "messages": [
          ...data,
          ...selectedChat.messages,
        ]
      })
      setChatStack(chatStack + 1)
      data.length < MSG_QTY && setFetchedAllMessages(true)
    } catch(err) {
      console.error('loadMoreMessages /chats/messages/:', err)
    }
  }
  
  console.log('# chats :', chats)
  
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
        chats.map(chat => (
          <div key={chat._id}>
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
        selectedChat?.members && users.filter(user => selectedChat.members.includes(user._id)).map(member => (
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
        <button 
          onClick={handleLoadMoreMessages}
          style={{width: '100%', display: fetchedAllMessages && 'none'}}
        >
          Load more messages
        </button>
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
                                msg.id !== 0 ? (
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