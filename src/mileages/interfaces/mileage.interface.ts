import { Document } from 'mongoose';

export interface Mileage extends Document {
  readonly userId: string;
  readonly amount: number;
  readonly updated: Date;
  readonly created: Date;
}