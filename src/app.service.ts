import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is the Monster Diary API! see the documentation at /api';
  }

  getPing(): string {
    return 'Pong!';
  }
}
