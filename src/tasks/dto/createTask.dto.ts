import { IsString, IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class createTaskDto {
    @ApiProperty()
    id?:string;

    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    description?: string;

    @IsBoolean()
    @ApiProperty()
    done: boolean;
};