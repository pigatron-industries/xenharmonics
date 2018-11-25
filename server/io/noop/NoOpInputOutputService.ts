import {$log} from 'ts-log-debug';
import {InputOutputServiceInterface, ByteOrder} from '../InputOutputServiceInterface';

export class NoOpInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  setup() {
    $log.info('Initialising NoOp GPIO.');
  }

  digitalWrite(pin: number, state: boolean) {
    $log.info('digitalWrite ' + pin + ' ' + state);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    $log.info('shiftOut ' + dataPin + ' ' + clockPin + ' ' + order + ' ' + value);
  }

}