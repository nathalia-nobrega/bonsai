import { Injectable, OnModuleInit } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { User } from 'src/users/entities/user.entity';

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
    this.db = new Low<Database>(adapter, { users: [] });
    await this.db.read();
    this.db.data ||= { users: [] };
    return this.db;
  }

  get data(): Database {
    return this.db.data;
  }

  async write() {
    await this.db.write();
  }
}
