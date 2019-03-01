import {$log} from 'ts-log-debug';
import * as pi from 'node-wiring-pi';
import {InputOutputServiceInterface, ByteOrder, PinMode} from '../InputOutputServiceInterface';


export class PiInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  public setup() {
    $log.info('Initialising Raspberry Pi GPIO.');
    pi.wiringPiSetupGpio();
  }

  public setPinMode(pin: number, mode: PinMode) {
    pi.pinMode(pin, mode === PinMode.INPUT ? pi.FSEL_INPT : pi.FSEL_OUTP);
  }

  public digitalWrite(pin: number, state: boolean) {
    pi.digitalWrite(pin, state ? pi.HIGH : pi.LOW);
  }

  public shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number) {
    pi.shiftOut(dataPin, clockPin, order === ByteOrder.LSBFIRST ? pi.LSBFIRST : pi.MSBFIRST, value);
  }

  /* tslint:disable:no-bitwise */
  public shiftOut16(dataPin: number, clockPin: number, value: number) {
    for (let i = 15; i >= 0; i--) {
      pi.digitalWrite(dataPin, value & (1 << i) ? pi.HIGH : pi.LOW);
      pi.digitalWrite(clockPin, pi.HIGH);
      pi.digitalWrite(clockPin, pi.LOW);
    }
  }
  /* tslint:enable:no-bitwise */



}
