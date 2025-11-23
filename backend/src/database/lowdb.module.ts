import { Global, Module } from '@nestjs/common';
import { LowdbService } from './lowdb.service';

@Global()
@Module({
  providers: [LowdbService],
  exports: [LowdbService],
})
export class LowdbModule {}
