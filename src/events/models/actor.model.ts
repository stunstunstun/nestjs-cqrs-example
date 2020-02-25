import { AggregateRoot } from '@nestjs/cqrs';
import { EventAction } from 'src/events/events.enum';
import { ReviewAddedEvent, ReviewPlaceEvent, ReviewModifiedEvent, ReviewDeletedEvent } from 'src/reviews/events';
import { IncreasedPointEvent, DecreasedPointEvent } from 'src/mileages/events';

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
        throw new Error(`this ${action} action does not exists`);
    }
  }

  grantPoint(action: string, data: any) {
    const { amount } = data;
    switch (action) {
      case EventAction.INCREASE:
        return this.apply(new IncreasedPointEvent(this.userId, amount));
      case EventAction.DESCREASE:
        return this.apply(new DecreasedPointEvent(this.userId, amount));
      default:
        throw new Error(`this ${action} action does not exists`);
    }
  }
}