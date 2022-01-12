import { Test, TestingModule } from '@nestjs/testing';
import { MockSmtpAdapter } from '../mocks/smtp.adapter.mock';
import { NotificationService } from '../../src/notification.service';
import { Contact } from '../../src/schemas/contact.schema';

describe('NotificationController', () => {
  let notificationService: NotificationService;
  let failEmail = 'failEmail';
  let newContact = new Contact();

  beforeAll(async () => {
    const smtpFactory = {
      provide: 'SMTP_ADAPTER',
      useClass: MockSmtpAdapter
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [NotificationService,smtpFactory],
    }).compile();

    notificationService = app.get(NotificationService);
  });

  beforeEach(()=> {
    newContact.contactCompany = 'testCompany';
    newContact.contactMessage = 'testMessage';
    newContact.contactName = 'testName';
    newContact.contactEmail = 'test@mail.com';
  })

  test('notify() throws if invalid email', async ()=> {
    newContact.contactEmail = failEmail;
    expect(()=> notificationService.notify(newContact)).rejects.toThrowError(new Error('Invalid Contact Email'));
  });

  test('notify() throws if internalMail fails', async ()=> {
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=> notificationService.notify(newContact)).rejects.toThrowError(new Error('Failed to send internal mail message.'));
  });

  test('notify() throws if externalMail fails', async ()=> {
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValueOnce(Promise.resolve({}));
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=> notificationService.notify(newContact)).rejects.toThrowError(new Error('Failed to send external mail message.'));
  });

  test('notify() throws if internalMail destination rejects', async ()=> {
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValueOnce(Promise.resolve({rejected:[newContact.contactEmail]}));
    expect(()=> notificationService.notify(newContact)).rejects.toThrowError(new Error('Failed to send internal mail message.'));
  });

  test('notify() throws if externalMail destination rejects', async ()=> {
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValueOnce(Promise.resolve({rejected:[]}));
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
        .mockReturnValueOnce(Promise.resolve({rejected:[newContact.contactEmail]}));
    expect(()=> notificationService.notify(newContact)).rejects.toThrowError(new Error('Failed to send external mail message.'));
  });

  test('notify() succeeds if both mail messages succeed', async ()=> {
    jest.spyOn((notificationService as any)._smtpAdapter, 'sendMail')
      .mockReturnValue(Promise.resolve({rejected:[]}));
    expect(await notificationService.notify(newContact)).toBeUndefined();
  });

});
