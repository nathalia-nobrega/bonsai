import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { LowdbService } from 'src/database/lowdb.service';
import {
  ResourceAlreadyExists,
  ResourceNotFoundException,
} from 'src/exceptions/exceptions';
import { UserCreationDto } from './dto/user-creation-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //testando o lowdb -> MODIFICAR DPS?
  constructor(private readonly db: LowdbService) {}

  findUserById(id: string): UserResponseDto {
    const user = this.db.data.users.find((user) => user.id === id);

    if (!user) {
      throw new ResourceNotFoundException('User', id);
    }

    return plainToInstance(UserResponseDto, user);
  }

  //POST - testando o lowdb -> MODIFICAR DPS?
  async createUser(userCreationDto: UserCreationDto): Promise<UserResponseDto> {
    const emailExists = this.db.data.users.some(
      (user) => user.email === userCreationDto.email
    );

    // TODO: colocar no arquivo de exceptions
    if (emailExists) {
      throw new ResourceAlreadyExists('User', userCreationDto.email);
    }

    const hashedPassword = await bcrypt.hash(userCreationDto.password, 10);

    const newUser = new User({
      id: randomUUID(),
      createdAt: new Date(),
      name: userCreationDto.name,
      email: userCreationDto.email,
      password: hashedPassword,
      photoUrl:
        userCreationDto.photoUrl ||
        'https://pbs.twimg.com/media/FKyTCh7WQAQQNUr.jpg',
      level: Number(userCreationDto.level) || 1,
      pointsGained: Number(userCreationDto.pointsGained) || 0,
    });

    this.db.data.users.push(newUser);
    await this.db.write();

    const response = plainToInstance(UserResponseDto, { id: newUser.id });

    return response;
  }
}
