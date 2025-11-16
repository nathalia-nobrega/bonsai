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
  @IsOptional()
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
  @IsOptional()
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
    description: 'IDs of the plants related to this mission',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851'],
    isArray: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  relatedPlants: string[];
}
