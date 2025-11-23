import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Mission } from './entities/mission.entity';
import { MissionCreationDto } from './dto/mission-creation-dto';
import { MissionUpdateDto } from './dto/mission-update-dto';
import { PlantResponseDto } from 'src/plants/dto/plant-response-dto';
import { MissionType } from './mission.types';
import { CreateMissionsForPlantRequest } from './dto/mission-creationByPlant-dto';

@ApiTags('missions')
@Controller('missions')
export class MissionsController {
  @Post()
  @ApiOperation({ summary: 'Create a new mission' })
  @ApiResponse({ status: 201, description: 'Mission successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() missionData: MissionCreationDto) {
    try {
      const mission = new Mission(
        missionData.idPlant,
        missionData.userId,
        missionData.title,
        missionData.description,
        missionData.type,
        missionData.hourlyFrequency,
        missionData.points
      );

      if (missionData.isAvailable !== undefined) {
        // @ts-ignore - We know isAvailable exists on the instance
        mission._isAvailable = missionData.isAvailable;
      }

      return await mission.create();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Update a mission
  @Put(':id')
  @ApiOperation({ summary: 'Update a mission' })
  @ApiResponse({ status: 200, description: 'Mission successfully updated.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(@Param('id') id: string, @Body() updateData: MissionUpdateDto) {
    try {
      return await Mission.updatePlant(id, updateData);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Mark a mission as completed' })
  @ApiResponse({ status: 200, description: 'Mission marked as completed.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  async markAsCompleted(@Param('id') id: string) {
    try {
      const now = new Date();

      const mission = await Mission.findById(id);
      if (!mission) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }

      const frequencyHours = mission.hourlyFrequency;
      if (isNaN(frequencyHours)) {
        throw new Error('Invalid frequency format');
      }

      const updatedMission = await Mission.updatePlant(id, {
        lastCompletedAt: now,
        isAvailable: false,
        nextAvailableAt: this.calculateNextAvailableTime(now, frequencyHours),
      });

      return updatedMission;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id/reactivate')
  @ApiOperation({ summary: 'Reactivate a mission' })
  @ApiResponse({ status: 200, description: 'Mission reactivated.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  async reactivate(@Param('id') id: string) {
    try {
      return await Mission.updatePlant(id, {
        isAvailable: true,
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get mission by ID' })
  @ApiResponse({ status: 200, description: 'Mission found.' })
  @ApiResponse({ status: 404, description: 'Mission not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await Mission.findById(id);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all active missions of a user' })
  @ApiResponse({ status: 200, description: 'List of all user missions.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findAll(@Param('userId') userId: string) {
    try {
      const missions = await Mission.findAll();
      const userMissions = missions.filter(
        (mission) => mission.userId === userId
      );

      const availableMissions = userMissions.filter(
        (mission) => mission.isAvailable === true
      );

      return availableMissions;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('plant/:plantId')
  @ApiOperation({ summary: 'Create missions for a specific plant' })
  @ApiResponse({
    status: 201,
    description: 'Missions created successfully',
    type: [Mission],
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 404, description: 'Plant not found' })
  async createMissionsForPlant(
    @Param('plantId') plantId: string,
    @Body() body: CreateMissionsForPlantRequest
  ) {
    try {
      console.log('Received request to create missions for plant:', {
        plantId,
        requestBody: body,
        plantFromBody: body.plant,
        plantIdFromBody: body.plant?.id,
        plantIdsMatch: body.plant?.id === plantId,
      });

      console.log('=== DEBUG: Received request ===');
      console.log('Plant ID from param:', plantId);
      console.log('Body received:', JSON.stringify(body, null, 2));
      console.log('Plant from body:', body.plant);
      console.log('Plant ID from body:', body.plant?.id);

      const plant = body.plant;

      if (!plant || plant.id !== plantId) {
        throw new BadRequestException('Invalid plant data provided');
      }

      const missionDTOs = this.planMissionsForPlant(plant);
      const missions: MissionCreationDto[] = [];

      for (const missionDTO of missionDTOs) {
        const mission = new Mission(
          missionDTO.idPlant,
          missionDTO.userId,
          missionDTO.title,
          missionDTO.description,
          missionDTO.type,
          missionDTO.hourlyFrequency,
          missionDTO.points || 10
        );

        if (missionDTO.isAvailable !== undefined) {
          // @ts-ignore
          mission._isAvailable = missionDTO.isAvailable;
        }

        const createdMission = await mission.create();
        missions.push(createdMission);
      }

      return missions; // Swagger agora entende que é um array de Mission
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          throw new NotFoundException(`Plant with ID ${plantId} not found`);
        }
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Failed to create missions for plant');
    }
  }

  //helpers
  private calculateNextAvailableTime(
    currentTime: Date,
    hoursToAdd: number
  ): Date {
    const nextTime = new Date(currentTime);
    nextTime.setHours(nextTime.getHours() + hoursToAdd);
    return nextTime;
  }

  private planMissionsForPlant(plant: PlantResponseDto): MissionCreationDto[] {
    console.log('chegou a ser chamaod');
    const missions: MissionCreationDto[] = [];
    const now = new Date();

    console.log('planta recebida pra missao: ', plant);

    const seasonToMonthMap: Record<string, string> = {
      Spring: '3',
      Summer: '6',
      Fall: '9',
      Winter: '12',
    };

    if (plant.trimmingMonths && Array.isArray(plant.trimmingMonths)) {
      plant.trimmingMonths = plant.trimmingMonths.map((m) => {
        if (seasonToMonthMap[m]) return seasonToMonthMap[m];
        if (!isNaN(+m)) return m;
        return m;
      });
    }

    if (plant.wateringPeriod) {
      const wateringMap = {
        daily: 24,
        weekly: 168,
        biweekly: 336,
        monthly: 720,
      };

      const wateringPeriod = plant.wateringPeriod.toLowerCase();
      const hourlyFrequency = wateringMap[wateringPeriod];

      if (hourlyFrequency) {
        missions.push({
          idPlant: plant.id,
          userId: plant.userId,
          title: `Water ${plant.chosenName}`,
          description: `Water your ${plant.commonName} (${plant.scientificName})`,
          type: MissionType.Water,
          hourlyFrequency: hourlyFrequency,
          points: 10,
          isAvailable: true,
        });
      }
    }

    if (plant.sunlightDuration) {
      missions.push({
        idPlant: plant.id,
        userId: plant.userId,
        title: `Sunlight for ${plant.chosenName}`,
        description: `Expose ${plant.chosenName} to sunlight for ${plant.sunlightDuration}`,
        type: MissionType.Sunlight,
        hourlyFrequency: 14,
        points: 5,
        isAvailable: true,
      });
    }

    if (plant.trimmingCount > 0 && plant.trimmingMonths?.length > 0) {
      const currentMonth = (now.getMonth() + 1).toString();
      const shouldBeAvailable = plant.trimmingMonths.includes(currentMonth);

      missions.push({
        idPlant: plant.id,
        userId: plant.userId,
        title: `Trim ${plant.chosenName}`,
        description: `Trim your ${plant.commonName} (${plant.scientificName})`,
        type: MissionType.Trim,
        hourlyFrequency: 720, // 24 * 30
        points: 15,
        isAvailable: shouldBeAvailable,
      });
    }

    return missions;
  }
}
