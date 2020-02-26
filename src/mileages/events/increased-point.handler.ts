import { Model } from 'mongoose';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { IncreasedPointEvent } from './increased-point.event';
import { InjectModel } from '@nestjs/mongoose';
import { Mileage } from '../interfaces/mileage.interface';

@EventsHandler(IncreasedPointEvent)
export class IncreasedPointHandler implements IEventHandler<IncreasedPointEvent> {
  constructor(
    @InjectModel('Mileage') private readonly mileageModel: Model<Mileage>,
  ) {}

  async handle(event: IncreasedPointEvent) {
    const { userId, amount } = event;
    const current = await this.mileageModel.findOne({ userId });
    if (!current) {
      throw new Error('User mileages document does not exits');
    }

    return await this.mileageModel.findOneAndUpdate({
      userId,
    }, {
      $inc: { amount },
    }, {
      new: true,
    });
  }
}