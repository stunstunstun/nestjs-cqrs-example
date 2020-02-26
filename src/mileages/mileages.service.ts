import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { GrantPointDto } from './dto/grant-point.dto';
import { Mileage } from './interfaces/mileage.interface';
import { EventsService } from 'src/events/events.service';
import { CreateEventDto } from 'src/events/dto/create-event.dto';
import { EventType } from 'src/events/events.enum';

@Injectable()
export class MileagesService {
  constructor(
    @InjectModel('Mileage') private readonly mileageModel: Model<Mileage>,
    private readonly eventsService: EventsService,
  ) {}

  async grantPoint(userId: string, point: GrantPointDto) {
    const { grantType, amount } = point;
    // create document when does not exists
    const mileage = await this.getMileages(userId);
    if (!mileage) {
      const item = new this.mileageModel({ userId, amount: 0 });
      await item.save();
    }
    // create a history
    return await this.eventsService.createEvent(new CreateEventDto({
      type: EventType.POINT,
      action: grantType,
      userId,
      data: { amount },
    }));
  }

  async getMileages(userId: string) {
    return await this.mileageModel.findOne({ userId });
  }
}