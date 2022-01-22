import { Test, TestingModule } from '@nestjs/testing';
import { ContactDto } from '../../src/dto/contact.dto';
import { ContactController } from '../../src/contact.controller';
import { ContactService } from '../../src/contact.service';
import { BaseRepository } from '../../src/repositories/base.repository';
import { mockContactDocuments, MockContactRepository, mockUpdateResponse } from '../mocks/contact.repository.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ContactInterface } from '../../src/interfaces/contact.interface';
import { request } from 'express';
import { BaseLogger } from '../../src/logging/base.logger';
import { MockLogger } from '../mocks/log.service.mock';

describe('ContactController', () => {
  let contactController: ContactController;
  let testContact : ContactInterface

  beforeAll(async () => {
    const contactRepositoryProvider = {
      provide: BaseRepository,
      useClass: MockContactRepository
    };
    const loggerProvider = {
      provide: BaseLogger,
      useClass: MockLogger
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [ContactService, contactRepositoryProvider, loggerProvider],
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
    request.params = {contactName: mockContactDocuments[0].contactName};
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
    expect(result).toStrictEqual(testContact);
  });

  test('createContact() POST child errors should cause controller to throw', async() => {
    jest.spyOn((contactController as any).contactService, 'createContact')
      .mockReturnValueOnce(Promise.reject(new Error()));
    expect(()=>contactController.createContact(testContact)).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('deleteContact() DELETE(id) should delete one contact', async() => {
    request.params = {contactName: mockContactDocuments[0].contactName};
    const result = await contactController.deleteContact(request);
    expect(result).toStrictEqual(mockContactDocuments[0]);
  });

  test('deleteContact() DELETE(id) should delete one contact', async() => {
    request.params = {contactName:'test3'};
    expect(()=>contactController.deleteContact(request)).rejects.toThrowError(new HttpException('Bad Request', HttpStatus.BAD_REQUEST));
  });

  test('updateContact() PUT(id) returns update response', async () => {
    let updatedContact = mockContactDocuments[0];
    updatedContact.contactCompany = 'newCompany';
    request.params = {contactName: mockContactDocuments[0].contactName};
    const result = await contactController.updateContact(request,{contactCompany: updatedContact.contactCompany});
    expect(result).toStrictEqual(mockUpdateResponse);
  });

  test('updateContact() PUT(id) throws if no contact found', async () => {
    request.params = {contactName:'test3'};
    expect(()=> contactController.updateContact(request,{contactCompany: 'newCompany'})).rejects.toThrow();
  });

});
