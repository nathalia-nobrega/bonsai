import { randomUUID } from 'crypto';
import { LowdbService } from 'src/database/lowdb.service';
import { ResourceNotFoundException } from 'src/exceptions/exceptions';
import { Exclude } from 'class-transformer';
import { MissionCreationDto } from '../dto/mission-creation-dto';
import { MissionResponseDto } from '../dto/mission-response-dto';
import { MissionUpdateDto } from '../dto/mission-update-dto';
import { plainToInstance } from 'class-transformer';
import { MissionType } from '../mission.types';

export class Mission {
  // Banco estático
  private static db: LowdbService;

  static injectDb(db: LowdbService) {
    this.db = db;
  }

  // Campos
  private _id: string;
  private _idPlant: string;
  private _userId: string;
  private _lastCompletedAt: Date | null;
  private _title: string;
  private _description: string;
  private _type: MissionType;

  private _hourlyFrequency: number;
  private _points: number;

  private _nextAvailableAt: Date;
  private _isAvailable: boolean;

  //construtor
  constructor(
    idPlant: string,
    userId: string,
    title: string,
    description: string,
    type: MissionType,
    hourlyFrequency: number,
    points: number
  ) {
    this._id = randomUUID();
    this._idPlant = idPlant;
    this._userId = userId;
    this._title = title;
    this._description = description;
    this._type = type;
    this._hourlyFrequency = hourlyFrequency;
    this._points = points;

    this._lastCompletedAt = null;
    this._nextAvailableAt = new Date();
    this._isAvailable = true;
  }

  //get e set
  get id() {
    return this._id;
  }

  get idPlant() {
    return this._idPlant;
  }

  get userId() {
    return this._userId;
  }

  get title() {
    return this._title;
  }

  set title(v: string) {
    this._title = v;
  }

  get description() {
    return this._description;
  }

  set description(v: string) {
    this._description = v;
  }

  get type() {
    return this._type;
  }

  get hourlyFrequency() {
    return this._hourlyFrequency;
  }

  set hourlyFrequency(v: number) {
    this._hourlyFrequency = v;
  }

  get points() {
    return this._points;
  }

  get lastCompletedAt() {
    return this._lastCompletedAt;
  }

  get nextAvailableAt() {
    return this._nextAvailableAt;
  }

  get isAvailable() {
    return this._isAvailable;
  }

  // Service methods
  toJSON() {
    return {
      id: this._id,
      idPlant: this._idPlant,
      userId: this._userId,
      title: this._title,
      description: this._description,
      type: this._type,
      hourlyFrequency: this._hourlyFrequency,
      points: this._points,
      lastCompletedAt: this._lastCompletedAt,
      nextAvailableAt: this._nextAvailableAt,
      isAvailable: this._isAvailable,
    };
  }

  //get

  public static findById(id: string): MissionResponseDto {
    const mission = this.db.data.missions.find((u) => u.id === id);

    if (!mission) {
      throw new ResourceNotFoundException('Mission', id);
    }
    console.log(plainToInstance(MissionResponseDto, mission));

    return plainToInstance(MissionResponseDto, mission, {
      excludeExtraneousValues: true,
    });
  }

  // Save method
  public async create(): Promise<MissionResponseDto> {
    Mission.db.data.missions.push(this.toJSON());
    await Mission.db.write();

    return plainToInstance(MissionResponseDto, this.toJSON());
  }

  // Update method
  static async updatePlant(
    id: string,
    missionUpdateDto: MissionUpdateDto
  ): Promise<MissionResponseDto> {
    const missionIndex = Mission.db.data.missions.findIndex((m) => m.id === id);

    if (missionIndex === -1) {
      throw new ResourceNotFoundException('Mission', id);
    }

    const mission = Mission.db.data.missions[missionIndex];

    if (missionUpdateDto.title !== undefined) {
      mission.title = missionUpdateDto.title;
    }

    if (missionUpdateDto.description !== undefined) {
      mission.description = missionUpdateDto.description;
    }

    if (missionUpdateDto.hourlyFrequency !== undefined) {
      mission.hourlyFrequency = missionUpdateDto.hourlyFrequency;
    }

    if (missionUpdateDto.points !== undefined) {
      mission.points = missionUpdateDto.points;
    }

    if (missionUpdateDto.lastCompletedAt !== undefined) {
      mission.lastCompletedAt = missionUpdateDto.lastCompletedAt;
    }

    if (missionUpdateDto.nextAvailableAt !== undefined) {
      mission.nextAvailableAt = missionUpdateDto.nextAvailableAt;
    }

    if (missionUpdateDto.isAvailable !== undefined) {
      mission.isAvailable = missionUpdateDto.isAvailable;
    }

    Mission.db.data.missions[missionIndex] = mission;
    await Mission.db.write();

    return plainToInstance(MissionResponseDto, mission);
  }
}
