import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { DecreasedPointEvent } from './decreased-point.event';

@EventsHandler(DecreasedPointEvent)
export class DecreasedPointHandler implements IEventHandler<DecreasedPointEvent> {
  async handle(event: DecreasedPointEvent) {
    console.log(event);
    // TODO: update document
  }
}