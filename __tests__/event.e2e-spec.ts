import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { reviewAddedEvent } from './fixtures/event.fixture';
import { AppModule } from '../src/app.module';

describe('Event resources', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('POST /events', () => {
    return request(app.getHttpServer())
      .post('/events')
      .send(reviewAddedEvent)
      .expect(204);
  });

  afterEach(async () => app.close())
});
