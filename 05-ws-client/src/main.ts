import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>
   <input type="text" placeholder="Json Web Token" id="json-token"/>
   <button id="btn-token">Connect</button>
   <br >
   <span id="server-status">offline</span>
   <ul id="clients-ul"></ul>
   <form id="message-form">
    <input placeholder='Ingresa el mensaje' id="message-input" />
   </form>
   <h3>Messages</h3>
   <ul id='messages-ul'></ul>
  </div>
`

const btnToken = document.querySelector<HTMLButtonElement>('#btn-token')!
const inputToken = document.querySelector<HTMLInputElement>('#json-token')!

btnToken.addEventListener('click', () => {
    if(inputToken.value.trim() === '') return alert('Ingresa un token valido')

    connectToServer(inputToken.value.trim())
})

