import { Model } from 'mongoose';
import { IEventHandler, EventsHandler, EventPublisher } from '@nestjs/cqrs';
import { ReviewModifiedEvent } from './review-modified.event';
import { InjectModel } from '@nestjs/mongoose';
import { EventType, EventAction } from 'src/events/events.enum';
import { makeCalculationPoint } from './review.helper';
import { Actor } from 'src/events/models/actor.model';
import { GrantType } from 'src/mileages/mileages.enum';

@EventsHandler(ReviewModifiedEvent)
export class ReviewModifiedHandler implements IEventHandler<ReviewModifiedEvent> {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ReviewModifiedEvent) {
    const { userId, placeId, data: modefiedContent } = event;
    const [current] = await this.eventModel
      .find({ userId, placeId, type: EventType.REVIEW, action: { $in: [EventAction.ADD, EventAction.MOD] }  })
      .sort({ created: -1 })
      .limit(1);

    const prevPoint = makeCalculationPoint(modefiedContent); 
    const currentPoint = makeCalculationPoint(current.data);

    const actor = this.publisher.mergeObjectContext(new Actor(userId));
    if (prevPoint === currentPoint) {
      return;
    } else if (prevPoint < currentPoint) {
      actor.grantPoint(GrantType.INCREASE, { amount: (currentPoint - prevPoint) });
      return actor.commit();
    } else {
      actor.grantPoint(GrantType.DECREASE, { amount: (prevPoint - currentPoint) });
      return actor.commit();
    }
  }
}