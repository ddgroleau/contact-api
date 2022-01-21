import { Module, ConsoleLogger } from '@nestjs/common';
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
import { SmtpAdapter } from './smtp.adapter';
import { ApiLogger } from './logging/logger.service';
import { Log, LogSchmema } from './schemas/log.schema';
import { BaseLogger } from './logging/base.logger';

const contactRepositoryProvider = {
  provide: BaseRepository,
  useClass: ContactRepository
};

const loggerProvider = {
  provide: BaseLogger,
  useClass: ApiLogger
};

const smtpProvider = {
  provide: 'SMTP_ADAPTER',
  useClass: SmtpAdapter
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema },{name: Log.name, schema: LogSchmema}])
  ],
  controllers: [AppController, ContactController, NotificationController],
  providers: [AppService, ContactService, contactRepositoryProvider, ContactFactory, NotificationService, smtpProvider, loggerProvider],
})
export class AppModule {}
