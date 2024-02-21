import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MonstersModule } from './modules/monsters/monsters.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { GlobalExceptionFilter } from './modules/exception-filters/http-exception.filter';
import { RolesGuard } from './modules/users/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ConfigModule.forRoot(),
    UsersModule,
    MonstersModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  },

  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }
  

  ],
})
export class AppModule { }
