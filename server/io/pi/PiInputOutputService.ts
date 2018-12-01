import {$log} from 'ts-log-debug';
import * as pi from 'node-wiring-pi';
import {InputOutputServiceInterface, ByteOrder} from '../InputOutputServiceInterface';


export class PiInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  public setup() {
    $log.info('Initialising Raspberry Pi GPIO.');
    pi.wiringPiSetupGpio();
  }

  digitalWrite(pin: number, state: boolean) {
    pi.digitalWrite(pin, state ? pi.HIGH : pi.LOW);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    pi.shiftOut(dataPin, clockPin, order, value);
  }

}
