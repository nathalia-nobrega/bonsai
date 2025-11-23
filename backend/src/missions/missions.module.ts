import { Module, OnModuleInit } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { LowdbModule } from 'src/database/lowdb.module';
import { LowdbService } from 'src/database/lowdb.service';
import { Mission } from './entities/mission.entity';
import { JourneysModule } from '../journeys/journeys.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JourneysModule,
    ScheduleModule.forRoot(),
    HttpModule.register({
      baseURL: 'http://localhost:3000',
    }),
  ],
  controllers: [MissionsController],
})
export class MissionModule implements OnModuleInit {
  constructor(private readonly db: LowdbService) {}

  onModuleInit() {
    Mission.injectDb(this.db);
  }
}
