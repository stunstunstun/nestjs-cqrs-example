import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ReviewEventHandlers } from 'src/reviews/events';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    ...ReviewEventHandlers,
  ],
})
export class ReviewsModule {}
