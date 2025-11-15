import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  @ApiProperty({
    description: 'Unique user ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @Expose()
  @ApiProperty({
    description: "The user's creation date",
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: "The users's e-mail",
    example: 'concorde@will.fly',
  })
  @Expose()
  email: string;

  @Expose()
  @ApiProperty({
    description: "The user's name",
    example: 'SIX SEVEN',
  })
  @Expose()
  name: string;

  @Expose()
  @ApiProperty({
    description: "The URL containing the user's profile picture",
    example:
      'https://i.pinimg.com/736x/83/c2/fb/83c2fb4e80e001c8000e8c8b6d4323c5.jpg',
  })
  @Expose()
  photoUrl: string;

  @Expose()
  @ApiProperty({
    description: "The user's current level",
    example: 10,
  })
  @Expose()
  level: number;

  @ApiProperty({
    description: "The user's gained points",
    example: 100,
  })
  @Expose()
  pointsGained: number;
}
