import React, { useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import nutritivApi from '../../Api/nutritivApi';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, getLastMessageOfRoom } from '../../Redux/reducers/messages';

export const Chat = () => {
  // DISPATCH
  const dispatch = useDispatch();
  
  // USESTATES
  // chats infos
  const [chatsInfos, setChatsInfos] = useState([])
  const [activeChatId, setActiveChatId] = useState(null)
  // chats content
  const [chat, setChat] = useState(null)
  const [messageToAdd, setMessageToAdd] = useState(null)
  const [messageToBeSent, setMessageToBeSent] = useState("")
  const [tempMessageId, setTempMessageId] = useState(0)
  // other
  const [allUsers, setAllUsers] = useState(null)
  const [socketError, setSocketError] = useState("")
  const [socket, setSocket] = useState(null);
  
  // SELECTORS
  const userId = useSelector(state => state.user._id)
  const isAdmin = useSelector(state => state.user.isAdmin)
  const lastMessageOfRoom = useSelector(state => (
    getLastMessageOfRoom(state, activeChatId)
  ))
  
  // REFS
  const chatboxBottomRef = useRef();
  const chatRef = useRef(chat);
  
  // OTHER
  const token = localStorage.getItem('refresh_token');
  
  /* #################### */
  
  // ON EVERY RENDER
  useEffect(() => {
    chatRef.current = chat
  });
  
  // ON LOAD
  useEffect(() => {
    if(socket) {
      // CONNECTIONS TO CHANNELS
      socket.on('connect', () => {
        console.log("socket-io | connected")
      })
      // MESSAGE
      socket.on("chatting", ({ id, text, sender, roomId }) => {
        console.log('# socket-io | chatting res :', id, text, sender, roomId)
        setMessageToAdd({ id, text, sender, roomId })
      });
      // CREATE ROOM
      socket.on("createRoom", ({ roomCreated }) => {
        // console.log('# roomCreated :', roomCreated)
      })
      // AUTH ERROR
      socket.on("connect_error", err => {
        console.log('socket-io | connection error .:')
        console.log(err);
        setSocketError(err.message)
      });
      // OTHER ERROR
      socket.on("error", err => {
        console.log('socket-io | error .:')
        console.log(err);
        setSocketError(err.message)
      });
      return () => {
        socket.on('disconnect', () => {
          console.log("socket-io | disconnected")
        })
      }
    }
  }, [socket]);
  
  useEffect(() => {
    if(token) {
      setSocket(io(
        process.env.REACT_APP_API_ADDRESS_HOST,
        {
          query: { token },
        },
      ))
    }
  }, [token])
  
  // ADD INCOMING MESSAGES TO REDUX
  useEffect(() => {
    let isSubscribed = true;
    if(messageToAdd && isSubscribed) {
      dispatch(addMessage(messageToAdd))
    }
    return () => { isSubscribed = false }
  }, [dispatch, messageToAdd]);
  
  // ADD CORRESPONDING MESSAGES TO CHAT
  useEffect(() => {
    // !chat.messages.some(msg => (
    //   messagesOfRoom.includes(msgOfRoom => msgOfRoom === msg.id))
    // ) && (
      chatRef.current && lastMessageOfRoom && (
        setChat({
          ...chatRef.current,
          "messages": [
            ...chatRef.current.messages,
            lastMessageOfRoom
          ]
        })
      )
      console.log('# lastMessageOfRoom :', lastMessageOfRoom)
    // )
  }, [lastMessageOfRoom]);
  
  // GET CHATS INFO
  useEffect(() => {
    let fetchApi = async () => {
      try {
        function useNull() {
          return null;
        }
        const method = "get"
        const requestsUrl = ['/chats/', '/users/']
        const requests = requestsUrl.map(url => {
          return { url, method }
        })
        
        await Promise.all([
          nutritivApi.request(requests[0]).catch(useNull),
          nutritivApi.request(requests[1]).catch(useNull),
        ]).then(function([chats, users]) {
          setAllUsers(users.data)
          setChatsInfos(chats.data)
          setActiveChatId(chats.data[0]._id)
          chatboxBottomRef.current?.scrollIntoView()
        }).catch(function([chats, users]) {
          console.log('# get /users/ err :', users)
          console.log('# get /chats/ err :', chats)
        })
        
      } catch(err) {
        console.error(
          '# GET CHATS INFO err:', err
        )
      }
    }
    fetchApi();
  }, []);
  
  // ACTIVE CHAT
  useEffect(() => {
    let roomId = activeChatId // ?
    let token = localStorage.getItem("refresh_token")
    roomId && socket.emit("createRoom", ({ token }))
    
    let fetchApi = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/chats/single/${activeChatId}/?messagesQty=${10}`
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
    
    let token = localStorage.getItem("refresh_token")
    
    setTempMessageId(tempMessageId + 1)
    setChat({
      ...chat,
      "messages": [
        ...chat.messages,
        {
          id: tempMessageId,
          text: messageToBeSent,
          sender: userId,
          loading: true,
          error: false,
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
          {
            ...data, 
            loading: false
          }
        ]
      })
      const { text, id } = data;
      let roomId = activeChatId;
      socket.emit('chatting', {text, id, token, roomId})
    } catch(err) {
      setChat({
        ...chat,
        "messages": [
          ...chat.messages,
          {
            id: tempMessageId,
            text: messageToBeSent,
            sender: userId,
            loading: false,
            error: true,
          }
        ]
      })
      console.error('/chats/message/ :', err)
    }
  }
  const handleMessageToBeSent = (e) => {
    setMessageToBeSent(e.target.value)
  }
  
  const handleDeleteChat = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nutritivApi.delete(
        `/chats/single/${e.target.id}`,
      )
      const newChats = chatsInfos.filter(chat => chat._id !== e.target.id)
      setChatsInfos(newChats)
      console.log('# /chats/single/ :', data)
    } catch(err) {
      console.error('/chats/single/ :', err)
    }
  }
  
  return (
    <div>
      {socketError && (
        <p style={{color: "red"}}>
          There was an error with socket.io
        </p>
      )}
      {isAdmin && chatsInfos && chatsInfos.map(chatInfo => (
        <React.Fragment key={chatInfo._id}>
          <br />
          {isAdmin && (
            <button 
              id={chatInfo._id} 
              onClick={handleDeleteChat}
            >
              X
            </button>
          )}
          <button
            id={chatInfo._id} 
            onClick={handleActiveChat}
            style={chatInfo._id === activeChatId ? {color: "grey"} : undefined}
          >
            {chatInfo.name}
          </button>
          {chatInfo._id === activeChatId && (
            <span role="img" aria-label='active' >
              ◀
            </span>
          )}
        </React.Fragment>
      ))}
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
        {chat && (
          <>
            {chat.messages.length > 0 ? (
                <>
                  {chat.messages.map(message => (
                    message.sender === userId ? (
                      <p
                        id={message.id}
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
                          message.error ? (
                            <span role="status" aria-label='sent'>
                              ❌
                            </span>
                          ) : (
                            <span role="status" aria-label='sent'>
                              ✔️
                            </span>
                          )
                        )}
                        {message.text}
                      </p>
                    ) : (
                      <p 
                        id={message.id} 
                        key={message.id}
                        style={{width: "100%"}}
                      >
                        {allUsers.filter(user => user.userId === message.sender).map((user, i) => (
                          <span key={i} style={{fontWeight: "bold"}}>
                            {user.username}
                          </span>
                        ))}
                        <br />
                        {message.text}
                      </p>
                    )
                  ))}
                </>
            ) : (
              <p>
                No messages in {chat._id}.
              </p>
            )}
            <div ref={chatboxBottomRef} />
          </>
        )}
        {/* SUBMIT */}
      </div>
      <form 
        onSubmit={handleSendMessage} 
        style={{display: 'flex'}}
      >
        <input 
          onChange={handleMessageToBeSent}
          placeholder="Type something..." 
          style={{flexGrow: 1}}
          type="text" 
          value={messageToBeSent} 
        />
        <input type="submit" value="send" />
      </form>
    </div>
  )
}