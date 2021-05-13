const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router.js')
const cors = require('cors')

const { addUser, removeUser, getUser, getUserInRoom } = require('./users.js')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
        origin: "*"
    }
})

const PORT = process.env.PORT || 5000

io.on('connection', socket => {

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if(error)  return callback(error)
        socket.emit('message', { user: 'admin', text: `Welcome ${user.name}, Room: ${user.room}` })
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined` })
        socket.join(user.room)

        io.to(user.room).emit('roomData', { room: user.room , users: getUserInRoom(user.room)})

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user:user.name, text: message })
        io.to(user.room).emit('roomData', { room :user.room, users: getUserInRoom(user.room) })
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text:`${user.name} has left` })
        }

    })
})

app.use(router)
app.use(cors)

server.listen(PORT, () => {
    console.log(`Up on http://localhost:${PORT}`)
})
