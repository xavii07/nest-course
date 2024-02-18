import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

interface ConectedClients {
    [id: string]: Socket
}

@Injectable()
export class MessagesWsService {

    private connectedClients: ConectedClients = {}

    registerClient(client: Socket) {
        this.connectedClients[client.id] = client // Add client to connectedClients object
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId] // Remove client from connectedClients object
    }

    getConnectedClients() {
        return Object.keys(this.connectedClients).length // Return the number of connected clients
    }

}
