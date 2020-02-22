import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from 'src/events/events.module'

@Module({
  // TODO: Configure environments values with dotenv
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mileages'),
    EventsModule,
  ],
})
export class AppModule {}
