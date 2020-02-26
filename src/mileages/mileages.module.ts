<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MileageSchema } from './schemas/mileage.schema';
import { MileagesController } from './mileages.controller';
import { MileagesService } from './mileages.service';
import { MileageEventHandlers } from './events';
import { EventsModule } from 'src/events/events.module';
=======
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MileageSchema } from './schemas/mileage.schema';
import { MileagesController } from './mileages.controller';
import { EventsModule } from 'src/events/events.module';
import { MileagesService } from './mileages.service';
>>>>>>> master

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mileage', schema: MileageSchema }]),
<<<<<<< HEAD
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
=======
    forwardRef(() => EventsModule),
  ],
  controllers: [MileagesController],
  providers: [
    MileagesService,
  ],
>>>>>>> master
})
export class MileagesModule {}
