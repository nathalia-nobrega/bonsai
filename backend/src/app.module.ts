import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

/* Each new module must be added here */
@Module({
  imports: [UsersModule],
})
export class AppModule {}
