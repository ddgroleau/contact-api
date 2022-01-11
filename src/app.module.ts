import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { ConfigModule } from '@nestjs/config';
import { ContactRepository } from './repositories/contact.repository';
import { BaseRepository } from './repositories/base.repository';
import { ContactFactory } from './contact.factory';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import nodemailer from 'nodemailer'

const contactRepositoryProvider = {
  provide: BaseRepository,
  useClass: ContactRepository
};

const smtpFactory = {
  provide: 'SMTP_ADAPTER',
  useFactory: () => nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_DAEMON,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN,
    }
  })
}

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
  ],
  controllers: [AppController, ContactController, NotificationController],
  providers: [AppService, ContactService, contactRepositoryProvider, ContactFactory, NotificationService, smtpFactory],
})
export class AppModule {}
