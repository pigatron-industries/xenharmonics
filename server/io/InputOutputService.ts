import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
// import * as pi from 'wiring-pi';


@Service()
export class InputOutputService implements OnInit {

  constructor() {
  }

  $onInit() {
    $log.info('Initialising GPIO.');
    // pi.wiringPiSetup();
  }

}
