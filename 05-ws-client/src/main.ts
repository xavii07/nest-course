import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>
   <span id="server-status">offline</span>
  </div>
`
connectToServer()

