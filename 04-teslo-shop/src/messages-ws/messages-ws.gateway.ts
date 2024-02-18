import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {


  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleDisconnect(client: Socket) {
    //console.log('Client disconnected', client.id)
    this.messagesWsService.removeClient(client.id)
  }
  
  handleConnection(client: Socket) {
    //console.log('Client connected', client.id)
    this.messagesWsService.registerClient(client)
    console.log('Connected clients:', this.messagesWsService.getConnectedClients())
  }
}