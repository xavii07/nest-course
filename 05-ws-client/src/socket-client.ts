import { Manager, Socket } from 'socket.io-client'

export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')

    const socket = manager.socket('/')
    addListeners(socket)
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector("#server-status")! as HTMLSpanElement
    const clientsUl = document.querySelector("#clients-ul")! as HTMLUListElement
    const messageForm = document.querySelector<HTMLFormElement>("#message-form")!
    const messageInput = document.querySelector<HTMLInputElement>("#message-input")!
    const messagesUl = document.querySelector("#messages-ul")! as HTMLUListElement

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

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = ''

        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`
        })

        clientsUl.innerHTML = clientsHtml
    })

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault()

        if(messageInput.value.trim() === '') return

        socket.emit('message-from-client', {
            id: 'YO',
            message: messageInput.value
        })

        messageInput.value = ''
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>: ${payload.message}
            </li>
        `
        messagesUl.innerHTML += newMessage
    })

    //emit -> hablar con el servidor
}