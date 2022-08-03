import React, { useState } from 'react'
import { socket } from '../../socket'
import axios from 'axios'
import { useAppContext } from '../../context/AppContext'
import { setRoomData } from '../../store/actionCreators'

export const JoinBlock = () => {
   const [roomId, setRoomId ] = useState('')
   const [userName, setUserName ] = useState('')
   const [isLoading, setLoading ] = useState(false)
   const { state, dispatch } = useAppContext()

   const onSubmit = async () => {
      const joinRoomData = {
         roomId,
         userName
      }
      try {
          setLoading(true)

          await axios.post('http://localhost:5000/join-room', joinRoomData)
          socket.emit('ROOM:JOIN', joinRoomData)
          dispatch(setRoomData(joinRoomData))

         setLoading(false)
      } catch (e) {
         
      }
   }

   return (
      <div className="join-block">
         <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
         />
         <input
            type="text"
            placeholder="Ваше имя"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
         />
         <button 
            disabled={isLoading}
            onClick={onSubmit} 
            className="btn btn-success"
            >
            Enter
         </button>
      </div>
      )
}