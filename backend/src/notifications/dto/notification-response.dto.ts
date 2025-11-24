import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NotificationResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the notification',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @Expose()
    id: string;

    @ApiProperty({
        description: 'The ID of the user who owns this notification',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @Expose()
    userId: string;

    @ApiProperty({
        description: 'The notification message content',
        example: 'You have 3 incomplete missions',
    })
    @Expose()
    message: string;

    @ApiProperty({
        description: 'Indicates whether the notification has been read',
        example: false,
    })
    @Expose()
    read: boolean;

    @ApiProperty({
        description: 'The date and time when the notification was created',
        example: '2023-01-01T12:00:00.000Z',
    })
    @Expose()
    createdAt: Date;
}
