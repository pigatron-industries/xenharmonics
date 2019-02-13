
import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import * as fs from 'fs';

import {config} from '../../config';

@Service()
export class MidiService implements OnInit {

  private midiStream: fs.ReadStream;

  async $onInit() {
    $log.info('Creating MIDI command listener');
    this.midiStream = fs.createReadStream(config.midiDevice);
    this.midiStream.on('data', this.onMidiStreamData);
  }

  private onMidiStreamData(data: Buffer) {
    console.log(data);
  }

}

