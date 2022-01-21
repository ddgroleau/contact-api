import { LogInterface } from "../../src/interfaces/log.interface";
import { ApiLogger } from "../../src/logging/logger.service";
import { mockLog, MockLogRepository } from "../mocks/log.repository.mock";

describe('ApiLogger', () => {
  let apiLogger : ApiLogger;
  let testLog : LogInterface

  beforeEach(() => {
    apiLogger = new ApiLogger(new MockLogRepository());
    testLog = mockLog;
  });
  
  describe('Log/Warn/Error', () => {
    it.each([
      ["log",()=>apiLogger.log(testLog.message)],
      ["warn",()=>apiLogger.warn(testLog.message)],
      ["error",()=>apiLogger.error(testLog.message)],
    ])('returns the log object if successful', (logLevel,logFunc)=> {
        testLog.level = logLevel;
        let actual = logFunc();
        expect(actual).resolves.toStrictEqual(testLog);
      });
  });

  describe('Log/Warn/Error', () => {
    it.each([
      ["log",()=>apiLogger.log(undefined)],
      ["warn",()=>apiLogger.warn(undefined)],
      ["error",()=>apiLogger.error(undefined)],
    ])('returns the error object if unsuccessful', (logLevel,actual)=> {
        testLog.level = logLevel;
        expect(actual).rejects.toThrowError('Failed to save log to database.');
      });
  });

});

