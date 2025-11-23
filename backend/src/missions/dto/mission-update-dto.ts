import { PartialType } from '@nestjs/mapped-types';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { MissionType } from '../mission.types';
import { MissionCreationDto } from './mission-creation-dto';
import { ApiProperty } from '@nestjs/swagger';

export class MissionUpdateDto extends PartialType(MissionCreationDto) {
  @ApiProperty({
    description: "The mission's plant's unique ID",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsOptional()
  @IsUUID()
  idPlant?: string;

  @ApiProperty({
    description: 'The ID of the user who owns this mission',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({
    description: "The mission's title",
    example: 'Water Cassandra',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: "The mission's description",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "The mission's type",
    example: 'water',
  })
  @IsOptional()
  @IsEnum(MissionType)
  type?: MissionType;

  @ApiProperty({
    description: "The mission's frequency of activation in hours",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @IsOptional()
  @IsNumber()
  hourlyFrequency?: number;

  @ApiProperty({
    description: "The mission's points",
    example: '20',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  points?: number;

  @ApiProperty({
    description: "The mission's last update date",
    example: '20',
  })
  @IsOptional()
  lastCompletedAt?: Date;

  @ApiProperty({
    description: "The mission's next activation date",
    example: '20',
  })
  @IsOptional()
  nextAvailableAt?: Date;

  @ApiProperty({
    description: 'Indicates if the mission is currently available',
    example: true,
  })
  @IsOptional()
  isAvailable: boolean;
}
