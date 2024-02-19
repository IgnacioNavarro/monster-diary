import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { MonstersModule } from './modules/monsters/monsters.module';

@Module({
  imports: [UsersModule, MonstersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
