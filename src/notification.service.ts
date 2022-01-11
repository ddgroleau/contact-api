import { Inject, Injectable } from "@nestjs/common";
import { ContactInterface } from "./interfaces/contact.interface";
import { SmtpAdapterInterface } from "./interfaces/smtpAdapter.interface";
import * as EmailValidator from 'email-validator';

@Injectable()
export class NotificationService {
    private readonly _smtpAdapter : SmtpAdapterInterface;

    constructor(@Inject('SMTP_ADAPTER') smtpAdapter : SmtpAdapterInterface) {
        this._smtpAdapter = smtpAdapter;
    }

    async notify(newContact : ContactInterface) : Promise<void> {
       let isValid:boolean = EmailValidator.validate(newContact.contactEmail);
            if (!isValid) throw new Error('Invalid Contact Email');

        const internalMessage = await this._smtpAdapter.sendMail({
            from:process.env.EMAIL_DAEMON,
            to:process.env.EMAIL_DAEMON,
            subject:`You have received a contact request from ${newContact.contactEmail}}`,
            text:`New contact received. Name: ${newContact.contactName}. Email: ${newContact.contactEmail}.
            Company: ${newContact.contactCompany}. Message: ${newContact.contactMessage}`
        }).catch(()=> { throw new Error("Failed to send internal mail message.")})
        
        const externalMessage = await this._smtpAdapter.sendMail({
            from:process.env.EMAIL_DAEMON,
            to:newContact.contactEmail,
            subject:process.env.MAIL_SUBJECT,
            text:process.env.MAIL_MESSAGE
        }).catch(()=> { throw new Error("Failed to send external mail message.")})
    
        if(internalMessage.rejected.length > 0) throw new Error("Failed to send internal mail message.");
    
        if(externalMessage.rejected.length > 0) throw new Error("Failed to send external mail message.");

        return;
    }
}