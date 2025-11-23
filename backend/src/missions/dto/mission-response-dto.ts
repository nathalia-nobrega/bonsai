import { Expose, Transform } from 'class-transformer';
import { MissionType } from '../mission.types';
import { ApiProperty } from '@nestjs/swagger';

export class MissionResponseDto {
  @ApiProperty({
    description: "The mission's unique ID",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: "The mission's plant's unique ID",
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  idPlant: string;

  @ApiProperty({
    description: 'The ID of the user who owns this mission',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: "The mission's title",
    example: 'Water Cassandra',
  })
  @Expose()
  title: string;

  @ApiProperty({
    description: "The mission's description",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: "The mission's type",
    example: 'water',
  })
  @Expose()
  type: MissionType;

  @ApiProperty({
    description: "The mission's frequency of activation in hours",
    example: 'Aloe Vera needs to be watered daily!',
  })
  @Expose()
  hourlyFrequency: number;

  @ApiProperty({
    description: "The mission's points",
    example: '20',
  })
  @Expose()
  points: number;

  @ApiProperty({
    description: "The mission's last update date",
    example: '2024-01-15T10:30:00.000Z',
  })
  @Expose()
  lastCompletedAt: string | null;

  @ApiProperty({
    description: "The mission's next activation date",
    example: '2024-01-16T10:30:00.000Z',
  })
  @Expose()
  nextAvailableAt: string;

  @ApiProperty({
    description: "The mission's status of availability",
    example: '20',
  })
  @Expose()
  isAvailable: boolean;
}
