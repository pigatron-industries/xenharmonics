
import {OnInit, Service} from '@tsed/common';
import {$log} from 'ts-log-debug';
import * as fs from 'fs';

import {config} from '../../config';
import {MidiMessage} from './MidiMessage';

@Service()
export class MidiService implements OnInit {

  private midiStream: fs.ReadStream;

  async $onInit() {
    $log.info('Creating MIDI command listener');
    this.midiStream = fs.createReadStream(config.midiDevice);
    const that = this;
    this.midiStream.on('data', (data) => {
      that.onMidiStreamData(data);
    });
  }

  private onMidiStreamData(data: Buffer) {
    let i = 0;
    while (i < data.length) {

      const message = new MidiMessage();
      message.command = this.getMidiCommand(data[i]);
      message.channel = this.getMidiChannel(data[i]);

      if (message.command === MidiMessage.COMMAND_NOTE_ON ||
          message.command === MidiMessage.COMMAND_NOTE_OFF ||
          message.command === MidiMessage.COMMAND_PRESSURE ||
          message.command === MidiMessage.COMMAND_CONTROL_CHANGE ||
          message.command === MidiMessage.COMMAND_PITCH_BEND) {
        message.data1 = data[i + 1];
        message.data2 = data[i + 2];
        i = i + 3;
      } else {
        message.command = 0;
        i++;
      }

      if (message.command > 0) {
        this.onMidiMessage(message);
      }
    }
  }

  /* tslint:disable:no-bitwise */
  private getMidiCommand(byte: number): number {
    return byte & 0xF0;
  }
  /* tslint:enable:no-bitwise */

  /* tslint:disable:no-bitwise */
  private getMidiChannel(byte: number): number {
    return byte & 0x0F;
  }
  /* tslint:enable:no-bitwise */


  private onMidiMessage(message: MidiMessage) {
    if (message.command === MidiMessage.COMMAND_NOTE_ON) {
      console.log('Note On, Channel ' + message.channel + ', Note ' + message.data1 + ', Velocity ' + message.data2);
    } else if (message.command === MidiMessage.COMMAND_NOTE_OFF) {
      console.log('Note Off, Channel ' + message.channel + ', Note ' + message.data1 + ', Velocity ' + message.data2);
    }
  }

}

