import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { EventPublisher } from '@nestjs/cqrs'
import { Event } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { EventType } from './events.enum';
import { Actor } from './models/actor.model';

export class EventsService {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private readonly publisher: EventPublisher,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    // handle events
    const { type, action, userId, placeId, data } = createEventDto
    const actor = this.publisher.mergeObjectContext(new Actor(userId));
    switch(type) {
      case EventType.REVIEW:
        actor.reviewPlace(action, placeId, data);
    }
    actor.commit();
    // commit and store event
    const event = new this.eventModel(createEventDto);
    return event.save();
  }

  async getEvents(filter: any): Promise<Event[]> {
    return await this.eventModel.find(filter);
  }
}