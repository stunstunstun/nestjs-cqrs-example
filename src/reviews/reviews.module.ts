import { Module } from '@nestjs/common';
import { ReviewEventHandlers } from './events';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    ...ReviewEventHandlers,
  ],
})
export class ReviewsModule {}
