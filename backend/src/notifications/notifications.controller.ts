import { Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { Notification } from './entities/notification.entity';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiOkResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse
} from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LowdbService } from '../database/lowdb.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {

    private readonly logger = new Logger(NotificationsController.name);

    constructor(private readonly db: LowdbService) {
        Notification.injectDb(db);
    }

    @Cron(CronExpression.EVERY_DAY_AT_7AM, {
        timeZone: 'America/Manaus'
    })
    async handleDailyNotifications() {
        this.logger.log('Running daily notifications job...');
        try {
            const users = this.db.data.users || [];
            for (const user of users) {
                try {
                    // Get user's available missions
                    const availableMissions = this.db.data.missions?.filter(
                        mission => mission.userId === user.id && mission.isAvailable
                    ) || [];

                    if (availableMissions.length > 0) {
                        await Notification.createIncompleteMissionsNotification(
                            user.id,
                            availableMissions.length
                        );
                        this.logger.log(`Sent notification to user ${user.id} about ${availableMissions.length} missions`);
                    }
                } catch (error) {
                    this.logger.error(`Error processing notifications for user ${user.id}:`, error);
                }
            }
        } catch (error) {
            this.logger.error('Error in daily notifications job:', error);
        }
    }

    @Get('user/:userId')
    @ApiOperation({
        summary: 'Get user notifications',
        description: 'Retrieves all notifications for a specific user'
    })
    @ApiParam({
        name: 'userId',
        required: true,
        description: 'The ID of the user to fetch notifications for',
        type: String
    })
    @ApiOkResponse({
        description: 'Successfully retrieved user notifications',
        type: [NotificationResponseDto]
    })
    @ApiNotFoundResponse({
        description: 'User not found or no notifications available'
    })
    @ApiBadRequestResponse({
        description: 'Invalid user ID format'
    })
    async getUserNotifications(
        @Param('userId') userId: string,
    ): Promise<NotificationResponseDto[]> {
        const notifications = await Notification.findByUserId(userId);
        return plainToInstance(NotificationResponseDto, notifications, {
            excludeExtraneousValues: true,
        });
    }

    @Put('read-all/:userId')
    @ApiOperation({
        summary: 'Mark all notifications as read',
        description: 'Marks all notifications as read for a specific user'
    })
    @ApiParam({
        name: 'userId',
        required: true,
        description: 'The ID of the user whose notifications should be marked as read',
        type: String
    })
    @ApiOkResponse({
        description: 'Successfully marked all notifications as read',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true }
            }
        }
    })
    @ApiNotFoundResponse({
        description: 'User not found'
    })
    @ApiBadRequestResponse({
        description: 'Invalid user ID format'
    })
    async markAllAsRead(
        @Param('userId') userId: string
    ): Promise<{ success: boolean }> {
        await Notification.markAllAsRead(userId);
        return { success: true };
    }
}
