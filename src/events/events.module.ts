import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EventSchema } from './schemas/event.schema'
import { EventsController } from './events.controller'
import { EventsService } from './events.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])
  ],
  controllers: [
    EventsController,
  ],
  providers: [
    EventsService,
  ],
})
export class EventsModule {}
