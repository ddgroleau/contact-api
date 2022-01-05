import { Injectable } from "@nestjs/common";
import { Contact } from "../../src/schemas/contact.schema";
import { ContactInterface } from "../../src/interfaces/contact.interface";
import { BaseRepository } from "../../src/repositories/base.repository";

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
