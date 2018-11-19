import {$log} from 'ts-log-debug';
import * as pi from 'wiring-pi';
import {InputOutputServiceInterface, ByteOrder} from '../InputOutputServiceInterface';
import {HIGH, LOW} from 'node-wiring-pi';


export class PiInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  public setup() {
    $log.info('Initialising Raspberry Pi GPIO.');
    pi.wiringPiSetup();
  }

  digitalWrite(pin: number, state: boolean) {
    pi.digitalWrite(pin, state ? HIGH : LOW);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    pi.shiftOut(dataPin, clockPin, order, value);
  }

}
