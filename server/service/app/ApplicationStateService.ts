import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import {ApplicationState} from '../../model/ApplicationState';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';
import {StorageService} from '../storage/StorageSevice';


@Service()
export class ApplicationStateService implements OnInit {

  private applicationState: ApplicationState;

  constructor(private scaleService: ScaleService,
              private storageService: StorageService) {
  }

  $onInit() {
    this.createState();
  }

  async createState() {
    if (!this.applicationState) {
      $log.info('Creating initial application state');
      this.applicationState = new ApplicationState();
    } else {
      return this.applicationState;
    }
  }

  async getState(): Promise<ApplicationState> {
    return this.applicationState;
  }

  async getSelectedScale(): Promise<Scale> {
    return this.scaleService.findById(this.applicationState.selectedScale);
  }

  async setSelectedScale(scaleId: number): Promise<Scale> {
    this.applicationState.selectedScale = scaleId;
    return this.getSelectedScale();
  }

}
