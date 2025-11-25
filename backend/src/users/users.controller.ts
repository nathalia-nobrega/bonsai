import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LowdbService } from '../database/lowdb.service';
import { UserCreationDto } from './dto/user-creation-dto';
import { UserLoginDto } from './dto/user-login-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { UserUpdateDto } from './dto/user-update-dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly db: LowdbService,
    private readonly httpService: HttpService
  ) {
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

    console.log('User created:', createdUser.id);

    // Notificar o JourneyController para criar as jornadas padrão
    try {
      console.log(
        'Requesting default journeys creation for user:',
        createdUser.id
      );
      await firstValueFrom(
        this.httpService.post(`/api/journeys/user/${createdUser.id}/initialize`)
      );
      console.log(
        'Default journeys created successfully via JourneyController'
      );
    } catch (error) {
      console.error(
        'Error creating default journeys:',
        error.response?.data || error.message
      );
      // Não lançar erro aqui para não falhar a criação do usuário
      // Você pode decidir se quer logar apenas ou tomar outra ação
    }

    return createdUser;
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'User authenticated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(
    @Body(ValidationPipe) loginDto: UserLoginDto
  ): Promise<UserResponseDto> {
    try {
      return await User.validateCredentials(loginDto.email, loginDto.password);
    } catch (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Invalid email or password',
      });
    }
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<UserResponseDto> {
    return User.updateUser(id, userUpdateDto);
  }

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
