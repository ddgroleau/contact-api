import { Test, TestingModule } from "@nestjs/testing";
import { ContactDto } from "../../src/dto/contact.dto";
import { ContactFactory } from "../../src/contact.factory";
import { ContactInterface } from "../../src/interfaces/contact.interface";

describe('ContactFactory', () => {
    let contactFactory: ContactFactory;
    let testContact:ContactInterface;
  
    beforeAll(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [],
        providers: [ContactFactory],
      }).compile();
      contactFactory = app.get(ContactFactory);
      testContact = {
        contactName: 'test',
        contactEmail: 'test@mail.com',
        contactCompany: 'testCompany',
        contactMessage: 'testMessage'
      }
    });
  
    test('createContactDto() should return a new ContactDto', async() => {
        expect(contactFactory.createDto(testContact)).toMatchObject(testContact as ContactDto);
    });

});