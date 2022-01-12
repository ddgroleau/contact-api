import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Welcome to the Contact-API! 
    This project is a web API designed to support a contact form. 
    The API uses MongoDB Realm Triggers to send an email notification 
    to both the owner of the contact form and the email address listed 
    by the form user. Check out the repo at https://github.com/ddgroleau/contact-api.
    Built with Typescript/Nest.js.`;
  }
}
