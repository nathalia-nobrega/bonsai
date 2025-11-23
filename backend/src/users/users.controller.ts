import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  Patch,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response-dto';
import { UserCreationDto } from './dto/user-creation-dto';
import { User } from './entities/user.entity';
import { UserUpdateDto } from './dto/user-update-dto';
import { Journey } from '../journeys/entities/journey.entity';
import { LowdbService } from '../database/lowdb.service';

@ApiTags('bonsai')
@Controller('users')
export class UserController {
  constructor(private readonly db: LowdbService) {
    User.injectDb(this.db);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findUserById(@Param('id') id: string): UserResponseDto {
    return User.findById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created',
    schema: {
      example: {
        id: 'c1c89493-3e0a-436d-b4d2-a161819b5519',
      },
      properties: {
        id: {
          type: 'string',
          description: 'Unique user ID',
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'E-mail already registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid request data',
  })
  async create(
    @Body(ValidationPipe) userCreationDto: UserCreationDto
  ): Promise<UserResponseDto> {
    const user = new User({
      name: userCreationDto.name,
      email: userCreationDto.email,
      password: userCreationDto.password,
      photoUrl: userCreationDto.photoUrl,
    });

    const createdUser = await user.create();

    console.log(createdUser.id);

    try {
      console.log('Creating default journeys for user:', createdUser.id);
      const journeys = await Journey.createDefaultForUser(createdUser.id);
      console.log(
        'Default journeys created successfully:',
        journeys.length,
        'journeys'
      );
    } catch (error) {
      console.error('Error creating default journeys:', error);
    }

    return createdUser;
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<UserResponseDto> {
    return User.updateUser(id, userUpdateDto);
  }

  //atualizar a partir de missao
  @Post(':userId/journey-completed')
  @ApiResponse({
    status: 200,
    description: 'User points and level updated after journey completion',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async onJourneyCompleted(
    @Param('userId') userId: string,
    @Body() body: { journeyId: string; points: number }
  ): Promise<UserResponseDto> {
    try {
      const user = User.findById(userId);

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const newPointsGained = user.pointsGained + body.points;

      const newLevel = user.level + 1;

      const updates: UserUpdateDto = {
        pointsGained: newPointsGained,
        level: newLevel,
      };

      console.log(
        `User ${user.name} completed journey! Earned ${body.points} points! Total: ${newPointsGained} points, Level: ${newLevel}`
      );

      return await User.updateUser(userId, updates);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to update user progress: ${error.message}`);
    }
  }
}
