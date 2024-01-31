import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
    getStaticProductImage(imageName: string) {

        const path = join(__dirname, '../../static/products', imageName) //todo: join path ruta de la imagen
        if(!existsSync(path)) throw new BadRequestException('No se encontro la imagen' + imageName)

        return path

    }
}
