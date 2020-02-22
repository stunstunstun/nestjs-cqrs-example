import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EventSchema } from './schemas/event.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])
  ],
})
export class EventsModule {}
