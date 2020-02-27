import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSchema } from './schemas/event.schema';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

const Event = MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]);

@Module({
  imports: [
    Event,
    CqrsModule,
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
  ],
  exports: [
    Event,
    EventsService,
  ],
})
export class EventsModule {}
