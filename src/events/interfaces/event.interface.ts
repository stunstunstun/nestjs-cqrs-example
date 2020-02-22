import { Document } from 'mongoose';

export interface Event extends Document {
  readonly type: string;
  readonly action: string;
  readonly userId: string;
  readonly placeId: string;
  readonly data: any;
  readonly created: Date;
}