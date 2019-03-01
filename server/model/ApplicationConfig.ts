
import {ChannelConfig} from './ChannelConfig';

export class ApplicationConfig {

  selectedScale: number;
  channelConfig: ChannelConfig[];

  constructor() {
    this.channelConfig = [];
  }

}
