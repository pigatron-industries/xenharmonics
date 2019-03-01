import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import {ApplicationConfig} from '../../model/ApplicationConfig';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';
import {StorageService} from '../storage/StorageSevice';
import {ChannelConfig} from '../../model/ChannelConfig';

const CONFIG_KEY = 'xen_config';

@Service()
export class ConfigService implements OnInit {

  private applicationConfig: ApplicationConfig;

  constructor(private storageService: StorageService,
              private scaleService: ScaleService) {
  }

  $onInit() {
    this.loadState();
  }

  private async loadState() {
    const config = await this.storageService.load(CONFIG_KEY);
    if (config) {
      this.applicationConfig = config;
    } else {
      $log.info('Creating default application config');
      this.applicationConfig = new ApplicationConfig();

      const defaultConfig = new ChannelConfig();
      defaultConfig.midiChannel = 0;
      defaultConfig.noteVoltageChannel = 0;
      defaultConfig.noteVoltageStart = 0;

      this.applicationConfig.channelConfig.push(defaultConfig);
      this.save();
    }
  }

  public save() {
    this.storageService.save(CONFIG_KEY, this.applicationConfig);
  }

  public getConfig(): ApplicationConfig {
    return this.applicationConfig;
  }

  public getSelectedScale(): Scale {
    return this.scaleService.findById(this.applicationConfig.selectedScale);
  }

  public setSelectedScale(scaleId: number): Scale {
    this.applicationConfig.selectedScale = scaleId;
    this.save();
    return this.getSelectedScale();
  }

  public getChannelConfigs(): ChannelConfig[] {
    return this.applicationConfig.channelConfig;
  }

  public getChannelConfig(channel: number): ChannelConfig {
    return this.applicationConfig.channelConfig[channel];
  }

  public setChannelConfig(channelConfig: ChannelConfig[]): ChannelConfig[] {
    this.applicationConfig.channelConfig = channelConfig;
    this.save();
    return this.applicationConfig.channelConfig;
  }

}
