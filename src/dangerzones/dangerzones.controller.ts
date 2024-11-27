import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';
import { ApiKeyAuthGuard } from '../auth/api-key-auth.guard';
import { DangerzonesService } from './dangerzones.service';
import { CreateDangerZoneDto } from './dto/create-dangerzone.dto';
import { DangerZoneDto } from './dto/dangerzone.dto';
import { UpdateDangerZoneDto } from './dto/update-dangerzone.dto';

@UseGuards(ApiKeyAuthGuard)
@Controller('dangerzones')
export class DangerzonesController {

    db = drizzle(process.env.DATABASE_URL!);
    service = new DangerzonesService();

    @Get()
    async findAll(): Promise<DangerZoneDto[]> {
        return await this.service.getDangerZones();
    }

    @Get("nonexpired")
    async findNonExpired(): Promise<DangerZoneDto[]> {
        return await this.service.getNonExpiredDangerZones();
    }

    @Get(":id")
    async findOne(@Param('id') id: number): Promise<DangerZoneDto> {
        return await this.service.getDangerZoneById(id);
    }

    @Post()
    async createDangerZone(@Body() dangerZone: CreateDangerZoneDto): Promise<string> {
        return await this.service.createDangerZone(dangerZone);
    }

    @Put(":id")
    async updateDangerZone(@Body() dangerZone: UpdateDangerZoneDto, @Param('id') id: number): Promise<string> {
        return await this.service.updateDangerZone(dangerZone, id);
    }

    @Delete(":id")
    async deleteDangerZone(@Param('id') id: number): Promise<string> {
        return await this.service.deleteDangerZone(id);
    }
}
