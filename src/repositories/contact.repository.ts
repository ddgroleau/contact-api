import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactInterface } from "../interfaces/contact.interface";
import { Contact, ContactDocument } from "../schemas/contact.schema";
import { BaseRepository } from "./base.repository";

@Injectable()
export class ContactRepository extends BaseRepository<ContactInterface>  {
    constructor(@InjectModel(Contact.name) injectedModel: Model<ContactDocument>) {
        super();
        this.model = injectedModel;
    };
}