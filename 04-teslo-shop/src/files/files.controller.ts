import {
  BadRequestException,
  Controller,
  Param,
  Post,
  Get,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
      private readonly filesService: FilesService,
      private readonly configService: ConfigService
    ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response, //Todo: response cuidado ya que tienes el control de la respuesta y no se esta utilizando el servicio
    @Param('imageName') imageName: string
    ) {

    const path = this.filesService.getStaticProductImage(imageName)
    res.sendFile(path) //todo: retorna la imagen

  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: {
        fileSize: 1024 * 1024 * 5, //5MB
      },
      storage: diskStorage({
        destination: './static/products/',
        filename: fileNamer
      }),
    }),
  ) //todo: nombre de archivo que viene en el body
  uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Debe enviar un archivo valido');

    const secureUrl = `${this.configService.get("HOST_API")}/files/product/${file.filename}`

    return {
      secureUrl
    };
  }

}
