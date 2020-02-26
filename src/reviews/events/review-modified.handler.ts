import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ReviewModifiedEvent } from './review-modified.event';

@EventsHandler(ReviewModifiedEvent)
export class ReviewModifiedHandler implements IEventHandler<ReviewModifiedEvent> {
  async handle(event: ReviewModifiedEvent) {
    console.log(event);
    // TODO: grantPoint
  }
}