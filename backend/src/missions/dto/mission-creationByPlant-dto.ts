import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';
import { PlantResponseDto } from 'src/plants/dto/plant-response-dto';

export class CreateMissionsForPlantRequest {
  @ApiProperty({ type: PlantResponseDto })
  @IsNotEmpty()
  @IsObject()
  plant: PlantResponseDto;
}
