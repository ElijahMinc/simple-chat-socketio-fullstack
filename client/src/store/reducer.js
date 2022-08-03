export const initialState = {
   isJoined: false,
   roomId: '',
   userName: '',
   messages: [],
   users: []
}


export const ACTION_KEYS = Object.freeze({
   SET_JOINED: 'SET_JOINED',
   SET_USERS: 'SET_USERS',
   SET_MESSAGES: 'SET_MESSAGES',
   SET_DATA: 'SET_DATA',
   SET_ROOM_DATA: 'SET_ROOM_DATA'
})

 const reducer = (state, action) => {
   switch (action.type) {
      case ACTION_KEYS.SET_JOINED:
         return {
            ...state,
            isJoined: action.payload
         }
      case ACTION_KEYS.SET_USERS:
         return {
            ...state,
            users: action.payload ?? []
         }
      case ACTION_KEYS.SET_MESSAGES:
         return {
            ...state,
            messages: action.payload ?? []
         }
      case ACTION_KEYS.SET_DATA:
         return {
            ...state,
            messages: action.payload.messages ?? [],
            users: action.payload.users ?? []
         }
      case ACTION_KEYS.SET_ROOM_DATA:
         return {
            ...state,
            userName: action.payload.userName ?? '',
            roomId: action.payload.roomId ?? ''
         }   
      default:
         return state;
   }
}

export default reducer