import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import socketIOClient from "socket.io-client";
import nutritivApi from '../Api/nutritivApi';

const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_ADDRESS

export const Chat = () => {
  const user = useSelector(state => state.user)
  // const [response, setResponse] = useState("")
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await nutritivApi.get(
          `/conversations/${user._id}`
        )
        setConversations(data)
      } catch (err) {
        console.error(err)
      }
    }
    getConversations();
  }, [user._id]);
  
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT)
    socket.on("welcome", data => {
      // setResponse(data)
      console.log('# socket res :', data)
    })
    
    return () => socket.disconnect();
  }, []);

  const handleSelectConversation = async (e) => {
    try {
      const { data } = await nutritivApi.get(
        `/messages/${e.target.value}`
      )
      console.log('# messages :', data)
      setMessages(data)
    } catch(err) {
      console.error(
        '/messages/:', err
      )
    }
  }

  const handleNewMessage = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSubmit = async (e) => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: messages[0]._id
    }
    try {
      const { data } = await nutritivApi.post(
        `/messages`,
        message
      )
      setMessages([
        ...messages,
        data
      ])
      console.log('# message sent res :', data)
    } catch (err) {
      console.error('# err ', err)
    }
  }
  
  return (
    <div>
      <h2>
        Conversations :
      </h2>
      <pre>
        {JSON.stringify(conversations, null, 2)}
      </pre>
      <select 
        name="conversations" 
        id="conversations"
        onChange={handleSelectConversation}
      >
        <option value="">
          Chose a conversation
        </option>
        {
          conversations.map(conv => (
            <option 
              key={conv._id}
              value={conv._id}
            >
              {conv._id}
            </option>
          ))
        }
      </select>
      <div style={{maxHeight: "450px"}}>
        {
          messages && (
            messages.map(msg => (
              <React.Fragment key={msg._id}>
                <p>
                  {msg.text}
                </p>
                <br />
              </React.Fragment>
            ))
          )
        }
      </div>
      <textarea 
        placeholder='Type something...'
        onChange={handleNewMessage}
      />
      <button onClick={handleSubmit}>
        Send
      </button>
    </div>
  )
}