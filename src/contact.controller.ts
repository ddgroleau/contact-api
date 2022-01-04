import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Redirect } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ContactInterface } from './interfaces/contact.interface';
import { Contact } from './schemas/contact.schema';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('contact')
  async getContacts(): Promise<ContactInterface[]> {
    try {
        return await this.contactService.getContacts();
      } 
      catch(error) 
      {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
  }

  @Post('contact')
  @HttpCode(201)
  async createContact(@Body() contactDto: ContactDto) : Promise<ContactInterface> {
      try {
        return await this.contactService.createContact(contactDto);
      } 
      catch(error) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
  }
}
