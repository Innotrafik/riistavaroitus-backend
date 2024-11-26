import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DangerzonesController } from './dangerzones/dangerzones.controller';

@Module({
  imports: [],
  controllers: [AppController, DangerzonesController],
  providers: [AppService],
})
export class AppModule {}
