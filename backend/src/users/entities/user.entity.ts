import { randomUUID } from "crypto";

/* jessica isso aqui ta errado hahahah tem q fazer o encapsulamento direitinho */
export class User {
  readonly id: string;
  readonly createdAt: Date;
  readonly name: string;
  readonly email: string;
  readonly photoUrl: string;
  readonly level: number;
  readonly points: number;

  constructor(params: {
    name: string;
    email: string;
    photoUrl: string;
    level?: number;
    points?: number;
    id?: string;
    createdAt?: Date;
  }) {
    this.id = params.id ?? randomUUID();
    this.createdAt = params.createdAt ?? new Date();
    this.name = params.name;
    this.email = params.email;
    this.photoUrl = params.photoUrl;
    this.level = params.level ?? 1;
    this.points = params.points ?? 0;
  }
}