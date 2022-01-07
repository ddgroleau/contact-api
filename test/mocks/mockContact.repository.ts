import { Injectable } from "@nestjs/common";
import { Contact } from "../../src/schemas/contact.schema";
import { ContactInterface } from "../../src/interfaces/contact.interface";
import { BaseRepository } from "../../src/repositories/base.repository";
import { ContactDto } from "../../src/dto/contact.dto";

@Injectable()
export class MockContactRepository extends BaseRepository<ContactInterface>  {
    override async create(contactDto: ContactInterface): Promise<ContactInterface> {
        return Promise.resolve(contactDto);
    }

    override async findAll(): Promise<ContactInterface[]> {
        return Promise.resolve(mockContactDocuments);
    }

    override async findOne(conditions: object): Promise<ContactInterface> {
        return Promise.resolve(
            mockContactDocuments.map(contact => {
                for (const [key, value] of Object.entries(contact)) {
                    if(value === conditions[key]) return contact;
                }
            })[0]
        );
    }

    override async deleteOne(conditions:any): Promise<ContactInterface> {
            let returnedDocument = mockContactDocuments.map(contact => {
                    for (const [key, value] of Object.entries(contact)) {
                        if(value === conditions[key]) return contact;
                    }
                })[0];
            if(!returnedDocument) throw new Error();
            return Promise.resolve(returnedDocument);
    }

    override async updateOne(filter: object, update: object): Promise<ContactInterface> {
        let docToUpdate = mockContactDocuments.map(contact => {
            for (const [key, value] of Object.entries(contact)) {
                if(value === filter[key]) return contact;
            }
        })[0];
        for (const [key, value] of Object.entries(update)) {
            if(docToUpdate[key]) {
                docToUpdate[key] = value;
            }
        }
        return docToUpdate;
    }
};

export const mockContactDocuments : ContactInterface[] = [
    {
        contactName: 'test1',
        contactEmail: 'test1@mail.com',
        contactCompany: 'testCompany1',
        contactMessage: 'message'
    },
    {
        contactName: 'test2',
        contactEmail: 'test2@mail.com',
        contactCompany: 'testCompany2',
        contactMessage: 'message'
    }
]

export const mockContact:Contact = new Contact();
    mockContact.contactName   ='testName';
    mockContact.contactEmail  ='test@mail.com';
    mockContact.contactCompany='testCompany';
    mockContact.contactMessage='testMessage';

export const mockContactDto:ContactDto = new ContactDto(
    mockContact.contactName,
    mockContact.contactEmail,
    mockContact.contactCompany,
    mockContact.contactMessage,
);