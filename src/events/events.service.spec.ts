import { Test } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { EventSchema } from './schemas/event.schema'
import { reviewAddedEvent } from '__tests__/fixtures/event.fixture'

describe('events.service', () => {
  let app
  let eventsService: EventsService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/mileages', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }),
        MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
      ],
      providers: [EventsService],
    }).compile();

    app = module.createNestApplication()
    eventsService = module.get<EventsService>(EventsService);
  })

  test('get events by userId', async () => {
    const event = await eventsService.createEvent(new CreateEventDto(reviewAddedEvent));
    expect(event).toEqual(
      expect.objectContaining(reviewAddedEvent)
    );
    
    const [firstItem] = await eventsService.getUserEvents(event.userId);
    expect(firstItem).toEqual(
      expect.objectContaining(reviewAddedEvent)
    );
  })

  afterEach(async () => {
    await app.close();
  })
})