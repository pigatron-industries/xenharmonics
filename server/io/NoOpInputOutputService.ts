import {$log} from 'ts-log-debug';
import {InputOutputServiceInterface} from './InputOutputServiceInterface';

export class NoOpInputOutputService implements InputOutputServiceInterface {

  constructor() {
  }

  setup() {
    $log.info('Initialising NoOp GPIO.');
  }

}
