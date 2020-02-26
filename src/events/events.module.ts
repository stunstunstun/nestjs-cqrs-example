import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSchema } from './schemas/event.schema';
import { EventsController } from './events.controller';
import { ReviewEventHandlers } from 'src/reviews/events';
import { MileageEventHandlers } from 'src/mileages/events';
import { EventsService } from './events.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    CqrsModule,
  ],
  controllers: [EventsController],
  providers: [
    ...ReviewEventHandlers,
    ...MileageEventHandlers,
    EventsService,
  ],
  exports: [EventsService],
})
export class EventsModule {}
