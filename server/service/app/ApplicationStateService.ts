import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import {ApplicationState} from '../../model/ApplicationState';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';
import {StorageService} from '../storage/StorageSevice';
import {ChannelConfig} from '../../model/ChannelConfig';

@Service()
export class ApplicationStateService implements OnInit {

  private applicationState: ApplicationState;

  constructor(private scaleService: ScaleService) {
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

  public async getState(): Promise<ApplicationState> {
    return this.applicationState;
  }

  public async getSelectedScale(): Promise<Scale> {
    return this.scaleService.findById(this.applicationState.selectedScale);
  }

  public async setSelectedScale(scaleId: number): Promise<Scale> {
    this.applicationState.selectedScale = scaleId;
    return this.getSelectedScale();
  }

  public getChannelConfig(channel: number): ChannelConfig {
    return this.applicationState.channelConfig[channel];
  }

}
