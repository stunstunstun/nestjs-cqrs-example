import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // TODO: Configure environments values with dotenv
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/mileages', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  ],
})
export class MongoDBModule {}
