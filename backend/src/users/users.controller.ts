import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response-dto';
import { UserCreationDto } from './dto/user-creation-dto';
import { UsersService } from './users.service';

@ApiTags('bonsai')
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

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
    return this.usersService.findUserById(id);
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
  create(
    @Body(ValidationPipe) userCreationDto: UserCreationDto
  ): Promise<UserResponseDto> {
    return this.usersService.createUser(userCreationDto);
  }
}
