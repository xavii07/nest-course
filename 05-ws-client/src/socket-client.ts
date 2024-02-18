import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

    const socket = manager.socket('/')
    addListeners(socket)
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector("#server-status")!

    //Todo: Eventos de socket
    //on -> escuchar eventos que viene der servidor
    socket.on('connect', () => {
        serverStatusLabel.innerHTML = 'Connect'
        serverStatusLabel.style.color = 'green'
    })

    socket.on('disconnect', () => {
        serverStatusLabel.innerHTML = 'Disconnect'
        serverStatusLabel.style.color = 'red'
    })

    //emit -> hablar con el servidor
}