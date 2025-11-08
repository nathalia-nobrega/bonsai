import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponseDto } from "./dto/user-response-dto";
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
  findUserById(@Param('id') id: string): UserResponseDto {
    return this.usersService.findUserById(id);
  }
}