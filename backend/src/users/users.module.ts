import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { LowdbModule } from 'src/database/lowdb.module';

@Module({
  imports: [LowdbModule],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
