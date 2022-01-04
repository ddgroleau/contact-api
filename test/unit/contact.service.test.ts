import { ContactDto } from '../../src/dto/contact.dto';
import { Contact } from '../../src/schemas/contact.schema';
import { ContactService } from '../../src/contact.service';
import { mockContactDocuments, MockContactRepository } from '../mocks/mockContact.repository';

describe('ContactService', () => {
  let contactService : ContactService;

  beforeEach(() => {
    contactService = new ContactService(new MockContactRepository);
  });
  
  test('GET should return all contact documents', async () => {
      const result = await contactService.getContacts();
      expect(result).toStrictEqual(mockContactDocuments);
  });

  test('POST should insert a new document', async () => {
    const result = await contactService.createContact(new ContactDto('test','test@test.com','5555555555','message'))
    expect(result).toBeInstanceOf(Contact);
  });
});

