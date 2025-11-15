import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for updating plant state
 */
export class PlantStateUpdateDto {
    @ApiProperty({
        description: 'Whether the plant was watered',
        example: true,
    })
    @IsBoolean()
    readonly wasWatered: boolean;

    @ApiProperty({
        description: 'Whether the plant received sunlight',
        example: false,
    })
    @IsBoolean()
    readonly gotSunlight: boolean;

    @ApiProperty({
        description: 'Whether the plant was trimmed',
        example: false,
    })
    @IsBoolean()
    readonly wasTrimmed: boolean;
}
