import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server // This decorator is used to inject the server instance into the gateway

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService
    ) {}

  handleDisconnect(client: Socket) {
    //console.log('Client disconnected', client.id)
    this.messagesWsService.removeClient(client.id)
    this.wss.emit("clients-updated", this.messagesWsService.getConnectedClients())
  }

 async handleConnection(client: Socket) {
    const token = client.handshake.headers.authorization as string
    console.log('token', token)

    let payload: JwtPayload
    try {
      payload = this.jwtService.verify(token)
      await this.messagesWsService.registerClient(client, payload.id)
      console.log('payload', payload)
    } catch (error) {
      client.disconnect()
      return
    }

    //console.log('Client connected', client.id)
    this.wss.emit("clients-updated", this.messagesWsService.getConnectedClients())
  }

  @SubscribeMessage('message-from-client') // This decorator is used to subscribe to the message-from-client event
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {

    //message-from-server event
    //!Emite solo a cliente que emitio el mensaje
    /*client.emit('message-from-server', {
      fullName: 'Soy Yo!!',
      message: payload.message || 'No message provided'
    })*/

    //!Emite a todos los clientes conectados excepto al que emitio el mensaje
    /*client.broadcast.emit('message-from-server', {
      fullName: 'Soy Yo!!',
      message: payload.message || 'No message provided'
    })*/

    //!Emite a todos los clientes conectados
    this.wss.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullName(client.id),
      message: payload.message || 'No message provided'
    })

  }
}