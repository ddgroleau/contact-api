import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ContactInterface } from './interfaces/contact.interface';
import { Request } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getContacts(): Promise<ContactInterface[]> {
    try {
        return await this.contactService.getContacts();
      } 
      catch(error) 
      {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
  }

  @Get()
  async getContact(@Req() request: Request): Promise<ContactInterface> {
      try {
        let conditions = request.params;
        return await this.contactService.getContact(conditions);
      } 
      catch(error) 
      {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
  }

  @Post()
  @HttpCode(201)
  async createContact(@Body() contactDto: ContactDto) : Promise<ContactInterface> {
      try {
        return await this.contactService.createContact(contactDto);
      } 
      catch(error) {
        throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
      }
  }

  @Delete(':id')
  async deleteContact(@Param('id') id: string) : Promise<ContactInterface> {
    try {
      return await this.contactService.deleteContact(id);
    } 
    catch(error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  async updateContact(@Param('id') id: string, @Body() update:object) : Promise<ContactInterface> {
    try {
      return await this.contactService.updateContact(id,update);
    } 
    catch(error) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
  }
}
