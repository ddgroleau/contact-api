
import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogInterface } from '../interfaces/log.interface';
import { BaseRepository } from '../repositories/base.repository';
import { BaseLogger } from './base.logger';

@Injectable({ scope: Scope.TRANSIENT })
export class ApiLogger extends BaseLogger {
    constructor(private logRepository:BaseRepository<LogInterface>) {
      super();
    };

    public override log(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "log", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  };

  public override error(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "error", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  };

  public override warn(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "warn", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  };
}

