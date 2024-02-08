import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log(data);
    //!: en el ctx se encuentra el request es el contexto en donde se ejecuta la funcion
    //! la data se puede enviar datos desde el decorador en donde se implementa en forma []
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user)
      throw new InternalServerErrorException('user not found - request');

    return !data ? user : user[data]; //? si viene data retorna otros datos
  },
);
