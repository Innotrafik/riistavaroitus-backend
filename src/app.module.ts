import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DangerzonesController } from './dangerzones/dangerzones.controller';
import { DangerzonesService } from './dangerzones/dangerzones.service';

@Module({
  imports: [],
  controllers: [AppController, DangerzonesController],
  providers: [AppService, DangerzonesService],
})
export class AppModule {}
