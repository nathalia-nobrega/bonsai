import { ApiProperty } from '@nestjs/swagger';
import { PlantResponseDto } from 'src/plants/dto/plant-response-dto';

export class CreateMissionsForPlantRequest {
  @ApiProperty({ type: PlantResponseDto })
  plant: PlantResponseDto;
}
