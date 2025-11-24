import { Module } from '@nestjs/common';
import { LowdbModule } from './database/lowdb.module';
import { JourneysModule } from './journeys/journeys.module';
import { MissionModule } from './missions/missions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlantsModule } from './plants/plants.module';
import { UsersModule } from './users/users.module';

/* Each new module must be added here */
@Module({
  imports: [
    LowdbModule,
    UsersModule,
    PlantsModule,
    JourneysModule,
    MissionModule,
    NotificationsModule
  ],
})
export class AppModule { }
