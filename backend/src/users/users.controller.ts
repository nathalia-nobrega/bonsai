import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
  Patch,
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
    Journey.injectDb(this.db);
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

    // Criar jornadas padrão para o novo usuário
    try {
      await Journey.createDefaultForUser(createdUser.id);
    } catch (error) {
      // Log do erro mas não falha a criação do usuário
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
}
