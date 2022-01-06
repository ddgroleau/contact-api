import { Injectable } from '@nestjs/common';
import { ContactInterface } from './interfaces/contact.interface';
import { BaseRepository } from './repositories/base.repository';

@Injectable()
export class ContactService {
    constructor(private contactRepository:BaseRepository<ContactInterface>) {};

    async getContacts():Promise<ContactInterface[]>{
        return this.contactRepository.findAll();
    }

    async getContact(conditions:object):Promise<ContactInterface>{
        return this.contactRepository.findOne(conditions);
    }

    async createContact(contactDto:ContactInterface):Promise<ContactInterface>{
        return this.contactRepository.create(contactDto);
    }

    async deleteContact(id:string):Promise<ContactInterface>{
        return this.contactRepository.deleteOne({_id:id});
    }

    async updateContact(id:string,update:object) : Promise<ContactInterface>{
        return this.contactRepository.updateOne({_id:id},update);
    }
}