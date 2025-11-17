import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose() // exposes every field unless marked with @Exclude()
export class JourneyResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Unique journey ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'The journey creation date',
    example: '2024-01-15T10:30:00Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'The journey name',
    example: 'First Sprout',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'A short explanation of the mission',
    example: 'Adicionar uma nova planta no seu jardim.',
  })
  description: string;

  @Expose()
  @ApiProperty({
    description: 'Points already earned by the user during this journey',
    example: 10,
  })
  pointsEarned: number;

  @Expose()
  @ApiProperty({
    description: 'Total points required to complete this journey',
    example: 50,
  })
  finalPoints: number;

  @Expose()
  @ApiProperty({
    description: 'Number of activities already completed',
    example: 1,
  })
  activitiesCompleted: number;

  @Expose()
  @ApiProperty({
    description: 'Total number of activities for this journey',
    example: 3,
  })
  activitiesFinal: number;

  @Expose()
  @ApiProperty({
    description: 'Number of plants in this journey',
    example: 3,
  })
  plantCount: number;

  @Expose()
  @ApiProperty({
    description: 'Order of the journey (for sorting)',
    example: 1,
  })
  order: number;

  @Expose()
  @ApiProperty({
    description: 'IDs of the plants associated with this journey',
    example: ['d290f1ee-6c54-4b01-90e6-d701748f0851', 'f1c2b3d4-1122-3344-5566-abcdef987654'],
    isArray: true,
  })
  relatedPlants: string[];

  @Expose()
  @ApiProperty({
    description: 'Status of the journey',
    enum: ['finished', 'active', 'locked'],
    example: 'active',
  })
  status: 'finished' | 'active' | 'locked';

  @Expose()
  @ApiProperty({
    description: 'Journey type',
    enum: ['garden', 'activities'],
    example: 'activities',
  })
  type: 'garden' | 'activities';
}
