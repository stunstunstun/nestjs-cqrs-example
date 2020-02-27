import { Model } from 'mongoose';
import { IEventHandler, EventsHandler, EventPublisher } from '@nestjs/cqrs';
import { ReviewDeletedEvent } from './review-deleted.event';
import { InjectModel } from '@nestjs/mongoose';
import { EventType, EventAction } from 'src/events/events.enum';
import { makeCalculationPoint } from './review.helper';
import { GrantType } from 'src/mileages/mileages.enum';
import { Actor } from 'src/events/models/actor.model';

@EventsHandler(ReviewDeletedEvent)
export class ReviewDeletedHandler implements IEventHandler<ReviewDeletedEvent> {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ReviewDeletedEvent) {
    const { userId, placeId } = event;
    // calculate points to recall
    const [current] = await this.eventModel
      .find({ userId, placeId, type: EventType.REVIEW, action: { $in: [EventAction.ADD, EventAction.MOD] }  })
      .sort({ created: -1 })
      .limit(1);
    if (!current) {
      throw new Error('review does not exists');
    }
    // this amount should be recall
    const amount = makeCalculationPoint(current.data);

    const actor = this.publisher.mergeObjectContext(new Actor(userId));
    actor.grantPoint(GrantType.DECREASE, { amount });
    return actor.commit();
  }
}