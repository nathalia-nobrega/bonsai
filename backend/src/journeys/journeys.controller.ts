import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Journey } from './entities/journey.entity';
import { JourneyCreationDto } from './dto/journey-creation-dto';
import { JourneyResponseDto } from './dto/journey-response-dto';
import { JourneyUpdateDto } from './dto/journey-update-dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@ApiTags('journeys')
@Controller('journeys')
export class JourneyController {
  constructor(private readonly httpService: HttpService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found journey',
    type: JourneyResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Journey not found',
  })
  @ApiOperation({ summary: 'Get a journey by ID' })
  findJourneyById(@Param('id') id: string): Promise<JourneyResponseDto> {
    return Journey.findById(id);
  }

  @Get('user/:userId')
  @ApiResponse({
    status: 200,
    description: 'All journeys from a user',
    type: [JourneyResponseDto],
  })
  @ApiOperation({ summary: 'Get all journeys for a user' })
  getJourneysByUser(
    @Param('userId') userId: string
  ): Promise<JourneyResponseDto[]> {
    return Journey.findByUserId(userId);
  }

  @Get('user/:userId/active')
  @ApiResponse({
    status: 200,
    description: 'Active journey for user',
    type: JourneyResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'No active journey found',
  })
  @ApiOperation({ summary: 'Get the active journey for a user' })
  async getActiveJourney(
    @Param('userId') userId: string
  ): Promise<JourneyResponseDto | null> {
    const journeys = await Journey.findByUserId(userId);
    const activeJourney = journeys.find((j) => j.status === 'active');
    return activeJourney || null;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Journey created',
    schema: {
      example: {
        id: 'journey-1234',
      },
      properties: {
        id: {
          type: 'string',
          description: 'Unique journey ID',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  @ApiOperation({ summary: 'Create a new journey' })
  createJourney(
    @Body(ValidationPipe)
    journeyCreationDto: JourneyCreationDto
  ): Promise<JourneyResponseDto> {
    const journey = new Journey({
      userId: journeyCreationDto.userId,
      name: journeyCreationDto.name,
      description: journeyCreationDto.description,
      pointsEarned: journeyCreationDto.pointsEarned,
      finalPoints: journeyCreationDto.finalPoints,
      activitiesCompleted: journeyCreationDto.activitiesCompleted,
      activitiesFinal: journeyCreationDto.activitiesFinal,
      plantCount: journeyCreationDto.plantCount,
      order: journeyCreationDto.order,
      relatedPlants: journeyCreationDto.relatedPlants,
    });
    return journey.create();
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Journey updated',
    type: JourneyResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Journey not found',
  })
  @ApiOperation({ summary: 'Update a journey' })
  updateJourney(
    @Param('id') id: string,
    @Body() journeyUpdateDto: JourneyUpdateDto
  ): Promise<JourneyResponseDto> {
    return Journey.updateJourney(id, journeyUpdateDto);
  }

  @Post('user/:userId/plant-added')
  @ApiResponse({
    status: 200,
    description: 'Plant added to journey and progress checked',
    type: JourneyResponseDto,
  })
  @ApiOperation({ summary: 'Update journey progress when a plant is added' })
  async onPlantAdded(
    @Param('userId') userId: string,
    @Body() body: { plantId: string }
  ): Promise<JourneyResponseDto | null> {
    const journeys = await Journey.findByUserId(userId);
    const activeJourney = journeys.find((j) => j.status === 'active');

    if (!activeJourney) {
      return null;
    }

    if (!activeJourney.relatedPlants.includes(body.plantId)) {
      console.log(
        `Updating journey "${activeJourney.name}" - adding plant ${body.plantId}`
      );

      const updatedRelatedPlants = [
        ...activeJourney.relatedPlants,
        body.plantId,
      ];

      let updates: JourneyUpdateDto = {
        relatedPlants: updatedRelatedPlants,
      };

      if (activeJourney.type === 'garden') {
        const newPlantCount = activeJourney.plantCount + 1;
        updates.plantCount = newPlantCount;
        updates.activitiesCompleted = newPlantCount;

        if (newPlantCount >= activeJourney.activitiesFinal) {
          console.log(
            `Journey "${activeJourney.name}" completed! Plants: ${newPlantCount}/${activeJourney.activitiesFinal}`
          );

          updates.status = 'finished';
          updates.pointsEarned = activeJourney.finalPoints;

          await Journey.updateJourney(activeJourney.id, updates);

          try {
            await this.notifyUserSystemOnCompletion(
              userId,
              activeJourney.id,
              activeJourney.finalPoints
            );
            console.log('deu tudo certo');
          } catch (err) {
            console.error('Failed to notify user system:', err.message);
          }

          await this.activateNextJourney(userId, activeJourney.order);

          return Journey.findById(activeJourney.id);
        }

        console.log(
          `Journey "${activeJourney.name}" progress: ${activeJourney.activitiesCompleted}/${activeJourney.activitiesFinal} activities, ${activeJourney.pointsEarned} points`
        );
      }

      return Journey.updateJourney(activeJourney.id, updates);
    }

    return activeJourney;
  }

  @Post('user/:userId/initialize')
  @ApiResponse({
    status: 201,
    description: 'Default journeys created for user',
    type: [JourneyResponseDto],
  })
  @ApiOperation({ summary: 'Create default journeys for a user' })
  async initializeUserJourneys(
    @Param('userId') userId: string
  ): Promise<JourneyResponseDto[]> {
    return Journey.createDefaultForUser(userId);
  }

  //conexao com missao
  @Post('user/:userId/mission-completed')
  @ApiResponse({
    status: 200,
    description: 'Journey updated after mission completion',
    type: JourneyResponseDto,
  })
  @ApiOperation({
    summary: 'Update journey progress when a mission is completed',
  })
  async onMissionCompleted(
    @Param('userId') userId: string,
    @Body() body: { missionId: string; points: number }
  ): Promise<JourneyResponseDto | null> {
    const journeys = await Journey.findByUserId(userId);
    const activeJourney = journeys.find((j) => j.status === 'active');

    if (!activeJourney) {
      console.log(`No active journey found for user ${userId}`);
      return null;
    }

    if (activeJourney.type === 'activities') {
      const newActivitiesCompleted = activeJourney.activitiesCompleted + 1;
      const newPointsEarned = activeJourney.pointsEarned + body.points;

      let updates: JourneyUpdateDto = {
        activitiesCompleted: newActivitiesCompleted,
        pointsEarned: newPointsEarned,
      };

      if (newActivitiesCompleted >= activeJourney.activitiesFinal) {
        console.log(
          `Journey "${activeJourney.name}" completed! Activities: ${newActivitiesCompleted}/${activeJourney.activitiesFinal}`
        );

        updates.status = 'finished';
        updates.pointsEarned = activeJourney.finalPoints;

        await Journey.updateJourney(activeJourney.id, updates);

        // Notificar sistema de usuários antes de ativar próxima jornada
        try {
          await this.notifyUserSystemOnCompletion(
            userId,
            activeJourney.id,
            activeJourney.finalPoints
          );
          console.log('deu tudo certo');
        } catch (err) {
          console.error('Failed to notify user system:', err.message);
        }

        await this.activateNextJourney(userId, activeJourney.order);

        return Journey.findById(activeJourney.id);
      }

      console.log(
        `Journey "${activeJourney.name}" progress: ${newActivitiesCompleted}/${activeJourney.activitiesFinal} activities, ${newPointsEarned} points`
      );

      return Journey.updateJourney(activeJourney.id, updates);
    }

    console.log(
      `Journey "${activeJourney.name}" is type "${activeJourney.type}", not updating for mission completion`
    );

    return activeJourney;
  }

  // conexao com usuario
  async notifyUserSystemOnCompletion(
    userId: string,
    journeyId: string,
    points: number
  ): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.post(`/api/users/${userId}/journey-completed`, {
          journeyId,
          points,
        })
      );
      console.log('User system notified of journey completion');
    } catch (error) {
      console.error(
        'Failed to notify user system:',
        error.response?.data || error.message
      );
      throw error;
    }
  }

  private async activateNextJourney(
    userId: string,
    currentOrder: number
  ): Promise<void> {
    const journeys = await Journey.findByUserId(userId);
    const nextJourney = journeys.find((j) => j.order === currentOrder + 1);

    if (nextJourney && nextJourney.status === 'locked') {
      await Journey.updateJourney(nextJourney.id, { status: 'active' });
      console.log(
        `Next journey activated for user ${userId}: ${nextJourney.name}`
      );
    }
  }
}
