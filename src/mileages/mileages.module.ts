import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MileageSchema } from './schemas/mileage.schema';
import { MileagesController } from './mileages.controller';
import { MileagesService } from './mileages.service';
import { MileageEventHandlers } from './events';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mileage', schema: MileageSchema }]),
    EventsModule,
  ],
  controllers: [
    MileagesController,
  ],
  providers: [
    ...MileageEventHandlers,
    MileagesService,
  ],
  exports: [
    MileagesService,
  ]
})
export class MileagesModule {}
