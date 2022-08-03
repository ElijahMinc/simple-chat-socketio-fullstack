import { useEffect } from "react";
import { useAppContext } from "./context/AppContext";
import axios from 'axios'
import {socket} from './socket/index'
import { JoinBlock } from "./components/JoinBlock/JoinBlock";
import { setJoined, setMessages, setRoomData, setUsers } from "./store/actionCreators";
import { Chat } from "./components/Chat/Chat";


function App() {
  const { state, dispatch } = useAppContext()

  useEffect(() => {
    socket.on('ROOM:JOINED', (messages) => {
      dispatch(setMessages(messages))
      dispatch(setJoined(true))
    })
    socket.on('USERS:SET', (users) => {
      dispatch(setUsers(users))
    })
    socket.on('NEW:MESSAGE', (messages) => {
      dispatch(setMessages(messages))
    })
   
  }, [])

  useEffect(() => {
    socket.on('ROOM:LEAVE', (userLeave) => {
      dispatch(setMessages([...state.messages, {
        userName: ``,
        text: `User Leave: ${userLeave} :'C`
      }]))
    })
  }, [state.messages.length])

  console.log(state)
  return (
      <div className="wrapper">
        {!state.isJoined ? <JoinBlock/> : <Chat/>}

      </div>
  );
}

export default App;
