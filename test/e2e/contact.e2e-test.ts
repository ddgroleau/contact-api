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
  let testContact:ContactInterface;

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
  });

  beforeAll(()=> {
    testContact = {
      contactName:'postTest',
      contactEmail:'postEmail',
      contactCompany:'postCompany',
      contactMessage:'postMessage'
    };
  });

  test('/contacts (POST)', () => {
    return request(app.getHttpServer())
      .post('/contacts')
      .send(testContact)
      .expect(201)
      .expect(testContact);
  });

  test('/contact (GET)', () => {
    return request(app.getHttpServer())
      .get('/contacts/all')
      .expect(200)
      .expect([testContact]);
  });

  test('/contact request (GET)', () => {
    return request(app.getHttpServer())
      .get('/contacts')
      .query({contactName:testContact.contactName})
      .expect(200)
      .expect(testContact);
  });

  test('/contact  (PUT)', () => {
    testContact.contactMessage = 'update';
    return request(app.getHttpServer())
      .put('/contacts')
      .query({contactName:testContact.contactName})
      .send({contactMessage:testContact.contactMessage})
      .expect(200)
  });

  test('/contact  (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/contacts')
      .query(`contactName=${testContact.contactName}`)
      .expect(200)
      .expect(testContact);
  });

});
