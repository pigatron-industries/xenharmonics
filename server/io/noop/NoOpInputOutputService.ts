import {$log} from 'ts-log-debug';
import {InputOutputServiceInterface, ByteOrder, PinMode} from '../InputOutputServiceInterface';

export class NoOpInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  setup() {
    $log.info('Initialising NoOp GPIO.');
  }

  public setPinMode(pin: number, mode: PinMode) {
    $log.info('setPinMode ' + pin + ' ' + mode);
  }

  digitalWrite(pin: number, state: boolean) {
    $log.info('digitalWrite ' + pin + ' ' + state);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    $log.info('shiftOut ' + dataPin + ' ' + clockPin + ' ' + order + ' ' + value);
  }

  /* tslint:disable:no-bitwise */
  public shiftOut16(dataPin: number, clockPin: number, value: number) {
    $log.info('shiftOut16');
    for (let i = 15; i >= 0; i--) {
      const bit = value & (1 << i) ? 1 : 0;
      $log.info(bit);
    }
  }
  /* tslint:enable:no-bitwise */

}
