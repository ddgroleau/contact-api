import { Body, Controller, Get, HttpException, HttpStatus, Req } from "@nestjs/common";
import { Request } from 'express';
import { ContactInterface } from "./interfaces/contact.interface";
import { NotificationService } from "./notification.service";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async notify(@Body() newContact : ContactInterface): Promise<HttpStatus|HttpException> {
        return HttpStatus.OK
          //.catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
  }
}