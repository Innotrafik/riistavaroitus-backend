import { IsString, IsNumber, IsBoolean, IsDate } from "class-validator";

export class UpdateDangerZoneDto {
    @IsString()
    name: string;

    @IsNumber()
    radius: number;

    @IsBoolean()
    temporary: boolean;

    @IsDate()
    expires: Date;

    @IsNumber()
    lat: number;

    @IsNumber()
    lng: number;

    @IsNumber()
    type: number;
}