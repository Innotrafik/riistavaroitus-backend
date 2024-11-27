import { IsNotEmpty, IsString, IsNumber, IsBoolean, ValidateIf, IsDate } from "class-validator";

export class CreateDangerZoneDto {
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
}