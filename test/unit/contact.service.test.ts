import { ContactDto } from '../../src/dto/contact.dto';
import { Contact } from '../../src/schemas/contact.schema';
import { ContactService } from '../../src/contact.service';
import { ContactInterface } from '../../src/interfaces/contact.interface';
import { mockContactDocuments, MockContactRepository } from '../mocks/mockContact.repository';

describe('ContactService', () => {
  let contactService : ContactService;

  beforeEach(() => {
    contactService = new ContactService(new MockContactRepository);
  });
  
  test('getContacts() should return all contact documents', async () => {
      const result = await contactService.getContacts();
      expect(result).toStrictEqual(mockContactDocuments);
  });

  test('getContact() should return one contact document', async () => {
    const result = await contactService.getContact({contactName: 'test1'});
    expect(result).toStrictEqual(mockContactDocuments[0]);
  });

  test('createContact() should insert a new document', async () => {
    const result = await contactService.createContact(new ContactDto('test','test@test.com','testCompany','message'))
    expect(result).toBeInstanceOf(Contact);
  });

  test('deleteContact() deletes contact', async () => {
    const result = await contactService.deleteContact('1');
    expect(result).toStrictEqual(mockContactDocuments[0]);
  });

  test('deleteContact() throws if no contact found', async () => {
    expect(()=> contactService.deleteContact('3')).rejects.toThrow();
  });

  test('updateContact() returns updated contact', async () => {
    let updatedContact = mockContactDocuments[0];
    updatedContact.contactCompany = 'newCompany';
    const result = await contactService.updateContact(updatedContact._id,{contactCompany: updatedContact.contactCompany});
    expect(result).toStrictEqual(updatedContact);
  });

  test('updateContact() throws if no contact found', async () => {
    expect(()=> contactService.updateContact('3',{contactCompany: 'newCompany'})).rejects.toThrow();
  });

});

