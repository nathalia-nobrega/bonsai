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

export class UserUpdateDto {
  //Por agora, só foto e nome pra testar o negócio!

  @ApiProperty({
    description: "The users's name",
    example: 'EIGHT NINE',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "The URL containing the user's profile picture",
    example:
      'https://i.pinimg.com/736x/83/c2/fb/83c2fb4e80e001c8000e8c8b6d4323c5.jpg',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty({
    description: "The user's point",
    example: 1,
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  pointsGained?: number;

  @ApiProperty({
    description: "The user's level",
    example: 1,
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  level?: number;
}
