import { randomUUID } from 'crypto';
import { LowdbService } from 'src/database/lowdb.service';
import {
  ResourceNotFoundException,
  ResourceAlreadyExists,
} from 'src/exceptions/exceptions';
import { JourneyCreationDto } from '../dto/journey-creation-dto';
import { JourneyUpdateDto } from '../dto/journey-update-dto';
import { JourneyResponseDto } from '../dto/journey-response-dto';
import { plainToInstance } from 'class-transformer';

export class Journey {
  private static db: LowdbService;

  static injectDb(db: LowdbService) {
    this.db = db;
  }

  private _id: string;
  private _userId: string;
  private _createdAt: Date;

  private _name: string;
  private _description: string;

  private _pointsEarned: number;
  private _finalPoints: number;

  private _activitiesCompleted: number;
  private _activitiesFinal: number;

  private _plantCount: number;

  private _order: number;

  private _relatedPlants: string[];

  private _status: 'finished' | 'active' | 'locked';
  private _type: 'garden' | 'activities';

  constructor(params: {
    userId: string;
    name: string;
    description: string;

    pointsEarned?: number;
    finalPoints: number;

    activitiesCompleted?: number;
    activitiesFinal: number;

    plantCount?: number;

    order?: number;

    relatedPlants: string[];

    status?: 'finished' | 'active' | 'locked';
    type?: 'garden' | 'activities';

    id?: string;
    createdAt?: Date;
  }) {
    this._id = params.id ?? randomUUID();
    this._userId = params.userId;
    this._createdAt = params.createdAt ?? new Date();

    this._name = params.name;
    this._description = params.description;

    this._pointsEarned = params.pointsEarned ?? 0;
    this._finalPoints = params.finalPoints;

    this._activitiesCompleted = params.activitiesCompleted ?? 0;
    this._activitiesFinal = params.activitiesFinal;

    this._plantCount = params.plantCount ?? 0;

    this._order = params.order ?? 0;

    this._relatedPlants = params.relatedPlants;
    this._status = params.status ?? 'locked';
    this._type = params.type ?? 'activities';
  }

  public static async findById(id: string): Promise<JourneyResponseDto> {
    if (!this.db || !this.db.data) {
      throw new Error('Database not initialized');
    }

    const j = Journey.db.data.journeys.find((p) => p.id === id);

    if (!j) {
      throw new ResourceNotFoundException('Journey', id);
    }

    return plainToInstance(JourneyResponseDto, j, {
      excludeExtraneousValues: true,
    });
  }

  public static async findByState(status: 'active' | 'locked'): Promise<JourneyResponseDto> {
    if (!this.db || !this.db.data) {
      throw new Error('Database not initialized');
    }

    const j = Journey.db.data.journeys.find((p) => p.status === status);

    if (!j) {
      throw new ResourceNotFoundException('Journey', 'state');
    }

    return plainToInstance(JourneyResponseDto, j, {
      excludeExtraneousValues: true,
    });
  }

