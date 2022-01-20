import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "./base.repository";
import { LogInterface } from "src/interfaces/log.interface";
import { Log, LogDocument } from "src/schemas/log.schema";

@Injectable()
export class LogRepository extends BaseRepository<LogInterface>  {
    constructor(@InjectModel(Log.name) injectedModel: Model<LogDocument>) {
        super();
        this.model = injectedModel;
    };
    
    public override async create(log: LogInterface): Promise<LogInterface> {
        const createdContact= new this.model(log);
        return await createdContact.save();
    }
    
}