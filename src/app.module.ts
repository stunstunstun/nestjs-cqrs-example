import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongodb.module';
import { EventsModule } from './events/events.module';
import { MileagesModule } from './mileages/mileages.module';

@Module({
  imports: [
    MongoDBModule,
    EventsModule,
    MileagesModule,
  ],
})
export class AppModule {}
