import { IsString, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for watering information
 */
export class WateringDto {
    @ApiProperty({
        description: 'Watering period',
        example: 'Weekly',
    })
    @IsString()
    readonly period: string;

    @ApiProperty({
        description: 'Temperature-based watering info',
        example: 'Moderate',
    })
    @IsString()
    readonly basedTemperature: string;
}

/**
 * DTO for sunlight information
 */
export class SunlightDto {
    @ApiProperty({
        description: 'Type of sunlight',
        example: 'Indirect',
    })
    @IsString()
    readonly type: string;

    @ApiProperty({
        description: 'Duration of sunlight exposure',
        example: '4-6 hours',
    })
    @IsString()
    readonly duration: string;
}

/**
 * DTO for flowering information
 */
export class FloweringDto {
    @ApiProperty({
        description: 'Whether the plant flowers',
        example: false,
    })
    @IsBoolean()
    readonly hasFlowering: boolean;

    @ApiProperty({
        description: 'Flowering season',
        example: 'N/A',
    })
    @IsString()
    readonly season: string;
}

/**
 * DTO for trimming information
 */
export class TrimmingDto {
    @ApiProperty({
        description: 'Number of times to trim per year',
        example: 2,
    })
    @IsNumber()
    readonly count: number;

    @ApiProperty({
        description: 'Months to trim',
        example: ['Spring', 'Fall'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    readonly months: string[];
}