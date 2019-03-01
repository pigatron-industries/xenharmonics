import {IgnoreProperty, Required} from '@tsed/common';
import {Description} from '@tsed/swagger';


export class GateOutput {

  @Required()
  @Description('Channel number this voltage is output to')
  channel: number;

  @Required()
  @Description('Voltage in volts')
  value: boolean;


  constructor(channel: number, value: boolean) {
    this.channel = channel;
    this.value = value;
  }

  public setValue(value: boolean) {
    this.value = value;
  }
}
