import { SmtpAdapterInterface } from "src/interfaces/smtpAdapter.interface";

export class MockSmtpAdapter implements SmtpAdapterInterface {
    async sendMail(mailOptions:{from:string,to:string,subject:string,text:string}) : Promise<Object> {
        return {};
    }
}
