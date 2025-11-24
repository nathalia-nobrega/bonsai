import { Module, OnModuleInit } from '@nestjs/common';
import { LowdbModule } from '../database/lowdb.module';
import { LowdbService } from '../database/lowdb.service';
import { PlantsController } from './plants.controller';
import { Plant } from './entities/plant.entity';
import { HttpModule } from '@nestjs/axios';
import { JourneysModule } from 'src/journeys/journeys.module';
import { MissionModule } from 'src/missions/missions.module';

/**
 * Plants module for managing plant entities
 * Follows MPS architecture with controller and entity only (no service layer)
 */
@Module({
  imports: [
    JourneysModule,
    MissionModule,
    HttpModule.register({
      baseURL: 'http://localhost:3000',
    }),
  ],
  controllers: [PlantsController],
})
export class PlantsModule implements OnModuleInit {
  constructor(private readonly db: LowdbService) {}

  onModuleInit() {
    Plant.injectDb(this.db);
  }
}
