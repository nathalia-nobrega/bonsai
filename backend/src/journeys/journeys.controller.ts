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
  
  @ApiTags('journeys')
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
  