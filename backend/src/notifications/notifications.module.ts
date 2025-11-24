import { Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsController } from './notifications.controller';
import { Notification } from './entities/notification.entity';
import { LowdbService } from '../database/lowdb.service';

@Module({
    imports: [
        ScheduleModule.forRoot(),
    ],
    providers: [LowdbService],
    controllers: [NotificationsController],
})
export class NotificationsModule implements OnModuleInit {
    constructor(private readonly db: LowdbService) { }

    onModuleInit() {
        Notification.injectDb(this.db);
    }
}
