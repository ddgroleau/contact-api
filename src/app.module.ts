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

const contactRepositoryProvider = {
  provide: BaseRepository,
  useClass: ContactRepository
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService, contactRepositoryProvider, ContactFactory],
})
export class AppModule {}
