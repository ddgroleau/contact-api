import { Injectable } from "@nestjs/common";
import { ContactDto } from "./dto/contact.dto";
import { ContactInterface } from "./interfaces/contact.interface";
import { FactoryInterface } from "./interfaces/factory.interface";

@Injectable()
export class ContactFactory implements FactoryInterface {
    createDto(contact:ContactInterface):ContactDto{
        return new ContactDto(
            contact.contactName,
            contact.contactEmail,
            contact.contactCompany,
            contact.contactMessage
        );
    }
}