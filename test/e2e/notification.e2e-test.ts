import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleLogger, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { ContactRepository } from '../../src/repositories/contact.repository';
import { ContactInterface } from '../../src/interfaces/contact.interface';
import { BaseRepository } from '../../src/repositories/base.repository';
import { SmtpAdapter } from '../../src/smtp.adapter';
import { ApiLogger } from '../../src/logging/logger.service';
import { BaseLogger } from '../../src/logging/base.logger';

describe('NotificationController (e2e)', () => {
    let app: INestApplication;
    let testContact:ContactInterface;
  
    beforeAll(async () => {
      const contactRepositoryProvider = {
        provide: BaseRepository,
        useClass: ContactRepository
      };

      const smtpProvider = {
        provide: 'SMTP_ADAPTER',
        useClass: SmtpAdapter
      };

      const loggerProvider = {
        provide: BaseLogger,
        useClass: ApiLogger
      };
      
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      await app.init();

      testContact = {
        contactName:'notifyTest',
        contactEmail:process.env.EMAIL_DAEMON,
        contactCompany:'notifyCompany',
        contactMessage:'notifyMessage'
      };

    });

    test('/notification (POST)', () => {
        return request(app.getHttpServer())
          .post('/notification')
          .send(testContact)
          .expect(201)
          .expect(HttpStatus.CREATED)
      });


});