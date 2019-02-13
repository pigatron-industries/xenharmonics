
import {ChannelConfig} from './ChannelConfig';

export class ApplicationState {

  selectedScale: number;
  channelConfig: ChannelConfig[];

  constructor() {
    this.channelConfig = [];
  }

}
