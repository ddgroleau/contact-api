import { FactoryInterface } from "src/interfaces/factory.interface";

export abstract class BaseRepository<T> {
    protected model:any;
    protected factory:FactoryInterface;

    async create(dto: T): Promise<T> {
        const createdContact= new this.model(dto);
        return this.factory.createDto(await createdContact.save());
    }

    async findAll(): Promise<T[]> {
        let query:T[] = await this.model.find();
        let results:T[]= [];
        query.map(result => {
            let dto:T = this.factory.createDto(result);
            results.push(dto);
        });
        return results;
    }
    
    async findOne(conditions:object) : Promise<T> {
        return this.factory.createDto(await this.model.findOne(conditions));
    }

    async deleteOne(conditions:object) : Promise<T> {
        return this.factory.createDto(await this.model.findOneAndDelete(conditions));
    }

    async updateOne(filter:object, update:object) : Promise<Object> {
        return await this.model.updateOne(filter,update);
    }
}