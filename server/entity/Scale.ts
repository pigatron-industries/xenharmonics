import {Model, Unique} from '@tsed/mongoose';
import {IgnoreProperty, Required} from '@tsed/common';

@Model()
export class Scale {

  @IgnoreProperty()
  _id: string;

  @Unique()
  @Required()
  name: string;



}
