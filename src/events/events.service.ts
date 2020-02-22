import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { Event } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = new this.eventModel(createEventDto);
    return event.save();
  }

  async getUserEvents(userId: string): Promise<Event[]> {
    return await this.eventModel.find({ userId });
  }
}