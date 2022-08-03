import { ACTION_KEYS } from "./reducer";

export const setJoined = (value) => ({
   type: ACTION_KEYS.SET_JOINED,
   payload: value
})

export const setUsers = (users) => ({
   type: ACTION_KEYS.SET_USERS,
   payload: users
})

export const setMessages = (messages) => ({
   type: ACTION_KEYS.SET_MESSAGES,
   payload: messages
})


export const setData = (data) => ({
   type: ACTION_KEYS.SET_DATA,
   payload: data
})

export const setRoomData = (data) => ({
   type: ACTION_KEYS.SET_ROOM_DATA,
   payload: data
})