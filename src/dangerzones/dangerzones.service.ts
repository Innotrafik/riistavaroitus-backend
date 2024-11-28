import { HttpException, Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { dangerZonesTable } from 'src/db/schema';
import { DangerZoneDto } from './dto/dangerzone.dto';
import { eq, gte, isNull, or, Update } from 'drizzle-orm';
import { CreateDangerZoneDto } from './dto/create-dangerzone.dto';
import { UpdateDangerZoneDto } from './dto/update-dangerzone.dto';

@Injectable()
export class DangerzonesService {
    db = drizzle(process.env.DATABASE_URL!);

    async getDangerZones(): Promise<DangerZoneDto[]> {
        try {
            const dangerZones = await this.db.select().from(dangerZonesTable);
            return dangerZones;
        } catch (error) {
            console.error('Error fetching danger zones:', error);
            throw new Error('Could not fetch danger zones');
        }
    }

    async getDangerZoneById(id: number): Promise<DangerZoneDto> {
        try {
            const result = await this.db.select().from(dangerZonesTable).where(eq(dangerZonesTable.id, id));
            return result[0];
        } catch (error) {
            console.error('Error fetching danger zone by ID:', error);
            throw new Error('Could not fetch danger zone by ID');
        }
    }

    async getNonExpiredDangerZones(): Promise<DangerZoneDto[]> {
        try {
            const now = new Date();
            const dangerZones = await this.db.select().from(dangerZonesTable).where(or(gte(dangerZonesTable.expires, now), isNull(dangerZonesTable.expires)));
            return dangerZones;
        } catch (error) {
            console.error('Error fetching non-expired danger zones:', error);
            throw new Error('Could not fetch non-expired danger zones');
        }
    }

    async createDangerZone(dangerZone: CreateDangerZoneDto): Promise<string> {
        if (dangerZone.expires) {
            dangerZone.expires = new Date(dangerZone.expires);
        }
        try {
            await this.db.insert(dangerZonesTable).values(dangerZone);
            return 'Danger zone created successfully';
        } catch (error) {
            console.error('Error creating danger zone:', error);
            if (error.code === '23503') {
                throw new HttpException('Invalid danger zone type', 400);
            }
        }
    }

    async updateDangerZone(dangerZone: UpdateDangerZoneDto, id: number): Promise<string> {
        console.log(dangerZone);
        if (dangerZone.expires) {
            dangerZone.expires = new Date(dangerZone.expires);
        } 
        
        if (dangerZone.temporary === true && !dangerZone.expires) {
            throw new HttpException('Temporary danger zones must have an expiration date', 400);
        }

        if (dangerZone.temporary === false && dangerZone.expires) {
            dangerZone.expires = null;
        }
        
        try {
            await this.db.update(dangerZonesTable).set(dangerZone).where(eq(dangerZonesTable.id, id));
            return 'Danger zone updated successfully';
        } catch (error) {
            console.error('Error updating danger zone:', error);
            throw new Error('Could not update danger zone');
        }
    }

    async deleteDangerZone(id: number): Promise<string> {
        try {
            await this.db.delete(dangerZonesTable).where(eq(dangerZonesTable.id, id));
            return 'Danger zone deleted successfully';
        } catch (error) {
            console.error('Error deleting danger zone:', error);
            throw new Error('Could not delete danger zone');
        }
    }
}

