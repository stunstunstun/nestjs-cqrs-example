import { AggregateRoot } from '@nestjs/cqrs';
import { EventAction } from 'src/events/events.enum';
import { ReviewAddedEvent } from 'src/events/handlers/review-added.event'
import { ReviewPlaceEvent } from 'src/events/handlers/review-place.event';
import { ReviewModifiedEvent } from 'src/events/handlers/review-modified.event';
import { ReviewDeletedEvent } from 'src/events/handlers/review-deleted.event';

export class Actor extends AggregateRoot {
  constructor(private readonly userId: string) {
    super();
  }

  reviewPlace(action: string, placeId: string, data: any) {
    switch (action) {
      case EventAction.ADD:
        this.apply(new ReviewPlaceEvent(this.userId, placeId));
        return this.apply(new ReviewAddedEvent(this.userId, data));
      case EventAction.MOD:
        return this.apply(new ReviewModifiedEvent(this.userId, data));
      case EventAction.DELETE:
        return this.apply(new ReviewDeletedEvent(this.userId, data));
      default:
        throw new Error(`this ${action} action does not exists`)
    }
  }
}