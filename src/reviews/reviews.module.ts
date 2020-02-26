import { Module } from '@nestjs/common';
import { ReviewEventHandlers } from './events';

@Module({
  providers: [
    ...ReviewEventHandlers,
  ],
})
export class ReviewsModule {}
