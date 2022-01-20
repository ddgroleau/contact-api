import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { LogInterface } from "src/interfaces/log.interface";

export type LogDocument = Log & Document;

@Schema()
export class Log implements LogInterface {
    @Prop()
    environment:string;
    @Prop()
    level:string;
    @Prop()
    message:string;
    @Prop()
    timestamp:string;
    @Prop()
    exception:string;
    @Prop()
    stackTrace:string;
}

export const LogSchmema = SchemaFactory.createForClass(Log);