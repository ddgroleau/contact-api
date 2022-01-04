export abstract class BaseRepository<T> {
    protected model:any;

    async create(contactDto: T): Promise<T> {
        const createdContact = new this.model(contactDto);
        return createdContact.save();
    }

    async findAll(): Promise<T[]> {
        return this.model.find().exec();
    }
    
    async findOne(conditions:object) : Promise<T> {
        return this.model.findOne(conditions).exec();
    }

    async deleteOne(conditions:object) : Promise<T> {
        return this.model.findOneAndDelete(conditions).exec();
    }

    async updateOne(filter:object, update:object) : Promise<object> {
        return this.model.updateOne(filter,update).exec();
    }
}