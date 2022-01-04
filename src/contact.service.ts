import { Injectable } from '@nestjs/common';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ContactInterface } from './interfaces/contact.interface';
import { BaseRepository } from './repositories/base.repository';

@Injectable()
export class ContactService {
    constructor(private contactRepository:BaseRepository<ContactInterface>) {};

    async getContacts():Promise<ContactInterface[]>{
        return this.contactRepository.findAll();
    }

    async createContact(contactDto:ContactInterface):Promise<Contact>{
        return this.contactRepository.create(contactDto);
    }
}