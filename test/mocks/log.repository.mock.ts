import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../src/repositories/base.repository";
import { LogInterface } from "../../src/interfaces/log.interface";

@Injectable()
export class MockLogRepository extends BaseRepository<LogInterface>  {
    override async create(log: LogInterface): Promise<LogInterface> {
        return new Promise((resolve, reject)=> {
            if(log.message === undefined) reject(()=> { throw new Error('Failed to save log to database.') });
            resolve(log);
        });
    }
}

export const mockLog = {
    message: 'testMessage',
    exception: undefined,
    stackTrace: undefined,
    level: 'log',
    environment: 'test',
    timestamp: new Date().toLocaleString()
};