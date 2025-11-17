import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ArrayNotEmpty,
  IsUUID,
  MinLength,
  IsEnum,
  IsBoolean,
} from 'class-validator';

@Expose()
export class JourneyCreationDto {
  @ApiProperty({
    description: 'The user ID who owns this journey',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'The journey name',
    example: 'First Sprout',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A short explanation of the mission',
    example: 'Adicionar uma nova planta no seu jardim.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Points already earned by the user',
    example: 0,
  })
  @IsNumber()
  pointsEarned: number;

  @ApiProperty({
    description: 'Total points needed to complete the journey',
    example: 50,
  })
  @IsNumber()
  @IsNotEmpty()
  finalPoints: number;

  @ApiProperty({
    description: 'Amount of activities already completed',
    example: 0,
  })
  @IsNumber()
  activitiesCompleted: number;

  @ApiProperty({
    description: 'Total number of activities in this journey',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  activitiesFinal: number;

  @ApiProperty({
    description: 'Number of plants in this journey',
    example: 3,
  })
  @IsNumber()
  plantCount: number;

  @ApiProperty({
    description: 'Order of the journey (for sorting)',
    example: 1,
  })
  @IsNumber()
  order: number;

  @ApiProperty({
    description: 'IDs of the plants related to this mission',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  relatedPlants: string[];

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
    example: 'activities',
  })
  @IsString()
  @IsEnum(['garden', 'activities'])
  type: 'garden' | 'activities';
}
