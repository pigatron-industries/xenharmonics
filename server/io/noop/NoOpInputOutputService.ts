import {$log} from 'ts-log-debug';
import {InputOutputServiceInterface, ByteOrder, PinMode} from '../InputOutputServiceInterface';

export class NoOpInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  setup() {
    $log.info('Initialising NoOp GPIO.');
  }

  public setPinMode(pin: number, mode: PinMode) {
    $log.debug('setPinMode ' + pin + ' ' + mode);
  }

  digitalWrite(pin: number, state: boolean) {
    $log.debug('digitalWrite ' + pin + ' ' + state);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    $log.debug('shiftOut ' + dataPin + ' ' + clockPin + ' ' + order + ' ' + value);
  }

  /* tslint:disable:no-bitwise */
  public shiftOut16(dataPin: number, clockPin: number, value: number) {
    $log.debug('shiftOut16');
    for (let i = 15; i >= 0; i--) {
      const bit = value & (1 << i) ? 1 : 0;
    }
  }
  /* tslint:enable:no-bitwise */

}
