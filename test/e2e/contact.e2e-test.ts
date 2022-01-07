import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ObjectId } from 'mongodb';
import { ContactRepository } from '../../src/repositories/contact.repository';
import { ContactInterface } from '../../src/interfaces/contact.interface';
import { BaseRepository } from '../../src/repositories/base.repository';

describe('ContactController (e2e)', () => {
  let app: INestApplication;
  let contactRepository : ContactRepository;

  beforeAll(async () => {
    const contactRepositoryProvider = {
      provide: BaseRepository,
      useClass: ContactRepository
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  })

  test('/contact (GET)', () => {
    return request(app.getHttpServer())
      .get('/contact')
      .expect(200);
  });

  test('/contact:id (GET)', () => {
    let id = new ObjectId('61d4e964bea6ae82272fb191');
    return request(app.getHttpServer())
      .get('/contact')
      .expect(200)
  });

  test('/contact (POST)', () => {
    let testContact:ContactInterface= {
      contactName:'postTest',
      contactEmail:'postEmail',
      contactCompany:'postCompany',
      contactMessage:'postMessage'
    };
    type CreatedResponse = {
      _id:ObjectId,
      __v:number
    };
    let createdResponse:CreatedResponse;
    return request(app.getHttpServer())
      .post('/contact?')
      .send(testContact)
      .expect(201)
      .expect(typeof createdResponse);
  });
});
