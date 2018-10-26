import {IgnoreProperty, Property} from '@tsed/common';
import {Model, Ref} from '@tsed/mongoose';
import {Scale} from './Scale';

@Model()
export class ApplicationState {

  @Property()
  _id: string;

  @Ref(Scale)
  selectedScale: Ref<Scale>;

}
