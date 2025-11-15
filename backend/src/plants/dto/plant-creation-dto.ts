import { IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating a new plant
 */
export class PlantCreationDto {
    @ApiProperty({
        description: 'User chosen name for the plant',
        example: 'My Beautiful Fern',
    })
    @IsString()
    readonly chosenName: string;

    @ApiProperty({
        description: 'User ID who will own this plant',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsString()
    readonly userId: string;

    @ApiProperty({
        description: 'Common name of the plant',
        example: 'Boston Fern',
    })
    @IsString()
    readonly commonName: string;

    @ApiProperty({
        description: 'Scientific name of the plant',
        example: 'Nephrolepis exaltata',
    })
    @IsString()
    readonly scientificName: string;

    @ApiPropertyOptional({
        description: 'Other names for the plant',
        example: 'Sword Fern',
    })
    @IsString()
    @IsOptional()
    readonly otherName?: string;

    @ApiProperty({
        description: 'Plant family',
        example: 'Lomariopsidaceae',
    })
    @IsString()
    readonly family: string;

    @ApiProperty({
        description: 'Type of plant',
        example: 'Fern',
    })
    @IsString()
    readonly type: string;

    @ApiProperty({
        description: 'Plant life cycle',
        example: 'Perennial',
    })
    @IsString()
    readonly cycle: string;

    @ApiProperty({
        description: 'Watering period',
        example: 'Weekly',
    })
    @IsString()
    readonly wateringPeriod: string;

    @ApiProperty({
        description: 'Temperature-based watering info',
        example: 'Moderate',
    })
    @IsString()
    readonly wateringBasedTemperature: string;

    @ApiProperty({
        description: 'Growth rate of the plant',
        example: 'Medium',
    })
    @IsString()
    readonly growthRate: string;

    @ApiProperty({
        description: 'Care level required',
        example: 'Easy',
    })
    @IsString()
    readonly careLevel: string;

    @ApiProperty({
        description: 'Maintenance requirements',
        example: 'Low',
    })
    @IsString()
    readonly maintenance: string;

    @ApiProperty({
        description: 'Type of sunlight',
        example: 'Indirect',
    })
    @IsString()
    readonly sunlightType: string;

    @ApiProperty({
        description: 'Duration of sunlight exposure',
        example: '4-6 hours',
    })
    @IsString()
    readonly sunlightDuration: string;

    @ApiProperty({
        description: 'Whether the plant flowers',
        example: false,
    })
    @IsBoolean()
    readonly floweringHasFlowering: boolean;

    @ApiProperty({
        description: 'Flowering season',
        example: 'N/A',
    })
    @IsString()
    readonly floweringSeason: string;

    @ApiProperty({
        description: 'Number of times to trim per year',
        example: 2,
    })
    @IsNumber()
    readonly trimmingCount: number;

    @ApiProperty({
        description: 'Months to trim',
        example: ['Spring', 'Fall'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    readonly trimmingMonths: string[];

    @ApiPropertyOptional({
        description: 'URL to plant photo',
        example: 'https://example.com/plant.jpg',
    })
    @IsString()
    @IsOptional()
    readonly photoUrl?: string;
}