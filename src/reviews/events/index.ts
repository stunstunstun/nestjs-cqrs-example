import { ReviewAddedEvent } from './review-added.event';
import { ReviewPlaceEvent } from './review-place.event';
import { ReviewDeletedEvent } from './review-deleted.event';
import { ReviewModifiedEvent } from './review-modified.event';
import { ReviewAddedHandler } from './review-added.handler';
import { ReviewPlaceHandler } from './review-place.handler';

const ReviewEventHandlers = [
  ReviewAddedHandler,
  ReviewPlaceHandler,
];

export {
  ReviewAddedEvent,
  ReviewPlaceEvent,
  ReviewDeletedEvent,
  ReviewModifiedEvent,
  ReviewEventHandlers,
};