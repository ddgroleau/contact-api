import { LoggerService } from "@nestjs/common";

export abstract class BaseLogger implements LoggerService {
    log(message: string, exception?:string, stackTrace?:string) {
        console.log(message);
    }
    error(message: string, exception?:string, stackTrace?:string) {
        console.error(message);
    }
    warn(message: string, exception?:string, stackTrace?:string) {
        console.warn(message);
    }
}