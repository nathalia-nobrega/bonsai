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
  wasWatered: boolean;

  @ApiProperty({
    description: 'Whether the plant received sunlight',
    example: false,
  })
  @IsBoolean()
  gotSunlight: boolean;

  @ApiProperty({
    description: 'Whether the plant was trimmed',
    example: false,
  })
  @IsBoolean()
  wasTrimmed: boolean;
}
