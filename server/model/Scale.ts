import {Model, Unique} from '@tsed/mongoose';
import {Property, Required} from '@tsed/common';
import {Description} from '@tsed/swagger';

@Model()
export class Scale {

  @Property()
  _id: string;

  @Unique()
  @Required()
  @Description('Name of the scale')
  name: string;

  @Property()
  @Description('Description of the scale')
  description: string;

  @Required()
  @Description('The notes in a single octave of the scale. Values in cents.')
  notesCents: number[];

  @Description('The number od cents when the next octave starts. e.g. 1200')
  octaveCents: number;

}
