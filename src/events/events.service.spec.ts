import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongoDBModule } from 'src/mongodb.module';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { reviewAddedEvent, increasedPointEvent } from '__tests__/fixtures/event.fixture';
import { EventsModule } from './events.module';

describe('events.service', () => {
  let app: INestApplication;
  let eventsService: EventsService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongoDBModule,
        EventsModule,
      ],
    }).compile();

    app = module.createNestApplication();
    eventsService = module.get<EventsService>(EventsService);
  });

  test('get events by userId', async () => {
    const event = await eventsService.createEvent(new CreateEventDto(reviewAddedEvent));
    expect(event).toEqual(
      expect.objectContaining(reviewAddedEvent)
    );
    
    const [firstItem] = await eventsService.getEvents({ userId: event.userId });
    expect(firstItem).toEqual(
      expect.objectContaining(reviewAddedEvent)
    );
  });

  test('create a event that point type', async () => {
    const event = await eventsService.createEvent(new CreateEventDto(increasedPointEvent));
    expect(event).toEqual(
      expect.objectContaining(increasedPointEvent)
    );
  });

  afterAll(async () => app.close());
});