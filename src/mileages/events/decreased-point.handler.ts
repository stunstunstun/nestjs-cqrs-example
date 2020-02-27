import { Model } from 'mongoose';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { DecreasedPointEvent } from './decreased-point.event';
import { InjectModel } from '@nestjs/mongoose';
import { Mileage } from '../interfaces/mileage.interface';
import { EventType, EventAction } from 'src/events/events.enum';

@EventsHandler(DecreasedPointEvent)
export class DecreasedPointHandler implements IEventHandler<DecreasedPointEvent> {
  constructor(
    @InjectModel('Mileage') private readonly mileageModel: Model<Mileage>,
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async handle(event: DecreasedPointEvent) {
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