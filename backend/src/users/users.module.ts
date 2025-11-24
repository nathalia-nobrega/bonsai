import { Module, OnModuleInit } from '@nestjs/common';
import { UserController } from './users.controller';
import { LowdbModule } from 'src/database/lowdb.module';
import { LowdbService } from 'src/database/lowdb.service';
import { User } from './entities/user.entity';
import { JourneysModule } from '../journeys/journeys.module';

@Module({
  controllers: [UserController],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly db: LowdbService) {}

  onModuleInit() {
    User.injectDb(this.db);
  }
}
