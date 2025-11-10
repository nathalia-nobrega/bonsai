import { randomUUID } from 'crypto';

export class User {
  private readonly _id: string;
  private readonly _createdAt: Date;
  private _name: string;
  private _email: string;
  private _password: string;
  private _photoUrl: string;
  private _level: number;
  private _pointsGained: number;

  constructor(params: {
    name: string;
    email: string;
    password: string;
    photoUrl: string;
    level?: number;
    pointsGained?: number;
    id?: string;
    createdAt?: Date;
  }) {
    this._id = params.id ?? randomUUID();
    this._createdAt = params.createdAt ?? new Date();
    this._name = params.name;
    this._email = params.email;
    this._password = params.password;
    this._photoUrl = params.photoUrl;
    this._level = params.level ?? 1;
    this._pointsGained = params.pointsGained ?? 0;
  }

  //pra evitar o stringify do lowdb de trazer tudo com underline
  toJSON() {
    return {
      id: this._id,
      createdAt: this._createdAt,
      name: this._name,
      email: this._email,
      password: this._password,
      photoUrl: this._photoUrl,
      level: this._level,
      pointsGained: this._pointsGained,
    };
  }

  get id(): string {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get photoUrl(): string {
    return this._photoUrl;
  }

  get level(): number {
    return this._level;
  }

  get pointsGained(): number {
    return this._pointsGained;
  }

  set name(newName: string) {
    if (!newName.trim()) throw new Error('Nome inválido');
    this._name = newName;
  }

  set photoUrl(newUrl: string) {
    if (!newUrl.startsWith('http')) throw new Error('URL inválida');
    this._photoUrl = newUrl;
  }

  set level(newLevel: number) {
    if (newLevel < 1) throw new Error('Nível inválido');
    this._level = newLevel;
  }

  set pointsGained(newPoints: number) {
    if (newPoints < 0) throw new Error('Pontos inválidos');
    this._pointsGained = newPoints;
  }
}
