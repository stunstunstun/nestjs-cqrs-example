import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { MileageSchema } from './schemas/mileage.schema';
import { MileagesController } from './Mileages.controller';
import { EventsModule } from 'src/events/events.module';
import { ReviewsModule } from 'src/reviews/reviews.module';
import { MileagesService } from './mileages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mileage', schema: MileageSchema }]),
    CqrsModule,
    EventsModule,
    ReviewsModule,
  ],
  controllers: [MileagesController],
  providers: [MileagesService],
})
export class MileagesModule {}
