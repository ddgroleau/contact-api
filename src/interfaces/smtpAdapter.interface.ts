export interface SmtpAdapterInterface {
    sendMail(mailOptions:{from:string,to:string,subject:string,text:string}): Promise<any>;
}
