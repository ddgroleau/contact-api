import { Body, ConsoleLogger, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req } from "@nestjs/common";
import { ContactInterface } from "./interfaces/contact.interface";
import { NotificationService } from "./notification.service";
import { SentMessageInfo } from "nodemailer";
import { BaseLogger } from "./logging/base.logger";

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService, private logger: BaseLogger) {}

  @Post()
  @HttpCode(201)
  async notify(@Body() newContact : ContactInterface): Promise<SentMessageInfo> {
        await this.notificationService.notify(newContact)
            .catch(() => { 
              this.logger.error(`NotificationController.notify() failed to notify new contact with email: ${newContact.contactEmail}.`);
              throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
            });
        return HttpStatus.CREATED;
  }
}