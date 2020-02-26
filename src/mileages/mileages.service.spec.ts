import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoDBModule } from 'src/mongodb.module';
import { reviewAddedEvent } from '__tests__/fixtures/event.fixture';
import { MileagesModule } from './mileages.module';
import { MileagesService } from './mileages.service';
import { GrantPointDto } from './dto/grant-point.dto';
import { GrantType } from './mileages.enum';
import { EventType } from 'src/events/events.enum';

describe('events.service', () => {
  let app: INestApplication;
  let mileagesService: MileagesService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongoDBModule,
        MileagesModule,
      ],
    }).compile();

    app = module.createNestApplication();
    mileagesService = module.get<MileagesService>(MileagesService);
  });

  test('get a user mileages', async () => {
    const event = await mileagesService.grantPoint(
      reviewAddedEvent.userId,
      new GrantPointDto({ grantType: GrantType.INCREASE, amount: 1 }),
    );
    expect(event).toEqual(
      expect.objectContaining({
        type: EventType.POINT,
        action: GrantType.INCREASE,
      })
    );
    
    const mileages = await mileagesService.getMileages(reviewAddedEvent.userId);
    expect(mileages).toEqual(
      expect.objectContaining({
        userId: reviewAddedEvent.userId,
        amount: expect.any(Number),
      })
    );
  });

  test('update a user mileages', async () => {
    const mileages = await mileagesService.getMileages(reviewAddedEvent.userId);
    
    await mileagesService.grantPoint(
      reviewAddedEvent.userId,
      new GrantPointDto({ grantType: GrantType.INCREASE, amount: 1 }),
    );
    await mileagesService.grantPoint(
      reviewAddedEvent.userId,
      new GrantPointDto({ grantType: GrantType.DECREASE, amount: 1 }),
    );

    const current = await mileagesService.getMileages(reviewAddedEvent.userId);
    expect(mileages.amount).toEqual(current.amount);
  });

  afterAll(async () => app.close());
});