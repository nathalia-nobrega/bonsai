import { ApiProperty } from "@nestjs/swagger"
import type { User } from "../entities/user.entity"
import { Expose } from "class-transformer"

@Expose() // exposes every field unless marked with @Exclude()
export class UserResponseDto {
    @ApiProperty({
        description: 'Unique user ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string

    @ApiProperty({
        description: 'The user\'s creation date',
        example: '2024-01-15T10:30:00Z',
    })
    createdAt: Date

    @ApiProperty({
        description: 'The users\'s e-mail',
        example: 'concorde@will.fly',
    })
    email: string

    @ApiProperty({
        description: 'The user\'s name',
        example: 'SIX SEVEN',
    })
    name: string

    @ApiProperty({
        description: 'The URL containing the user\'s profile picture',
        example: 'https://i.pinimg.com/736x/83/c2/fb/83c2fb4e80e001c8000e8c8b6d4323c5.jpg',
    })
    photoUrl: string

    @ApiProperty({
        description: 'Number of points the user has gained',
        example: 67,
    })
    pointsGained: Number

    @ApiProperty({
        description: 'The user\'s current level',
        example: 10,
    })
    level: Number
}