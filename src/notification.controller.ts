import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { ContactInterface } from "./interfaces/contact.interface";
import { NotificationService } from "./notification.service";
import { SentMessageInfo } from "nodemailer";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @HttpCode(201)
  async notify(@Body() newContact : ContactInterface): Promise<SentMessageInfo> {
        await this.notificationService.notify(newContact)
            .catch(()=>{ throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST) });
        return HttpStatus.CREATED;
  }
}