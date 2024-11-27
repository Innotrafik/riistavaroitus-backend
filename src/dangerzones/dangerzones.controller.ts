import { Body, Controller, Get, InternalServerErrorException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { dangerZonesTable } from 'src/db/schema';
import 'dotenv/config';
import { ApiKeyAuthGuard } from '../auth/api-key-auth.guard';
import { eq } from 'drizzle-orm';

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

    @Put(":id")
    async updateDangerZone(@Body() updatedDangerZone: typeof dangerZonesTable.$inferInsert, @Param('id') id: number): Promise<string> {
        updatedDangerZone.expires = new Date(updatedDangerZone.expires);
        try {
            await this.db.update(dangerZonesTable).set(updatedDangerZone).where(eq(dangerZonesTable.id, id));
            return 'Danger zone updated successfully';
        } catch (error) {
            console.error('Error updating danger zone:', error);
            throw new InternalServerErrorException('Failed to update danger zone');
        }
    }
}
