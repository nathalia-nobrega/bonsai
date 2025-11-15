import { Module, OnModuleInit } from '@nestjs/common';
import { LowdbModule } from '../database/lowdb.module';
import { LowdbService } from '../database/lowdb.service';
import { PlantsController } from './plants.controller';
import { Plant } from './entities/plant.entity';

/**
 * Plants module for managing plant entities
 * Follows MPS architecture with controller and entity only (no service layer)
 */
@Module({
    imports: [LowdbModule],
    controllers: [PlantsController],
    providers: [],
})
export class PlantsModule implements OnModuleInit {
    constructor(private readonly db: LowdbService) { }

    onModuleInit() {
        Plant.injectDb(this.db);
    }
}