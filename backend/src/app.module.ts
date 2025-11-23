import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { JourneysModule } from './journeys/journeys.module';
import { MissionModule } from './missions/missions.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule, PlantsModule, JourneysModule, MissionModule],
})
export class AppModule {}
