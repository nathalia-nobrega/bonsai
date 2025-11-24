// src/users/dto/user-login-dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object for user login.
 * Used to validate and document the login request payload.
 */
export class UserLoginDto {
    @ApiProperty({
        description: "The user's email address",
        example: 'user@example.com',
        required: true,
        type: String,
        format: 'email',
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({
        description: "The user's password",
        example: 'securePassword123',
        required: true,
        type: String,
        minLength: 6,
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}