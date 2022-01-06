import { Test, TestingModule } from '@nestjs/testing';
import { ContactDto } from '../../src/dto/contact.dto';
import { Contact } from '../../src/schemas/contact.schema';
import { ContactController } from '../../src/contact.controller';
import { ContactService } from '../../src/contact.service';
import { BaseRepository } from '../../src/repositories/base.repository';
import { mockContactDocuments, MockContactRepository } from '../mocks/mockContact.repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ContactInterface } from 'src/interfaces/contact.interface';
import { request } from 'express';

describe('ContactController', () => {
  let contactController: ContactController;
  let testContact : ContactInterface

  beforeAll(async () => {
    const contactRepositoryProvider = {
      provide: BaseRepository,
      useClass: MockContactRepository
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [ContactService, contactRepositoryProvider],
    }).compile();
    contactController = app.get<ContactController>(ContactController);
    testContact = new ContactDto('test','test@test.com','testCompany','message');
  });

  test('getContacts() GET should return all contact documents', async() => {
    const result = await contactController.getContacts();
    expect(result).toStrictEqual(mockContactDocuments);
  });

  test('getContacts() GET child errors should cause controller to throw', async() => {
    jest.spyOn((contactController as any).contactService, 'getContacts')
      .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=>contactController.getContacts()).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('getContact() GET(Request) should return one contact', async() => {
    let req = request;
    req.params = {contactName: mockContactDocuments[0].contactName};
    const result = await contactController.getContact(req);
    expect(result).toStrictEqual(mockContactDocuments[0]);
  });

  test('getContact() GET(Request) hild errors should cause controller to throw', async() => {
    jest.spyOn((contactController as any).contactService, 'getContact')
    .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=>contactController.getContact(request)).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('createContact() POST should insert a new document', async () => {
    const result =  await contactController.createContact(testContact);
    expect(result).toBeInstanceOf(Contact);
    expect(result.contactName).toBe(testContact.contactName);
    expect(result.contactEmail).toBe(testContact.contactEmail);
    expect(result.contactCompany).toBe(testContact.contactCompany);
    expect(result.contactMessage).toBe(testContact.contactMessage);
  });

  test('createContact() POST child errors should cause controller to throw', async() => {
    jest.spyOn((contactController as any).contactService, 'createContact')
      .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=>contactController.createContact(testContact)).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('deleteContact() DELETE(id) should delete one contact', async() => {
    const result = await contactController.deleteContact('1');
    expect(result).toStrictEqual(mockContactDocuments[0]);
  });

  test('deleteContact() DELETE(id) should delete one contact', async() => {
    const result = await contactController.deleteContact('1');
    expect(()=>contactController.deleteContact('3')).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('updateContact() PUT(id) returns updated contact', async () => {
    let updatedContact = mockContactDocuments[0];
    updatedContact.contactCompany = 'newCompany';
    const result = await contactController.updateContact(updatedContact._id,{contactCompany: updatedContact.contactCompany});
    expect(result).toStrictEqual(updatedContact);
  });

  test('updateContact() PUT(id) throws if no contact found', async () => {
    expect(()=> contactController.updateContact('3',{contactCompany: 'newCompany'})).rejects.toThrow();
  });

});
