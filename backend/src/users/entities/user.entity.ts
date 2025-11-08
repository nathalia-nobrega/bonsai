import { randomUUID } from "crypto";

/* jessica isso aqui ta errado hahahah tem q fazer o encapsulamento direitinho */
export class User {

    constructor(name, email, photoUrl) {
      this.id = randomUUID();
      this.createdAt = new Date()
      this.photoUrl = photoUrl
      this.name = name;
      this.email = email;
    }
  
  id: string
  createdAt: Date
  name: string;
  email: string
  photoUrl: string
  level: Number
  points: Number
  // password: string
}