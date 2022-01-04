import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('ContactController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/contact (GET)', () => {
    return request(app.getHttpServer())
      .get('/contact')
      .expect(200)
  });

  test('/contact (POST)', () => {
    return request(app.getHttpServer())
      .post('/contact')
      .expect(201);
  });
});
