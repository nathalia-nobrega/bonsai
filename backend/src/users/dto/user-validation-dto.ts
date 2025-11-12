import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserValidationDto {
  @ApiProperty({
    description: "The users's e-mail",
    example: 'concorde@will.fly',
  })
  @IsEmail({}, { message: 'Invalid e-mail!' })
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Your password must have at least 6 characters' })
  password: string;
}
