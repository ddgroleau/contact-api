import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Model, Mongoose, Schema } from "mongoose";
import { ContactRepository } from "../../src/repositories/contact.repository";
import { Contact, ContactDocument, ContactSchema } from "../../src/schemas/contact.schema";


describe('ContactRepository', () => {
  let contactRepository : ContactRepository;
  let mockContact : Contact;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot(),
            MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
            MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
          ],
        controllers: [],
        providers: [ContactRepository],
      }).compile();
    
    contactRepository = app.get(ContactRepository);
    
    mockContact = new Contact();
    mockContact.contactName = 'test',
    mockContact.contactEmail = 'test@mail.com',
    mockContact.contactCompany = 'testCompany',
    mockContact.contactMessage = 'message'
   
  });

  
  test('create() should return a saved contact', async () => {
      const result = await contactRepository.create(mockContact);
      expect(result).toStrictEqual(mockContact);
  });


});