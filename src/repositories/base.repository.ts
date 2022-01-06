
export abstract class BaseRepository<T> {
    protected model:any;

    async create(dto: T): Promise<T> {
        const createdContact= new this.model(dto);
        return createdContact.save();
    }

    async findAll(): Promise<T[]> {
        return this.model.find();
    }
    
    async findOne(conditions:object) : Promise<T> {
        return this.model.findOne(conditions);
    }

    async deleteOne(conditions:object) : Promise<T> {
        return this.model.findOneAndDelete(conditions)
    }

    async updateOne(filter:object, update:object) : Promise<object> {
        return this.model.updateOne(filter,update);
    }
}