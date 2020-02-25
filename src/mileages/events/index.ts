import { IncreasedPointEvent } from './increased-point.event';
import { DecreasedPointEvent } from './decreased-point.event';
import { IncreasedPointHandler } from './increased-point.handler';
import { DecreasedPointHandler } from './decreased-point.handler';

const MileageEventHandlers = [IncreasedPointHandler, DecreasedPointHandler]

export {
  IncreasedPointEvent,
  DecreasedPointEvent,
  MileageEventHandlers,
}