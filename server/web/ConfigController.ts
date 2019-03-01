import {BodyParams, Controller, Get, Put, QueryParams, Required} from '@tsed/common';
import {ConfigService} from '../service/app/ConfigService';
import {ChannelConfig} from '../model/ChannelConfig';

@Controller('/config')
export class ConfigController {

  constructor(private configService: ConfigService) {
  }

  @Get('/channel')
  get(): ChannelConfig[] {
    return this.configService.getChannelConfigs();
  }

  @Put('/channel')
  save(@BodyParams() channelConfig: ChannelConfig[]): ChannelConfig[] {
    return this.configService.setChannelConfig(channelConfig);
  }

}
