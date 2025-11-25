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
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@ApiTags('missions')
@Controller('missions')
export class MissionsController {
  constructor(private readonly httpService: HttpService) {}

  //criar
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

  //completar
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

      // Notificar o sistema de jornadas
      try {
        await this.notifyJourneySystemOnCompletion(
          mission.userId,
          mission.id,
          mission.points
        );
      } catch (err) {
        console.error('Failed to notify journey system:', err.message);
      }

      return updatedMission;
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        throw new NotFoundException(`Mission with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  //reativar
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

  //get
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

  //get
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

  //pra quando uma planta for adicionada
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
    console.log('Gerando missões simplificadas para a planta:', plant);

    const missions: MissionCreationDto[] = [];

    // Missão 1 — Água
    missions.push({
      idPlant: plant.id,
      userId: plant.userId,
      title: `Water ${plant.chosenName}`,
      description: `Water your ${plant.commonName} (${plant.scientificName})`,
      type: MissionType.Water,
      hourlyFrequency: 1,
      points: 10,
      isAvailable: true,
    });

    // Missão 2 — Sol
    missions.push({
      idPlant: plant.id,
      userId: plant.userId,
      title: `Give sunlight to ${plant.chosenName}`,
      description: `Place ${plant.chosenName} in sunlight`,
      type: MissionType.Sunlight,
      hourlyFrequency: 3,
      points: 10,
      isAvailable: true,
    });

    // Missão 3 — Poda
    missions.push({
      idPlant: plant.id,
      userId: plant.userId,
      title: `Trim ${plant.chosenName}`,
      description: `Trim your ${plant.commonName}`,
      type: MissionType.Trim,
      hourlyFrequency: 24,
      points: 10,
      isAvailable: true,
    });

    return missions;
  }

  //controle de tempo

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleMissionReactivation() {
    console.log('Checking missions for reactivation...');

    try {
      const missions = await Mission.findAll();
      const now = new Date();
      let reactivatedCount = 0;

      for (const mission of missions) {
        if (!mission.isAvailable && mission.nextAvailableAt) {
          const nextAvailable = new Date(mission.nextAvailableAt);

          if (now >= nextAvailable) {
            await Mission.updatePlant(mission.id, {
              isAvailable: true,
            });

            reactivatedCount++;
            console.log(
              `Mission "${mission.title}" (${mission.id}) reactivated`
            );
          }
        }
      }

      console.log(
        `Mission reactivation check completed. ${reactivatedCount} missions reactivated.`
      );
    } catch (error) {
      console.error('Error during mission reactivation:', error.message);
    }
  }

  //lida com missao
  private async notifyJourneySystemOnCompletion(
    userId: string,
    missionId: string,
    points: number
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(
          `/api/journeys/user/${userId}/mission-completed`,
          {
            missionId,
            points,
          }
        )
      );
      console.log('Journey system notified of mission completion');
    } catch (error) {
      console.error(
        'Failed to notify journey system on mission completion:',
        error.message
      );
      throw error;
    }
  }
}
