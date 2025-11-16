import { Injectable, OnModuleInit } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

interface Plant {
  id: string;
  userId: string;          
  name: string;
  species: string;
  createdAt: Date;


  waterDays: number;
  sunDays: number;
  pruneCount: number;
}

interface Journey {
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
}

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
<<<<<<< HEAD
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
=======

  plants: Plant[];

  journeys: Journey[];
>>>>>>> 40527f2 (jornadas)
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
<<<<<<< HEAD
    this.db = new Low<Database>(adapter, { users: [], plants: [] });
    await this.db.read();

    // Ensure both arrays exist, even if file has partial data
    if (!this.db.data) {
      this.db.data = { users: [], plants: [] };
    } else {
      this.db.data.users ||= [];
      this.db.data.plants ||= [];
    }
=======
    this.db = new Low<Database>(adapter, {
      users: [],
      plants: [],
      journeys: [],
    });

    await this.db.read();


    this.db.data ||= { users: [], plants: [], journeys: [] };
>>>>>>> 40527f2 (jornadas)

    return this.db;
  }

  get data(): Database {
    return this.db.data;
  }

  async write() {
    await this.db.write();
  }
}
