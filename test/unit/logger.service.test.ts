import { LogInterface } from "../../src/interfaces/log.interface";
import { ApiLogger } from "../../src/logger.service";
import { MockLogRepository } from "../mocks/log.repository.mock";

describe('ApiLogger', () => {
  let apiLogger : ApiLogger;
  let testLog : LogInterface

  beforeEach(() => {
    apiLogger = new ApiLogger(new MockLogRepository());
    testLog = {
        message: 'testMessage',
        exception: undefined,
        stackTrace: undefined,
        level: 'log',
        environment: 'test',
        timestamp: new Date().toLocaleString()
    };
  });

  test('log returns the log object if successful', ()=> {
    expect(()=>apiLogger.log(testLog.message)).resolves.toStrictEqual(testLog);
  });
  test('log returns the error object if unsuccessful', ()=> {
    expect(()=>apiLogger.log(testLog.message)).rejects.toThrowError('Failed to save log to database.');
  });
  

});

