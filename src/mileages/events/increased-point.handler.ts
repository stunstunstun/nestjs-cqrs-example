import { Model } from 'mongoose';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Mileage } from 'src/mileages/interfaces/mileage.interface';
import { Event } from 'src/events/interfaces/event.interface';
import { IncreasedPointEvent } from './increased-point.event';
import { EventType, EventAction } from 'src/events/events.enum';

@EventsHandler(IncreasedPointEvent)
export class IncreasedPointHandler implements IEventHandler<IncreasedPointEvent> {
  constructor(
    @InjectModel('Mileage') private readonly mileageModel: Model<Mileage>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async handle(event: IncreasedPointEvent) {
    const { userId, amount } = event;
    const current = await this.mileageModel.findOne({ userId });
    if (!current) {
      throw new Error('User mileages document does not exits');
    }

    await this.mileageModel.findOneAndUpdate({
      userId,
    }, {
      $inc: { amount },
    }, {
      new: true,
    });

    return this.eventModel.create({
      type: EventType.POINT,
      action: EventAction.ADD,
      ...event
    });
  }
}