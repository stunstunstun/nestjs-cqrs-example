import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ReviewDeletedEvent } from './review-deleted.event';

@EventsHandler(ReviewDeletedEvent)
export class ReviewDeletedHandler implements IEventHandler<ReviewDeletedEvent> {
  async handle(event: ReviewDeletedEvent) {
    console.log(event);
    // TODO: calculate points to recall
    // TODO: grant point as trigging POINT event
  }
}