\import { Injectable, OnModuleInit } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

interface Database {
  users: Array<{
    id: string;
    createdAt: Date;
    name: string;
    email: string;
    password: string;
    photoUrl: string;
    level: number;
    pointsGained: number;
  }>;

  plants: Array<{
    id: string;
    createdAt: Date;
    chosenName: string;
    userId: string;
    commonName: string;
    scientificName: string;
    otherName?: string;
    family: string;
    type: string;
    cycle: string;
    wateringPeriod: string;
    wateringBasedTemperature: string;
    growthRate: string;
    careLevel: string;
    maintenance: string;
    sunlightType: string;
    sunlightDuration: string;
    floweringHasFlowering: boolean;
    floweringSeason: string;
    trimmingCount: number;
    trimmingMonths: string[];
    photoUrl?: string;
    wasWatered: boolean;
    gotSunlight: boolean;
    wasTrimmed: boolean;
  }>;

  journeys: Array<{
    id: string;
    userId: string;
    createdAt: Date;
    name: string;
    description: string;
    pointsEarned: number;
    finalPoints: number;
    activitiesCompleted: number;
    activitiesFinal: number;
    plantCount: number;
    order: number;
    relatedPlants: string[];
    status: 'finished' | 'active' | 'locked';
    type: 'garden' | 'activities';
  }>;
}

@Injectable()
export class LowdbService implements OnModuleInit {
  private db: Low<Database>;

  async onModuleInit() {
    await this.start();
  }

  async start(): Promise<Low<Database>> {
    if (this.db) return this.db;

    const adapter = new JSONFile<Database>('db.json');
    this.db = new Low<Database>(adapter, {
      users: [],
      plants: [],
      journeys: [],
    } as Database);

    await this.db.read();

    this.db.data ||= { users: [], plants: [], journeys: [] } as Database;
    this.db.data.users ||= [];
    this.db.data.plants ||= [];
    this.db.data.journeys ||= [];


    return this.db;
  }

  get data(): Database {
    return this.db.data;
  }

  async write() {
    await this.db.write();
  }
}
