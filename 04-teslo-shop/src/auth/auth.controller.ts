import { Controller, Post, Body, Get, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @GetUser() user: User,
    @GetUser('email') emailUser: string,

    @RawHeaders() rawHeaders: string[],
  ) {
    //todo: para obtener usuario de req: @Req() request: Express.Request

    return {
      ok: true,
      message: 'Hello world private',
      user,
      emailUser,
      rawHeaders,
    };
  }

  @Get('private2')
  //@SetMetadata('roles', ['admin', 'super-user']) //? para agregar metadata a la ruta o controlador se usa muy poco pero es util
  @RoleProtected(ValidRoles.superUser, ValidRoles.user)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@Req() request: Express.Request) {
    return {
      ok: true,
      message: 'Hello world private 2',
      user: request.user,
    };
  }

  //Agrupar decoradores para hacer mas legible el codigo
  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superUser) //? agrupa los decoradores RoleProtected y UseGuards
  privateRoute3(@Req() request: Express.Request) {
    return {
      ok: true,
      message: 'Hello world private 3',
      user: request.user,
    };
  }
}
