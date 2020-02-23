import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { ReviewPlaceEvent } from './review-place.event';

@EventsHandler(ReviewPlaceEvent)
export class ReviewPlaceHandler implements IEventHandler<ReviewPlaceEvent> {
  async handle(event: ReviewPlaceEvent) {
    const { userId, placeId } = event
    console.log(userId, placeId)
  }
}