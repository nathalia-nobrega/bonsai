import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';
import { JourneysModule } from './journeys/journeys.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule, PlantsModule, JourneysModule],
})
export class AppModule {}
