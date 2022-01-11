import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockSmtpAdapter } from '../mocks/mockSmtp.adapter';
import { NotificationController } from '../../src/notification.controller';
import { NotificationService } from '../../src/notification.service';
import { Contact } from '../../src/schemas/contact.schema';

describe('NotificationController', () => {
  let notificationController: NotificationController;
  let failEmail = 'failEmail';
  let successEmail = 'successEmail@mail.com';

  beforeAll(async () => {
    const smtpFactory = {
      provide: 'SMTP_ADAPTER',
      useClass: MockSmtpAdapter
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationService,smtpFactory],
    }).compile();
    notificationController = app.get<NotificationController>(NotificationController);
  });

  test('notify() POST returns OK', async ()=> {
    expect(await notificationController.notify(new Contact())).toBe(HttpStatus.OK);
  });

});
