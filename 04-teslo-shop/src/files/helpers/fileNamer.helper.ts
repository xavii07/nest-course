import {v4 as uuid} from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if(!file) return callback(new Error('No se ha enviado un archivo'), false)

    const extensionFile = file.mimetype.split('/')[1]
    const fileName = `${uuid()}.${extensionFile}`

    callback(null, fileName)
}