  public static async findByUserId(
    userId: string
  ): Promise<JourneyResponseDto[]> {
    if (!Journey.db || !Journey.db.data) {
      throw new Error('Database not initialized');
    }

    const journeys = Journey.db.data.journeys
      .filter((journey: any) => journey.userId === userId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    return journeys.map((j) =>
      plainToInstance(JourneyResponseDto, j, {
        excludeExtraneousValues: true,
      })
    );
  }

  public async create(): Promise<JourneyResponseDto> {
    if (!Journey.db || !Journey.db.data || !Journey.db.data.journeys) {
      throw new Error('Database not initialized for Journey entity');
    }

    const exists = Journey.db.data.journeys.some(
      (j) => j.name.toLowerCase() === this._name.toLowerCase() && j.userId === this._userId
    );

    if (exists) {
      throw new ResourceAlreadyExists('Journey', this._name);
    }

    Journey.db.data.journeys.push(this.toJSON());
    await Journey.db.write();

    return plainToInstance(JourneyResponseDto, this.toJSON(), {
      excludeExtraneousValues: true,
    });
  }

  public static async updateJourney(
    id: string,
    dto: JourneyUpdateDto
  ): Promise<JourneyResponseDto> {
    if (!this.db || !this.db.data) {
      throw new Error('Database not initialized');
    }

    const index = Journey.db.data.journeys.findIndex((j) => j.id === id);

    if (index === -1) {
      throw new ResourceNotFoundException('Journey', id);
    }

    const journey = Journey.db.data.journeys[index];

    if (dto.name !== undefined) journey.name = dto.name;
    if (dto.description !== undefined) journey.description = dto.description;
    if (dto.pointsEarned !== undefined) journey.pointsEarned = dto.pointsEarned;
    if (dto.finalPoints !== undefined) journey.finalPoints = dto.finalPoints;
    if (dto.activitiesCompleted !== undefined)
      journey.activitiesCompleted = dto.activitiesCompleted;
    if (dto.activitiesFinal !== undefined)
      journey.activitiesFinal = dto.activitiesFinal;
    if (dto.plantCount !== undefined) journey.plantCount = dto.plantCount;
    if (dto.order !== undefined) journey.order = dto.order;
    if (dto.relatedPlants !== undefined)
      journey.relatedPlants = dto.relatedPlants;
    if (dto.status !== undefined) journey.status = dto.status;
    if (dto.type !== undefined) journey.type = dto.type;

    Journey.db.data.journeys[index] = journey;
    await Journey.db.write();

    return plainToInstance(JourneyResponseDto, journey, {
      excludeExtraneousValues: true,
    });
  }

  //salvar defaults 

  public static async createDefaultForUser(userId: string): Promise<JourneyResponseDto[]> {
    if (!this.db || !this.db.data) {
      throw new Error('Database not initialized');
    }

    const defaultJourneys = [
      {
        userId,
        name: 'First Sprout',
        description: 'plant a new plant on your garden',
        finalPoints: 10,
        activitiesFinal: 1,
        plantCount: 0,
        order: 1,
        relatedPlants: [],
        status: 'active' as const,
        type: 'garden' as const,
      },
      {
        userId,
        name: 'New Life',
        description: 'complete every daily mission of a plant',
        finalPoints: 30,
        activitiesFinal: 7,
        plantCount: 0,
        order: 2,
        relatedPlants: [],
        status: 'locked' as const,
        type: 'activities' as const,
      },
      {
        userId,
        name: 'Triple Threat',
        description: 'plant three more plants in your garden',
        finalPoints: 50,
        activitiesFinal: 3,
        plantCount: 3,
        order: 3,
        relatedPlants: [],
        status: 'locked' as const,
        type: 'garden' as const,
      },
      {
        userId,
        name: 'Rain Season',
        description: 'water your plants everyday for a week',
        finalPoints: 50,
        activitiesFinal: 7,
        plantCount: 0,
        order: 4,
        relatedPlants: [],
        status: 'locked' as const,
        type: 'activities' as const,
      },
      {
        userId,
        name: 'Trimming Time',
        description: 'Complete a trim',
        finalPoints: 20,
        activitiesFinal: 1,
        plantCount: 0,
        order: 5,
        relatedPlants: [],
        status: 'locked' as const,
        type: 'activities' as const,
      },
    ];

    const results: JourneyResponseDto[] = [];

    for (const data of defaultJourneys) {
      const j = new Journey(data);
      const created = await j.create();
      results.push(created);
    }

    return results;
  }


  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      createdAt: this._createdAt,

      name: this._name,
      description: this._description,

      pointsEarned: this._pointsEarned,
      finalPoints: this._finalPoints,

      activitiesCompleted: this._activitiesCompleted,
      activitiesFinal: this._activitiesFinal,

      plantCount: this._plantCount,

      order: this._order,

      relatedPlants: this._relatedPlants,
      status: this._status,
      type: this._type,
    };
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get pointsEarned(): number {
    return this._pointsEarned;
  }

  get finalPoints(): number {
    return this._finalPoints;
  }

  get activitiesCompleted(): number {
    return this._activitiesCompleted;
  }

  get activitiesFinal(): number {
    return this._activitiesFinal;
  }

  get plantCount(): number {
    return this._plantCount;
  }

  get order(): number {
    return this._order;
  }

  get relatedPlants(): string[] {
    return this._relatedPlants;
  }

  get status(): 'finished' | 'active' | 'locked' {
    return this._status;
  }

  get type(): 'garden' | 'activities' {
    return this._type;
  }

  set name(value: string) {
    if (!value.trim()) throw new Error('Invalid name');
    this._name = value;
  }

  set description(value: string) {
    if (!value.trim()) throw new Error('Invalid description');
    this._description = value;
  }

  set pointsEarned(value: number) {
    if (value < 0) throw new Error('Invalid points earned');
    if (value > this._finalPoints)
      throw new Error('Points cannot exceed finalPoints');
    this._pointsEarned = value;
  }

  set finalPoints(value: number) {
    if (value < 1) throw new Error('Invalid final point value');
    this._finalPoints = value;
  }

  set activitiesCompleted(value: number) {
    if (value < 0) throw new Error('Invalid completed activity count');
    if (value > this._activitiesFinal)
      throw new Error('Completed activities exceed total activities');
    this._activitiesCompleted = value;
  }

  set activitiesFinal(value: number) {
    if (value < 1) throw new Error('Invalid total activity count');
    this._activitiesFinal = value;
  }

  set plantCount(value: number) {
    if (value < 0) throw new Error('Invalid plant count');
    this._plantCount = value;
  }

  set order(value: number) {
    if (value < 0) throw new Error('Invalid order');
    this._order = value;
  }

  set relatedPlants(value: string[]) {
    if (!Array.isArray(value)) throw new Error('Invalid plant list');
    this._relatedPlants = value;
  }

  set status(value: 'finished' | 'active' | 'locked') {
    if (!['finished', 'active', 'locked'].includes(value)) {
      throw new Error('Invalid status value');
    }
    this._status = value;
  }

  set type(value: 'garden' | 'activities') {
    if (!['garden', 'activities'].includes(value)) {
      throw new Error('Invalid type');
    }
    this._type = value;
  }
}
