import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, LoggerService, Param, Post, Put, Req } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ContactInterface } from './interfaces/contact.interface';
import { Request } from 'express';
import { BaseLogger } from './logging/base.logger';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService, private logger: BaseLogger) {}

  @Get()
  async getContact(@Req() request: Request): Promise<ContactInterface|HttpException> {
      let conditions = request.params;
        return await this.contactService.getContact(conditions)
          .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Get('all')
  async getContacts(): Promise<ContactInterface[]|HttpException> {
      return await this.contactService.getContacts()
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Post()
  @HttpCode(201)
  async createContact(@Body() contactDto: ContactDto) : Promise<ContactInterface|HttpException> {
      return await this.contactService.createContact(contactDto)
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Delete()
  async deleteContact(@Req() request: Request) : Promise<ContactInterface|HttpException> {
    let conditions = request.params;
      return await this.contactService.deleteContact(conditions)
        .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }

  @Put()
  async updateContact(@Req() request: Request, @Body() update:object) : Promise<Object|HttpException>{
    let conditions = request.params;
      return await this.contactService.updateContact(conditions,update)
        .catch(()=> { throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }
}
