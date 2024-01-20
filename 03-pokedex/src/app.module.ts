import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    //Todo: Servir archivos estaticos
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    //Todo: Conectar a base de datos MongoDB
    MongooseModule.forRoot('mongodb://localhost:27018/nest-pokemon'),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
