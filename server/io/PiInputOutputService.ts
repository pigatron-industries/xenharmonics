import {$log} from 'ts-log-debug';
import * as pi from 'wiring-pi';
import {InputOutputServiceInterface} from './InputOutputServiceInterface';


export class PiInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  setup() {
    $log.info('Initialising Raspberry Pi GPIO.');
    pi.wiringPiSetup();
  }

}
