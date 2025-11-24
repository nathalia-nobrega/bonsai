import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { MissionType } from '../mission.types';
import { ApiProperty } from '@nestjs/swagger';

export class MissionCreationDto {
  @ApiProperty({
    description: "The mission's plant ID",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  idPlant: string;

  @ApiProperty({
    description: 'The ID of the user who owns this mission',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "The mission's title",
    example: 'Water Cassandra',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "The mission's description",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: "The mission's type",
    example: 'water',
  })
  @IsEnum(MissionType)
  type: MissionType;

  @ApiProperty({
    description: "The mission's frequency of activation in hours",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @IsNumber()
  @IsNotEmpty()
  hourlyFrequency: number; // ex: '24h'

  @ApiProperty({
    description: "The mission's points",
    example: '20',
  })
  @IsNumber()
  @Min(0)
  points: number;

  @ApiProperty({
    description: 'Indicates if the mission is currently available',
    example: true,
  })
  isAvailable: boolean;
}
