import {$log} from 'ts-log-debug';
import * as pi from 'wiring-pi';
import {InputOutputServiceInterface, ByteOrder} from './InputOutputServiceInterface';


export class PiInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  public setup() {
    $log.info('Initialising Raspberry Pi GPIO.');
    pi.wiringPiSetup();
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    pi.shiftOut(dataPin, clockPin, order, value);
  }

}
