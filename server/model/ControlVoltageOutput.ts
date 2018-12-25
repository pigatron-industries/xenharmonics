import {IgnoreProperty, Required} from '@tsed/common';
import {Description} from '@tsed/swagger';

const MAX_FLOAT_VALUE = 10;
const MIN_FLOAT_VALUE = -10;

const MAX_BINARY_VALUE = 65535;
const MIN_BINARY_VALUE = 0;

const RANGE_FLOAT = MAX_FLOAT_VALUE - MIN_FLOAT_VALUE;
const RANGE_BINARY = MAX_BINARY_VALUE - MIN_BINARY_VALUE;


export class ControlVoltageOutput {

  @Required()
  @Description('Channel number this voltage is output to')
  channel: number;

  @Required()
  @Description('Voltage in volts')
  voltage: number;

  @IgnoreProperty()
  intValue: number;

  constructor(channel: number, voltage: number) {
    this.channel = channel;
    this.voltage = voltage;
    this.calcIntValue();
  }

  public setVoltage(voltage: number) {
    this.voltage = voltage;
    this.calcIntValue();
  }

  private calcIntValue() {
    this.intValue = Math.round((((this.voltage - MIN_FLOAT_VALUE) * RANGE_BINARY) / RANGE_FLOAT) + MIN_BINARY_VALUE);
  }

  public getIntValue(): number {
    return this.intValue;
  }
}
