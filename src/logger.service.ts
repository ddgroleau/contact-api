
import { Injectable, LoggerService, Scope } from '@nestjs/common';
import { LogInterface } from './interfaces/log.interface';
import { BaseRepository } from './repositories/base.repository';

@Injectable({ scope: Scope.TRANSIENT })
export class ApiLogger implements LoggerService {
    constructor(private logRepository:BaseRepository<LogInterface>) {};

  log(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "log", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  }

  error(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "error", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  }

  warn(message: string, exception?:string, stackTrace?:string) {
    return this.logRepository.create({
        message: message, 
        level: "warn", 
        exception: exception,
        stackTrace:stackTrace,
        timestamp: new Date().toLocaleString(),
        environment: process.env.NODE_ENV
    }).then(log => log).catch(err => { throw err });
  }
}
