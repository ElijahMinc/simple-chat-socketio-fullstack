import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import { socket } from '../../socket'

export const Chat = () => {
   const { state: {roomId, userName, users, messages}, dispatch } = useAppContext()
   const [messageValue, setMessageValue] = useState('')
   const messagesRef = useRef();

   const onSendMessage = (e) => {
      e.preventDefault()
      const messageData = {
        userName,
        roomId,
        text: messageValue
      }
      socket.emit('NEW:MESSAGE', messageData)
      setMessageValue('')
   }

   useEffect(() => {
    messagesRef.current.scrollTo({
      top: 10000,
    })
   }, [messages.length])

   return (
      <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн {!!users?.length ?? 0}:</b>
        <ul>
          {!!users?.length && users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div
         ref={messagesRef} 
         className="messages">
          {messages.map((message) => (
            <div className="message">
              <p>{message.text}</p>
              <div>
                <span>{message.userName}</span>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSendMessage}>
          <textarea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            className="form-control"
            rows="3"></textarea>
          <button 
           type="submit"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
      )
}