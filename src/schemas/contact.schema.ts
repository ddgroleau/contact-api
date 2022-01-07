import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ContactInterface } from "src/interfaces/contact.interface";

export type ContactDocument = Contact & Document;

@Schema()
export class Contact implements ContactInterface {
    @Prop()
    contactName : string;
    
    @Prop()
    contactEmail: string;
   
    @Prop()
    contactCompany: string;
    
    @Prop()
    contactMessage: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);