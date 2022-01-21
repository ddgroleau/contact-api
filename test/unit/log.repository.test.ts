import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { LogRepository } from "../../src/repositories/log.repository";
import { mockLog } from "../mocks/log.repository.mock";
import { Contact, ContactSchema } from "../../src/schemas/contact.schema";
import { Log, LogSchmema } from "../../src/schemas/log.schema";

describe('LogRepository', () => {
  let logRepository : LogRepository;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot(),
            MongooseModule.forRoot(`mongodb+srv://master:${process.env.MONGODB_PASSWORD}@master.wpozy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`),
            MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema },{name: Log.name, schema: LogSchmema}])
          ],
        controllers: [],
        providers: [LogRepository],
      }).compile();
    
      logRepository = app.get(LogRepository);
    
    jest.spyOn((logRepository as any).model.prototype, 'save')
      .mockReturnValue(Promise.resolve(mockLog));
  });
  
  test('create() with valid contact should return a saved contact', async () => {
      expect(await logRepository.create(mockLog)).toStrictEqual(mockLog);
  });

});