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
  bytes: number[];

  constructor(channel: number, voltage: number) {
    this.channel = channel;
    this.voltage = voltage;
    this.bytes = [0, 0];
    this.calcBytes();
  }

  /* tslint:disable:no-bitwise */
  private calcBytes() {
    let intValue = Math.round((((this.voltage - MIN_FLOAT_VALUE) * RANGE_BINARY) / RANGE_FLOAT) + MIN_BINARY_VALUE);
    for (let i = 0; i < this.bytes.length; i++) {
      const byte = intValue & 0xff;
      this.bytes[i] = byte;
      intValue = (intValue - byte) / 256;
    }
  }
  /* tslint:enable:no-bitwise */

  public getBytes(): number[] {
    return this.bytes;
  }

  public setVoltage(voltage: number) {
    this.voltage = voltage;
    this.calcBytes();
  }

  public getIntValue(): number {
    return Math.round((((this.voltage - MIN_FLOAT_VALUE) * RANGE_BINARY) / RANGE_FLOAT) + MIN_BINARY_VALUE);
  }
}
