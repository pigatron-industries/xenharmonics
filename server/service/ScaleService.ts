import {Inject, Service} from '@tsed/common';
import {MongooseModel} from '@tsed/mongoose';
import {Scale} from '../entity/Scale';


@Service()
export class ScaleService {

  constructor(@Inject(Scale) private scaleModel: MongooseModel<Scale>) {
    console.log(scaleModel);
  }

  async findById(id: string): Promise<Scale> {
    return await this.scaleModel.findById(id).exec();
  }

  async save(scale: Scale): Promise<Scale> {
    const model = new this.scaleModel(scale);
    await model.save();
    return model;
  }

}
