import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Scale} from '../model/Scale';


@Service()
export class ScaleService {

  constructor(@Inject(Scale) private scaleModel: MongooseModel<Scale>) {
  }

  async getAll(): Promise<Scale[]> {
    return await this.scaleModel.find().exec();
  }

  async findById(id: string): Promise<Scale> {
    return await this.scaleModel.findById(id).exec();
  }

  async save(scale: Scale): Promise<Scale> {
    const model = new this.scaleModel(scale);
    await model.update(scale, {upsert: true});
    return model;
  }

}
