import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ArrayNotEmpty,
  IsEnum,
  IsBoolean,
} from 'class-validator';

@Expose()
export class JourneyUpdateDto {
  @ApiProperty({
    description: 'The journey name',
    example: 'First Sprout',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'A short explanation of the mission',
    example: 'Adicionar uma nova planta no seu jardim.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Points already earned during the journey',
    example: 15,
  })
  @IsNumber()
  @IsOptional()
  pointsEarned?: number;

  @ApiProperty({
    description: 'Total points required to complete the journey',
    example: 60,
  })
  @IsNumber()
  @IsOptional()
  finalPoints?: number;

  @ApiProperty({
    description: 'Number of completed activities',
    example: 2,
  })
  @IsNumber()
  @IsOptional()
  activitiesCompleted?: number;

  @ApiProperty({
    description: 'Total number of activities in this journey',
    example: 6,
  })
  @IsNumber()
  @IsOptional()
  activitiesFinal?: number;

  @ApiProperty({
    description: 'Number of plants in this journey',
    example: 3,
  })
  @IsNumber()
  @IsOptional()
  plantCount?: number;

  @ApiProperty({
    description: 'Order of the journey (for sorting)',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  order?: number;

  @ApiProperty({
    description: 'IDs of the plants associated with this journey',
    example: [
      'd290f1ee-6c54-4b01-90e6-d701748f0851',
      'f1c2b3d4-1122-3344-5566-abcdef987654',
    ],
    isArray: true,
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  relatedPlants?: string[];

  @ApiProperty({
    description: 'Status of the journey',
    enum: ['finished', 'active', 'locked'],
    example: 'locked',
  })
  @IsEnum(['finished', 'active', 'locked'])
  @IsOptional()
  status?: 'finished' | 'active' | 'locked';

  @ApiProperty({
    description: 'Journey type',
    enum: ['garden', 'activities'],
    example: 'garden',
  })
  @IsString()
  @IsOptional()
  @IsEnum(['garden', 'activities'])
  type?: 'garden' | 'activities';
}
