import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PlantsModule } from './plants/plants.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule, PlantsModule],
})
export class AppModule { }
