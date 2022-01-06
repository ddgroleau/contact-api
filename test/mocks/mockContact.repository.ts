import { Injectable } from "@nestjs/common";
import { Contact } from "../../src/schemas/contact.schema";
import { ContactInterface } from "../../src/interfaces/contact.interface";
import { BaseRepository } from "../../src/repositories/base.repository";
import { ContactDocumentInterface } from "../../src/interfaces/contactDocument.interface";

@Injectable()
export class MockContactRepository extends BaseRepository<ContactInterface>  {
    override async create(contactDto: ContactInterface): Promise<ContactInterface> {
        let newContact = new Contact();
        newContact.contactName = contactDto.contactName;
        newContact.contactEmail = contactDto.contactEmail;
        newContact.contactCompany = contactDto.contactCompany;
        newContact.contactMessage = contactDto.contactMessage;
        return Promise.resolve(newContact);
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
            let returnedDocument = mockContactDocuments.filter(x => x._id === conditions._id)[0];
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

export const mockContactDocuments : ContactDocumentInterface[] = [
    {
        _id: '1',
        contactName: 'test1',
        contactEmail: 'test1@mail.com',
        contactCompany: 'testCompany1',
        contactMessage: 'message'
    },
    {
        _id: '2',
        contactName: 'test2',
        contactEmail: 'test2@mail.com',
        contactCompany: 'testCompany2',
        contactMessage: 'message'
    }
]
