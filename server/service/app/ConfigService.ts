import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import {ApplicationConfig} from '../../model/ApplicationConfig';
import {Scale} from '../../model/Scale';
import {ScaleService} from './ScaleService';
import {StorageService} from '../storage/StorageSevice';
import {ChannelConfig} from '../../model/ChannelConfig';
import {config as hwConfig} from '../../config';

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
      this.applicationConfig.selectedScale = 1;

      this.defaultChannelConfig();
    }
  }

  public defaultChannelConfig() {
    // default to 8 midi channels mapped to same output channels
    const maxChannels = hwConfig.gateOutputChannels;

    for (let i = 0; i < maxChannels; i++) {
      const defaultChannelConfig = new ChannelConfig();
      defaultChannelConfig.midiChannel = i;

      if (hwConfig.dacOutputChannels <= i) {
        defaultChannelConfig.noteVoltageChannel = i;
      } else {
        defaultChannelConfig.noteVoltageChannel = null;
      }
      defaultChannelConfig.noteVoltageStart = 0;

      if (hwConfig.gateOutputChannels <= i) {
        defaultChannelConfig.gateChannel = i;
      } else {
        defaultChannelConfig.gateChannel = null;
      }
      this.applicationConfig.channelConfig.push(defaultChannelConfig);
    }

    this.save();
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
