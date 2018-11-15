import {IgnoreProperty, Required} from '@tsed/common';
import {Description} from '@tsed/swagger';

export class ControlVoltage {

  @Required()
  @Description('Channel number this voltage is output to')
  channel: number;

  @Required()
  @Description('Voltage in volts')
  voltage: number;

  @IgnoreProperty()
  bytes: number[];

  constructor(channel: number, voltage: number) {
    this.channel = channel;
    this.voltage = voltage;
    this.calcBytes();
  }

  private calcBytes() {
    // TODO
  }

  public getBytes(): number[] {
    return this.bytes;
  }
}
