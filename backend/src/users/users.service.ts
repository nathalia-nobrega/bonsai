import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UserResponseDto } from "./dto/user-response-dto";
import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UsersService {
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
    name: 'I\'m more than adequate',
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

  findUserById(id: string): UserResponseDto {
    return plainToInstance(UserResponseDto, this.users.at(2));
  }
}