import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

interface ConectedClients {
    [id: string]: {
        socket: Socket,
        user: User
    }
}

@Injectable()
export class MessagesWsService {


    private connectedClients: ConectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async registerClient(client: Socket, userId: string) {

        const user = await this.userRepository.findOneBy({id: userId})
        if(!user) throw new Error('User not found')
        if(!user.isActive) throw new Error('User is not active')

        this.connectedClients[client.id] = {
            socket: client,
            user
        } // Add client to connectedClients object
    }

    removeClient(clientId: string) {
        delete this.connectedClients[clientId] // Remove client from connectedClients object
    }

    getConnectedClients(): string[] {
        return Object.keys(this.connectedClients) // Return the number of connected clients
    }

    getUserFullName(socketId: string) {
        return this.connectedClients[socketId].user.fullName
    }

}
