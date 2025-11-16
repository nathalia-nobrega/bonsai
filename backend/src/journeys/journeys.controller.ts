import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Patch,
    ValidationPipe,
  } from '@nestjs/common';
  import { ApiResponse, ApiTags } from '@nestjs/swagger';
  
  import { Journey } from './entities/journey.entity';
  import { JourneyCreationDto } from './dto/journey-creation-dto';
  import { JourneyResponseDto } from './dto/journey-response-dto';
  import { JourneyUpdateDto } from './dto/journey-update-dto';
  
  @ApiTags('bonsai')
  @Controller('journeys')
  export class JourneyController {
    constructor() {}
  

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
    findJourneyById(@Param('id') id: string): Promise<JourneyResponseDto> {
      return Journey.findById(id);
    }
  
    @Get('user/:userId')
    @ApiResponse({
      status: 200,
      description: 'All journeys from a user',
      type: [JourneyResponseDto],
    })
    getJourneysByUser(
      @Param('userId') userId: string,
    ): Promise<JourneyResponseDto[]> {
      return Journey.findByUserId(userId);
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
    createJourney(
      @Body(ValidationPipe)
      journeyCreationDto: JourneyCreationDto,
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
    
    @Post()
    @ApiResponse({
      status: 201,
      description: 'Default journeys created for user',
      type: [JourneyResponseDto],
    })
    static async createDefaultJourneys(
      @Param('userId') userId: string,
    ): Promise<JourneyResponseDto[]> {
      const defaultJourneys = [
        {
          userId,
          name: 'First Sprout',
          description: 'plant a new plant on your garden',
          pointsEarned: 0,
          finalPoints: 10,
          activitiesCompleted: 0,
          activitiesFinal: 1,
          plantCount: 1,
          order: 1,
          relatedPlants: [],
        },
        {
          userId,
          name: 'New Life',
          description: 'complete every daily mission of a plant',
          pointsEarned: 0,
          finalPoints: 30,
          activitiesCompleted: 0,
          activitiesFinal: 7,
          plantCount: 0,
          order: 2,
          relatedPlants: [],
        },
        {
          userId,
          name: 'Triple Threat',
          description: 'plant three more plants in your garden',
          pointsEarned: 0,
          finalPoints: 50,
          activitiesCompleted: 0,
          activitiesFinal: 3,
          plantCount: 3,
          order: 3,
          relatedPlants: [],
        },
        {
          userId,
          name: 'Rain Season',
          description: 'water your plants everyday for a week',
          pointsEarned: 0,
          finalPoints: 50,
          activitiesCompleted: 0,
          activitiesFinal: 7,
          plantCount: 0,
          order: 4,
          relatedPlants: [],
        },
        {
          userId,
          name: 'Trimming Time',
          description: 'Complete a trim',
          pointsEarned: 0,
          finalPoints: 20,
          activitiesCompleted: 0,
          activitiesFinal: 1,
          plantCount: 0,
          order: 5,
          relatedPlants: [],
        },
      ];

      const createdJourneys: JourneyResponseDto[] = [];

      for (const journeyData of defaultJourneys) {
        const journey = new Journey(journeyData);
        const created = await journey.create();
        createdJourneys.push(created);
      }

      return createdJourneys;
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
    updateJourney(
      @Param('id') id: string,
      @Body() journeyUpdateDto: JourneyUpdateDto,
    ): Promise<JourneyResponseDto> {
      return Journey.updateJourney(id, journeyUpdateDto);
    }
  }
  