import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
<<<<<<< HEAD
import { PlantsModule } from './plants/plants.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule, PlantsModule],
=======
import { JourneysModule } from './journeys/journeys.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule, JourneysModule],
>>>>>>> 40527f2 (jornadas)
})
export class AppModule { }
