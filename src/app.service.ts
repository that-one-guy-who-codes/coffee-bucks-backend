import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Server up and running, listening at port ${
      process.env.PORT || 3000
    }`;
  }
}
