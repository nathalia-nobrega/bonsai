import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

@Expose()
export class UserCreationDto {
  @ApiProperty({
    description: "The users's e-mail",
    example: 'concorde@will.fly',
  })
  @IsString()
  @IsEmail({}, { message: 'Invalid e-mail' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "The users's password",
    example: '123456',
  })
  @MinLength(6, { message: 'Your password must have at least 6 characters' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: "The users's name",
    example: 'EIGHT NINE',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "The URL containing the user's profile picture",
    example:
      'https://i.pinimg.com/736x/83/c2/fb/83c2fb4e80e001c8000e8c8b6d4323c5.jpg',
  })
  @IsString()
  @IsUrl()
  photoUrl: string;

  @ApiProperty({
    description: 'Number of points the user has gained',
    example: 67,
  })
  @IsNumber()
  @IsOptional()
  pointsGained: number;

  @ApiProperty({
    description: "The user's current level",
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  level: number;
}
