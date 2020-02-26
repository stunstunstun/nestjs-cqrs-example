import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ReviewAddedEvent } from './review-added.event';
import { makeCalculationPoint } from './review.helper';

@EventsHandler(ReviewAddedEvent)
export class ReviewAddedHandler implements IEventHandler<ReviewAddedEvent> {
  async handle(event: ReviewAddedEvent) {
    const { userId, data } = event;

    const point = makeCalculationPoint(data);
    console.log(userId, point);
    // TODO: grantPoint
  }
}