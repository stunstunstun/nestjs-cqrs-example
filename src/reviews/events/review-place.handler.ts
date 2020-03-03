import { Model } from 'mongoose';
import { IEventHandler, EventsHandler, EventPublisher } from '@nestjs/cqrs';
import { ReviewPlaceEvent } from './review-place.event';
import { Actor } from 'src/events/models/actor.model';
import { GrantType } from 'src/mileages/mileages.enum';
import { InjectModel } from '@nestjs/mongoose';
import { EventType, EventAction } from 'src/events/events.enum';

const OCCUPIED_ACTIONS = Object.freeze([EventAction.ADD, EventAction.MOD]);
const FIRST_PLACE_REVIEWED_POINT = 1;

@EventsHandler(ReviewPlaceEvent)
export class ReviewPlaceHandler implements IEventHandler<ReviewPlaceEvent> {
  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
    private readonly publisher: EventPublisher,
  ) {}

  async handle(event: ReviewPlaceEvent) {
    const { userId, placeId } = event;
    // check if a review is already in place
    const [review] = await this.eventModel
      .find({ type: EventType.REVIEW, placeId })
      .sort({ created: -1 })
      .limit(1);
    if (review && OCCUPIED_ACTIONS.includes(review.action) ) {
      return;
    }
    // grant point as trigging POINT event
    const actor = this.publisher.mergeObjectContext(new Actor(userId));
    actor.grantPoint(GrantType.INCREASE, { amount: FIRST_PLACE_REVIEWED_POINT });
    return actor.commit();
  }
}