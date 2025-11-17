import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { Plant } from './entities/plant.entity';
import { PlantCreationDto } from './dto/plant-creation-dto';
import { PlantResponseDto } from './dto/plant-response-dto';
import { PlantStateUpdateDto } from './dto/plant-state-update-dto';
import { PlantSummaryDto } from './dto/plant-summary-dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * Plants controller following MPS architecture
 * Handles HTTP requests and delegates business logic to Plant entity
 */
@ApiTags('plants')
@Controller('plants')
export class PlantsController {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Get all plants for a user (summary view)
   * @param userId - User ID
   * @returns Array of plant summaries
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all plants for a user (summary)' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Plants retrieved successfully',
    type: [PlantSummaryDto],
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  findAllByUser(@Param('userId') userId: string): PlantSummaryDto[] {
    return Plant.findAllByUser(userId);
  }

  /**
   * Create a new plant
   * @param dto Plant creation data
   * @returns Created plant with ID and message
   */
  @Post()
  @ApiOperation({ summary: 'Create a new plant' })
  @ApiResponse({
    status: 201,
    description: 'Plant created successfully',
    type: PlantResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data' })
  async create(@Body() dto: PlantCreationDto): Promise<PlantResponseDto> {
    const createdPlant = Plant.create(dto);
    try {
      await this.notifyJourneySystem(dto.userId, createdPlant.id);
    } catch (err) {
      console.error('Failed to notify journey system:', err.message);
    }

    return createdPlant;
  }

  private async notifyJourneySystem(
    userId: string,
    plantId: string
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(`/api/journeys/user/${userId}/plant-added`, {
          plantId,
        })
      );
      console.log('Journey system notified successfully');
    } catch (error) {
      console.error('Failed to notify journey system:', error.message);
      throw error;
    }
  }

  /**
   * Get plant by ID
   * @param id Plant ID
   * @returns Plant data
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get plant by ID' })
  @ApiResponse({
    status: 200,
    description: 'Plant found',
    type: PlantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  findById(@Param('id') id: string): PlantResponseDto {
    return Plant.findById(id);
  }

  /**
   * Update plant state
   * @param id Plant ID
   * @param dto Plant state update data
   * @returns Updated plant data
   */
  @Put(':id/state')
  @ApiOperation({ summary: 'Update plant state' })
  @ApiResponse({
    status: 200,
    description: 'Plant state updated',
    type: PlantResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  @ApiResponse({ status: 400, description: 'Bad request - invalid state data' })
  updateState(
    @Param('id') id: string,
    @Body() dto: PlantStateUpdateDto
  ): PlantResponseDto {
    return Plant.updateState(id, dto);
  }

  /**
   * Delete plant
   * @param id Plant ID
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete plant' })
  @ApiResponse({ status: 204, description: 'Plant deleted successfully' })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  delete(@Param('id') id: string): void {
    Plant.delete(id);
  }
}
