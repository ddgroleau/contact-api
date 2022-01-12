import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ObjectId } from "mongodb";
import { ContactFactory } from "../../src/contact.factory";
import { ContactRepository } from "../../src/repositories/contact.repository";
import { Contact, ContactSchema } from "../../src/schemas/contact.schema";
import { mockContact, mockContactDto, mockUpdateResponse } from "../mocks/contact.repository.mock";

describe('ContactRepository', () => {
  let contactRepository : ContactRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot(),
            MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
            MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
          ],
        controllers: [],
        providers: [ContactRepository,ContactFactory],
      }).compile();
    
    contactRepository = app.get(ContactRepository);
    
    jest.spyOn((contactRepository as any).model.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockContact));
    jest.spyOn((contactRepository as any).model, 'find')
      .mockReturnValueOnce(Promise.resolve([mockContact,mockContact]));
    jest.spyOn((contactRepository as any).model, 'findOne')
      .mockReturnValueOnce(Promise.resolve(mockContact));
    jest.spyOn((contactRepository as any).model, 'findOneAndDelete')
      .mockReturnValueOnce(Promise.resolve(mockContact));
    jest.spyOn((contactRepository as any).model, 'updateOne')
      .mockReturnValueOnce(Promise.resolve(mockUpdateResponse));
  });
  
  test('create() with valid contact should return a saved contact', async () => {
      const result:any = await contactRepository.create(mockContact);
      expect(result).toStrictEqual(mockContactDto);
  });

  test('findAll() with should return array of contacts', async () => {
    const result:any = await contactRepository.findAll();
    expect(result).toStrictEqual([mockContactDto,mockContactDto]);
  });

  test('findOne() with should return a contact', async () => {
    const result:any = await contactRepository.findOne({contactName:'testName'});
    expect(result).toStrictEqual(mockContactDto);
  });

  test('deleteOne() with should return a deleted contact', async () => {
    const result:any = await contactRepository.deleteOne({contactName:'testName'});
    expect(result).toStrictEqual(mockContactDto);
  });

  test('update() with should return an updated contact', async () => {
    const result:any = await contactRepository.updateOne({contactName:'testName'},{contactCompany:mockContact.contactCompany});
    expect(result).toStrictEqual(mockUpdateResponse);
  });

});