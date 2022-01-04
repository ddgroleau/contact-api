import { ContactInterface } from '../interfaces/contact.interface';

export class ContactDto implements ContactInterface {
    public contactName: string;
    public contactEmail: string;
    public contactPhone: string;
    public contactMessage: string;

    constructor(name:string, email:string, phone?:string, message?:string) {
        this.contactName = name;
        this.contactEmail = email;
        this.contactMessage = message;
        this.contactPhone = phone;
    }
}