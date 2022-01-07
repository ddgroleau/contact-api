import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ContactInterface } from './interfaces/contact.interface';
import { Request } from 'express';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  async getContacts(): Promise<ContactInterface[]|HttpException> {
      return await this.contactService.getContacts()
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Get()
  async getContact(@Req() request: Request): Promise<ContactInterface|HttpException> {
        let conditions = request.params;
        return await this.contactService.getContact(conditions)
          .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Post()
  @HttpCode(201)
  async createContact(@Body() contactDto: ContactDto) : Promise<ContactInterface|HttpException> {
      return await this.contactService.createContact(contactDto)
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Delete(':id')
  async deleteContact(@Req() request: Request) : Promise<ContactInterface|HttpException> {
    let conditions = request.params;
      return await this.contactService.deleteContact(conditions)
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Put()
  async updateContact(@Req() request: Request, @Body() update:object) : Promise<ContactInterface|HttpException>{
    let conditions = request.params;
      return await this.contactService.updateContact(conditions,update)
        .catch(()=> { throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }
}
