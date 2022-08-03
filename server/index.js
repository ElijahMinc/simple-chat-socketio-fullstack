const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const { Server } = require('socket.io');
const io = new Server(server)


const PORT = 5000

const rooms = new Map();

app.use(express.json())
app.use(cors())

app.get('/room', (req, res) => {
   const { userName, roomId } = req.body

   if(!rooms.has(roomId)) {
      rooms.set(roomId, new Map(
         ['users', []],
         ['messages', []]
      ))

      rooms.get(roomId).get('users').push(userName)
   }

   rooms.get(roomId).get('users').push(userName)

   const users = [... rooms.get(roomId).get('users')]
   console.log(users)
   return res.json(users)
})

app.post('/join-room', (req, res) => {
   const { roomId } = req.body
   console.log(roomId)
   if(!rooms.has(roomId)) {
      rooms.set(roomId, new Map(
         [
            ['users', new Map()],
            ['messages', []]
         ]
      ))
   }
   const roomNames = [...rooms.keys()]

   return res.json(roomNames)
})



io.on('connection', (socket) => {
   console.log('user connect', socket.id)

   const clientId = socket.id

   socket.on('ROOM:JOIN', ({roomId, userName}) => {
      socket.join(roomId)

      rooms.get(roomId).get('users').set(clientId, userName)
      
      const users = [...rooms.get(roomId).get('users').values()]
      const allMessagesByRoomId = [...rooms.get(roomId).get('messages')]
      io.to(roomId).emit('ROOM:JOINED', allMessagesByRoomId)     
      io.to(roomId).emit('USERS:SET', users)      
   })
 
   socket.on('NEW:MESSAGE', ({text, userName, roomId}) => {
      const messages = rooms.get(roomId).get('messages')
      messages.push({userName, text})

      const allMessagesByRoomId = [...rooms.get(roomId).get('messages')]
      io.to(roomId).emit('NEW:MESSAGE',allMessagesByRoomId)
   })

   socket.on('disconnect', () => {

      // if(rooms.)
      console.log('user disconnected', socket.id)

      rooms.forEach((value, keyAsRoomId) => {


         if(value.get('users').has(clientId)){
            const leaveName = value.get('users').get(clientId)

            io.to(keyAsRoomId).emit('ROOM:LEAVE', leaveName) 

            value.get('users').delete(clientId)

            const users = [...value.get('users').values()]

            if(!users.length) value.get('messages').splice(0, value.get('messages').length)

            io.to(keyAsRoomId).emit('USERS:SET', users)
         }
      })
   })
})

server.listen(PORT, () => {
   console.log('listening on' + PORT);
})