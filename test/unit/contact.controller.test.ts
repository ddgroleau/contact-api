import { Test, TestingModule } from '@nestjs/testing';
import { ContactDto } from '../../src/dto/contact.dto';
import { Contact } from '../../src/schemas/contact.schema';
import { ContactController } from '../../src/contact.controller';
import { ContactService } from '../../src/contact.service';
import { BaseRepository } from '../../src/repositories/base.repository';
import { mockContactDocuments, MockContactRepository } from '../mocks/mockContact.repository';

describe('ContactController', () => {
  let contactController: ContactController;

  beforeEach(async () => {
    const contactRepositoryProvider = {
      provide: BaseRepository,
      useClass: MockContactRepository
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [ContactService, contactRepositoryProvider],
    }).compile();
    contactController = app.get<ContactController>(ContactController);
  });

  test('GET should return all contact documents', async() => {
    const result = await contactController.getContacts();
    expect(result).toStrictEqual(mockContactDocuments);
  });

  test('GET should return all contact documents', async() => {
    const result = await contactController.getContacts();
    expect(result).toStrictEqual(mockContactDocuments);
  });

  test('POST should insert a new document', async () => {
    let testContact = new ContactDto('test','test@test.com','testCompany','message');
    const result =  await contactController.createContact(testContact);
    expect(result).toBeInstanceOf(Contact);
    expect(result.contactName).toBe(testContact.contactName);
    expect(result.contactEmail).toBe(testContact.contactEmail);
    expect(result.contactCompany).toBe(testContact.contactCompany);
    expect(result.contactMessage).toBe(testContact.contactMessage);
  });

});
