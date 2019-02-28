import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import {ApplicationState} from '../../model/ApplicationState';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';
import {StorageService} from '../storage/StorageSevice';
import {ChannelConfig} from '../../model/ChannelConfig';

const CONFIG_KEY = 'xen_config';

@Service()
export class ApplicationStateService implements OnInit {

  private applicationState: ApplicationState;

  constructor(private storageService: StorageService,
              private scaleService: ScaleService) {
  }

  $onInit() {
    this.loadState();
  }

  private async loadState() {
    const config = await this.storageService.load(CONFIG_KEY);
    if (config) {
      this.applicationState = config;
    } else {
      $log.info('Creating default application config');
      this.applicationState = new ApplicationState();

      const defaultConfig = new ChannelConfig();
      defaultConfig.midiChannel = 0;
      defaultConfig.noteVoltageChannel = 0;
      defaultConfig.noteVoltageStart = 0;

      this.applicationState.channelConfig.push(defaultConfig);
      this.save();
    }
  }

  public save() {
    this.storageService.save(CONFIG_KEY, this.applicationState);
  }

  public getState(): ApplicationState {
    return this.applicationState;
  }

  public getSelectedScale(): Scale {
    return this.scaleService.findById(this.applicationState.selectedScale);
  }

  public setSelectedScale(scaleId: number): Scale {
    this.applicationState.selectedScale = scaleId;
    return this.getSelectedScale();
  }

  public getChannelConfig(channel: number): ChannelConfig {
    return this.applicationState.channelConfig[channel];
  }

}
