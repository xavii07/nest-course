import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //para poder usar las variables de entorno
    TypeOrmModule.forRoot({
      //para configurar la conexion a la base de datos
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, //todas las entidades se cargan automaticamentez
      synchronize: true, //si hay cambios en el modelo, se sincroniza con la base de datos solo en dev mode
    }),
    ProductsModule,
    CommonModule,
  ],
})
export class AppModule {}