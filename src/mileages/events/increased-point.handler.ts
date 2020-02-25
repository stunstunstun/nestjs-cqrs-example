import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { IncreasedPointEvent } from './increased-point.event';

@EventsHandler(IncreasedPointEvent)
export class IncreasedPointHandler implements IEventHandler<IncreasedPointEvent> {
  async handle(event: IncreasedPointEvent) {
    console.log(event);
    // TODO: update document
  }
}