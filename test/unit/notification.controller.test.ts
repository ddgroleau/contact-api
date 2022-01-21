import { ConsoleLogger, HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockSmtpAdapter } from '../mocks/smtp.adapter.mock';
import { NotificationController } from '../../src/notification.controller';
import { NotificationService } from '../../src/notification.service';
import { Contact } from '../../src/schemas/contact.schema';
import { ConfigModule } from '@nestjs/config';

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let failEmail = 'failEmail';
  let newContact = new Contact();

  beforeAll(async () => {
    const smtpFactory = {
      provide: 'SMTP_ADAPTER',
      useClass: MockSmtpAdapter
    }
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
      ],
      controllers: [NotificationController],
      providers: [NotificationService,smtpFactory,ConsoleLogger],
    }).compile();
    notificationController = app.get<NotificationController>(NotificationController);
  });

  beforeEach(()=> {
    newContact.contactCompany = 'testCompany';
    newContact.contactMessage = 'testMessage';
    newContact.contactName = 'testName';
    newContact.contactEmail = 'test@mail.com';
  })

  test('notify() POST returns OK', async ()=> {
    expect(await notificationController.notify(newContact)).toBe(HttpStatus.CREATED);
  });

  test('notify() POST throws if invalid email', async ()=> {
    newContact.contactEmail = failEmail;
    expect(()=> notificationController.notify(newContact)).rejects.toThrowError(
      new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

});
