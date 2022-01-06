import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { ContactRepository } from "../../src/repositories/contact.repository";
import { Contact, ContactSchema } from "../../src/schemas/contact.schema";

describe('ContactRepository', () => {
  let contactRepository : ContactRepository;
  let mockContact : Contact;

  beforeAll(async () => {
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
    mockContact.contactName = 'testName';
    mockContact.contactEmail = 'test@mail.com';
    mockContact.contactCompany ='testCompany';
    mockContact.contactMessage ='testMessage';

    let mongoObj : { _id:ObjectId, __v:Number} = { _id:new ObjectId('testId123456'), __v:0 };

    jest.spyOn((contactRepository as any).model.prototype, 'save')
      .mockReturnValue(Promise.resolve(mongoObj));
    jest.spyOn((contactRepository as any).model, 'find')
      .mockReturnValueOnce(Promise.resolve([mockContact,mockContact]));
    jest.spyOn((contactRepository as any).model, 'findOne')
      .mockReturnValueOnce(Promise.resolve(mockContact));
    jest.spyOn((contactRepository as any).model, 'findOneAndDelete')
      .mockReturnValueOnce(Promise.resolve(mockContact));
    jest.spyOn((contactRepository as any).model, 'updateOne')
      .mockReturnValueOnce(Promise.resolve(mockContact));
  });
  
  test('create() with valid contact should return a saved contact', async () => {
      const result:any = await contactRepository.create(mockContact);
      expect(result._id).toBeInstanceOf(ObjectId);
      expect(result._id).toStrictEqual(new ObjectId('testId123456'));
      expect(result.__v).toBe(0);
  });

  test('findAll() with should return array of contacts', async () => {
    const result:any = await contactRepository.findAll();
    expect(result).toStrictEqual([mockContact,mockContact]);
  });

  test('findOne() with should return a contact', async () => {
    const result:any = await contactRepository.findOne({contactName:'testName'});
    expect(result).toStrictEqual(mockContact);
  });

  test('deleteOne() with should return a deleted contact', async () => {
    const result:any = await contactRepository.deleteOne({contactName:'testName'});
    expect(result).toStrictEqual(mockContact);
  });

  test('update() with should return an updated contact', async () => {
    const result:any = await contactRepository.updateOne({contactName:'testName'},{contactCompany:mockContact.contactCompany});
    expect(result).toStrictEqual(mockContact);
  });

});