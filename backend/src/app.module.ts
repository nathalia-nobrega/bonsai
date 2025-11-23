import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { JourneysModule } from './journeys/journeys.module';
import { MissionModule } from './missions/missions.module';
import { LowdbModule } from './database/lowdb.module';

/* Each new module must be added here */
@Module({
  imports: [
    LowdbModule,
    UsersModule,
    PlantsModule,
    JourneysModule,
    MissionModule,
  ],
})
export class AppModule {}
