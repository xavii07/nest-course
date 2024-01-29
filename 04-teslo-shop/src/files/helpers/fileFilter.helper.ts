export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('No se ha enviado un archivo'), false); //Todo: crear un error personalizado de multer de que no se ha enviado un archivo
  const extensionFile = file.mimetype.split('/')[1];
  const extensionsValid = ['png', 'jpg', 'jpeg', 'gif'];

  if (extensionsValid.includes(extensionFile)) return callback(null, true);

  callback(null, false);
};
