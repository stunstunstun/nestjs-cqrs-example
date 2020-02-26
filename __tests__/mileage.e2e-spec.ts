import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { reviewAddedEvent } from './fixtures/event.fixture';
import { AppModule } from '../src/app.module';

describe('Mileage resources', () => {
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

  it('POST /mileage/:userId', () => {
    return request(app.getHttpServer())
      .post(`/mileages/${reviewAddedEvent.userId}`)
      .send({
        grantType: 'INCREASE',
        amount: 1.0,
      })
      .expect(200);
  });

  it('GET /mileage/:userId', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/mileages/${reviewAddedEvent.userId}`)
      .expect(200);

    expect(body).toEqual(
      expect.objectContaining({
        userId: reviewAddedEvent.userId,
        amount: expect.any(Number),
      })
    );
  });

  afterAll(async () => app.close());
});
