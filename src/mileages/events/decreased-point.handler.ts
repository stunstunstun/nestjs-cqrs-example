import { Model } from 'mongoose';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { DecreasedPointEvent } from './decreased-point.event';
import { InjectModel } from '@nestjs/mongoose';
import { Mileage } from '../interfaces/mileage.interface';

@EventsHandler(DecreasedPointEvent)
export class DecreasedPointHandler implements IEventHandler<DecreasedPointEvent> {
  constructor(
    @InjectModel('Mileage') private readonly mileageModel: Model<Mileage>,
  ) {}

  async handle(event: DecreasedPointEvent) {
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