import { Controller, Get, Param, Post, Body, ValidationPipe } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponseDto } from "./dto/user-response-dto";
import { UserCreationDto } from "./dto/user-creation-dto";
import { UsersService } from "./users.service";

@ApiTags('bonsai')
@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: "The found user",
    type: UserResponseDto,
  })
  // findUserById(@Param('id') id: string): UserResponseDto {
  //   return this.usersService.findUserById(id);
  // }

  //TESTANDO O LOWDB -> APAGAR DPS
  findUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findUser(id);
  }

  @Post()
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    type: UserResponseDto 
  })
  @ApiResponse({ 
    status: 409, 
    description: '{email}: Este e-mail já foi cadastrado' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados mal-formatados.',
  })

  create(@Body(ValidationPipe) userCreationDto: UserCreationDto): Promise<UserResponseDto> {
    return this.usersService.createUser(userCreationDto);
  }
}