import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { dangerZonesTable } from 'src/db/schema';
import 'dotenv/config';
import { ApiKeyAuthGuard } from '../auth/api-key-auth.guard';

@UseGuards(ApiKeyAuthGuard)
@Controller('dangerzones')
export class DangerzonesController {

    db = drizzle(process.env.DATABASE_URL!);

    @Get()
    async getDangerZones(): Promise<any[]> {
        try {
            const dangerZones = await this.db.select().from(dangerZonesTable);
            return dangerZones;
        } catch (error) {
            console.error('Error fetching danger zones:', error);
            throw new InternalServerErrorException('Failed to fetch danger zones');
        }
    }

    @Post()
    async createDangerZone(@Body() newDangerZone: typeof dangerZonesTable.$inferInsert): Promise<string> {
        newDangerZone.expires = new Date(newDangerZone.expires);
        try {
            await this.db.insert(dangerZonesTable).values(newDangerZone);
            return 'Danger zone created successfully';
        } catch (error) {
            console.error('Error creating danger zone:', error);
            throw new InternalServerErrorException('Failed to create danger zone');
        }
    }
}
