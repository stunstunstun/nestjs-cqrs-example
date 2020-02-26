import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MileageSchema } from './schemas/mileage.schema';
import { MileagesController } from './Mileages.controller';
import { EventsModule } from 'src/events/events.module';
import { MileagesService } from './mileages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Mileage', schema: MileageSchema }]),
    forwardRef(() => EventsModule),
  ],
  controllers: [MileagesController],
  providers: [
    MileagesService,
  ],
})
export class MileagesModule {}
