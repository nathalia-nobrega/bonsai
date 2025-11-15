import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for plant summary in list view
 */
@Exclude()
export class PlantSummaryDto {
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
        description: 'Common name of the plant',
        example: 'Boston Fern',
    })
    @Expose()
    readonly commonName: string;

    @ApiProperty({
        description: 'Type of plant',
        example: 'Fern',
    })
    @Expose()
    readonly type: string;

    @ApiProperty({
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
    readonly wasWatered: boolean;

    @ApiProperty({
        description: 'Whether the plant got sunlight',
        example: true,
    })
    @Expose()
    readonly gotSunlight: boolean;

    @ApiProperty({
        description: 'Whether the plant was trimmed',
        example: false,
    })
    @Expose()
    readonly wasTrimmed: boolean;
}
