import { IEventHandler, EventsHandler, EventPublisher } from '@nestjs/cqrs';
import { ReviewAddedEvent } from './review-added.event';
import { makeCalculationPoint } from './review.helper';
import { GrantType } from 'src/mileages/mileages.enum';
import { Injectable } from '@nestjs/common';
import { Actor } from 'src/events/models/actor.model';

@Injectable()
@EventsHandler(ReviewAddedEvent)
export class ReviewAddedHandler implements IEventHandler<ReviewAddedEvent> {
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ReviewAddedEvent) {
    const { userId, data } = event;

    const amount = makeCalculationPoint(data);
    const actor = this.publisher.mergeObjectContext(new Actor(userId));
    actor.grantPoint(GrantType.INCREASE, { amount });

    return actor.commit();
  }
}