import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CqrsModule } from '@nestjs/cqrs'
import { EventSchema } from './schemas/event.schema'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'
import { EventHandlers } from './handlers'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    CqrsModule,
  ],
  controllers: [
    EventsController,
  ],
  providers: [
    EventsService,
    ...EventHandlers,
  ],
})
export class EventsModule {}
