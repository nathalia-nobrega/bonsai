import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { LowdbService } from 'src/database/lowdb.service';
import { UserCreationDto } from './dto/user-creation-dto';
import { UserResponseDto } from './dto/user-response-dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  //testando o lowdb -> MODIFICAR DPS?
  constructor(private readonly lowdbService: LowdbService) {}

  // Colocando isso aqui somente para fins de teste!!!!
  private users = [
    {
      id: 'bc01',
      createdAt: new Date('2025-10-10T14:32:00Z'),
      name: 'And Then Isaac Will Suffer',
      email: 'concorde@willfly.com',
      photoUrl: 'https://example.com/photos/concord.jpg',
      level: 6,
      points: 1340,
    },
    {
      id: 'bc02',
      createdAt: new Date('2025-09-18T09:45:00Z'),
      name: "I'm more than adequate",
      email: 'leavekanye@outof.this',
      photoUrl: 'https://example.com/photos/sunglasses.jpg',
      level: 4,
      points: 890,
    },
    {
      id: 'bc03',
      createdAt: new Date('2025-08-25T17:20:00Z'),
      name: 'In My Bedsheets, Now Wet, Of Charli',
      email: 'ipray@tofor.get',
      photoUrl: 'https://example.com/photos/basketball-shoes.jpg',
      level: 8,
      points: 2110,
    },
  ];

  async findUserById(id: string): Promise<UserResponseDto> {
    const db = await this.lowdbService.start();

    const user = db.data.users.find((user) => user.id === id);

    // TODO: exception
    if (!user) {
      throw new Error('User not found');
    }

    return plainToInstance(UserResponseDto, user);
  }

  //POST - testando o lowdb -> MODIFICAR DPS?
  async createUser(userCreationDto: UserCreationDto): Promise<UserResponseDto> {
    const db = await this.lowdbService.start();

    const emailExists = db.data.users.some(
      (user) => user.email === userCreationDto.email
    );

    // TODO: colocar no arquivo de exceptions
    if (emailExists) {
      throw new ConflictException('Email já cadastrado');
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

    db.data.users.push(newUser);
    await db.write();

    const response = plainToInstance(UserResponseDto, { id: newUser.id });

    return response;
  }
}
