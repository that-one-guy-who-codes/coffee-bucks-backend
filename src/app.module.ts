import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import validationSchema from 'env/validation.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

/**
 * ConfigModule - Import the validation schema we wrote and the path to the env file.
 *
 * TypeOrmModule - Connect to MongoDB instance through the env values. The entities are empty as of now
 * but will be included through repository pattern development.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
      envFilePath: `/env/.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE,
      entities: [],
    }),
    UsersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
