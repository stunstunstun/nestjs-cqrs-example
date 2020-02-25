import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ReviewPlaceEvent } from './review-place.event';

@EventsHandler(ReviewPlaceEvent)
export class ReviewPlaceHandler implements IEventHandler<ReviewPlaceEvent> {
  async handle(event: ReviewPlaceEvent) {
    console.log(event);
    // TODO: grantPoint
  }
}