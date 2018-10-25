import {Required} from '@tsed/common';
import {Description} from '@tsed/swagger';

export class ControlVoltage {

  @Required()
  @Description('Voltage in volta')
  voltage: number;

}
