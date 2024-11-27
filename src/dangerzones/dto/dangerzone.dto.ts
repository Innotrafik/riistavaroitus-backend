import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class DangerZoneDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    radius: number;

    @IsNotEmpty()
    @IsBoolean()
    temporary: boolean;

    @ValidateIf(o => o.temporary)
    @IsNotEmpty()
    @IsDate()
    expires: Date;

    @IsNotEmpty()
    @IsNumber()
    lat: number;

    @IsNotEmpty()
    @IsNumber()
    lng: number;

    @IsNotEmpty()
    @IsNumber()
    type: number;

    @IsNotEmpty()
    @IsDate()
    created: Date;

    @IsNotEmpty()
    @IsDate()
    updated: Date;
}