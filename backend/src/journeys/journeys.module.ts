import { Module, OnModuleInit } from '@nestjs/common';
import { JourneyController } from './journeys.controller';
import { LowdbService } from 'src/database/lowdb.service';
import { Journey } from './entities/journey.entity';

@Module({
  controllers: [JourneyController],
  providers: [LowdbService],
})
export class JourneysModule implements OnModuleInit {
  constructor(private readonly db: LowdbService) {}

  async onModuleInit() {
    await this.db.start();

    Journey.injectDb(this.db);

    console.log('Journey DB injected:', this.db.data.journeys.length);
  }
}
