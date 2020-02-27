import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { reviewAddedEvent } from './fixtures/event.fixture';
import { AppModule } from '../src/app.module';

describe('Mileage resources', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));

    await app.init();
  });

  describe('POST /mileage/:userId', () => {
    test('Bad request', async () => {
      return request(app.getHttpServer())
        .post(`/mileages/${reviewAddedEvent.userId}`)
        .send({
          grantType: 'UNKNOWN',
          amount: 1,
        })
        .expect(400);
    });

    test('Grant points to user', async () => {
      return request(app.getHttpServer())
        .post(`/mileages/${reviewAddedEvent.userId}`)
        .send({
          grantType: 'INCREASE',
          amount: 1,
        })
        .expect(204);
    });
  });

  describe('GET /mileages/:userId', () => {
    test('Not found a resource', async () => {
      return request(app.getHttpServer())
        .get(`/mileages/${reviewAddedEvent.userId}00`)
        .expect(404);
    });

    test('Get a user mileages', async () => {
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
  });

  afterAll(async () => app.close());
});
