import { Expose, Type, Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for plant response
 */
export class PlantResponseDto {
    @ApiProperty({
        description: 'Plant unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @Expose()
    readonly id: string;

    @ApiProperty({
        description: 'User chosen name for the plant',
        example: 'My Beautiful Fern',
    })
    @Expose()
    readonly chosenName: string;

    @ApiProperty({
        description: 'User ID who owns this plant',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @Expose()
    readonly userId: string;

    @ApiProperty({
        description: 'Common name of the plant',
        example: 'Boston Fern',
    })
    @Expose()
    readonly commonName: string;

    @ApiProperty({
        description: 'Scientific name of the plant',
        example: 'Nephrolepis exaltata',
    })
    @Expose()
    readonly scientificName: string;

    @ApiPropertyOptional({
        description: 'Other names for the plant',
        example: 'Sword Fern',
    })
    @Expose()
    readonly otherName?: string;

    @ApiProperty({
        description: 'Plant family',
        example: 'Lomariopsidaceae',
    })
    @Expose()
    readonly family: string;

    @ApiProperty({
        description: 'Type of plant',
        example: 'Fern',
    })
    @Expose()
    readonly type: string;

    @ApiProperty({
        description: 'Plant life cycle',
        example: 'Perennial',
    })
    @Expose()
    readonly cycle: string;

    @ApiProperty({
        description: 'Watering period',
        example: 'Weekly',
    })
    @Expose()
    readonly wateringPeriod: string;

    @ApiProperty({
        description: 'Temperature-based watering info',
        example: 'Moderate',
    })
    @Expose()
    readonly wateringBasedTemperature: string;

    @ApiProperty({
        description: 'Growth rate of the plant',
        example: 'Medium',
    })
    @Expose()
    readonly growthRate: string;

    @ApiProperty({
        description: 'Care level required',
        example: 'Easy',
    })
    @Expose()
    readonly careLevel: string;

    @ApiProperty({
        description: 'Maintenance requirements',
        example: 'Low',
    })
    @Expose()
    readonly maintenance: string;

    @ApiProperty({
        description: 'Type of sunlight',
        example: 'Indirect',
    })
    @Expose()
    readonly sunlightType: string;

    @ApiProperty({
        description: 'Duration of sunlight exposure',
        example: '4-6 hours',
    })
    @Expose()
    readonly sunlightDuration: string;

    @ApiProperty({
        description: 'Whether the plant flowers',
        example: false,
    })
    @Expose()
    readonly floweringHasFlowering: boolean;

    @ApiProperty({
        description: 'Flowering season',
        example: 'N/A',
    })
    @Expose()
    readonly floweringSeason: string;

    @ApiProperty({
        description: 'Number of times to trim per year',
        example: 2,
    })
    @Expose()
    readonly trimmingCount: number;

    @ApiProperty({
        description: 'Months to trim',
        example: ['Spring', 'Fall'],
        type: [String],
    })
    @Expose()
    readonly trimmingMonths: string[];

    @ApiPropertyOptional({
        description: 'URL to plant photo',
        example: 'https://example.com/plant.jpg',
    })
    @Expose()
    readonly photoUrl?: string;

    @ApiProperty({
        description: 'Whether the plant was watered',
        example: false,
    })
    @Expose()
    @Transform(({ obj }) => obj.wasWatered ?? false)
    readonly wasWatered: boolean;

    @ApiProperty({
        description: 'Whether the plant got sunlight',
        example: true,
    })
    @Expose()
    @Transform(({ obj }) => obj.gotSunlight ?? false)
    readonly gotSunlight: boolean;

    @ApiProperty({
        description: 'Whether the plant was trimmed',
        example: false,
    })
    @Expose()
    @Transform(({ obj }) => obj.wasTrimmed ?? false)
    readonly wasTrimmed: boolean;

    @ApiProperty({
        description: 'When the plant was created',
        example: '2023-01-15T10:30:00Z',
    })
    @Expose()
    readonly createdAt: Date;
}