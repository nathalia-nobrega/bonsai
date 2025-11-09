import { ApiProperty } from "@nestjs/swagger"
import type { User } from "../entities/user.entity"
import { Expose } from "class-transformer"
import { IsString, IsEmail, MinLength, IsNotEmpty, IsUrl } from 'class-validator';

@Expose()
export class UserCreationDto {

    @ApiProperty({
        description: 'The users\'s e-mail',
        example: 'concorde@will.fly',
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The users\'s password',
        example: '123456',
    })
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'The users\'s name',
        example: 'EIGHT NINE',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
   
    @ApiProperty({
        description: 'The URL containing the user\'s profile picture',
        example: 'https://i.pinimg.com/736x/83/c2/fb/83c2fb4e80e001c8000e8c8b6d4323c5.jpg',
    })
    @IsString()
    @IsUrl()
    photoUrl: string;

    @ApiProperty({
        description: 'Number of points the user has gained',
        example: 67,
    })
    points: number;

    @ApiProperty({
        description: 'The user\'s current level',
        example: 10,
    })
    level: number;
}