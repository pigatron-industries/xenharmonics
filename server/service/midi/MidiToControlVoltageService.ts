
import {Service} from '@tsed/common';
import {$log} from 'ts-log-debug';

import {MidiMessage} from './MidiMessage';
import {ConfigService} from '../app/ConfigService';
import {ControlOutputService} from '../io/ControlOutputService';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';
import {ChannelConfig} from '../../model/ChannelConfig';
import {GateOutput} from '../../model/GateOutput';

@Service()
export class MidiToControlVoltageService {

  constructor(private configService: ConfigService,
              private controlOutputService: ControlOutputService) {
  }

  public onMidiMessage(message: MidiMessage) {
    $log.debug(message);
    if (message.command === MidiMessage.COMMAND_NOTE_ON) {
      this.handleNoteOn(message);
    } else if (message.command === MidiMessage.COMMAND_NOTE_OFF) {
      this.handleNoteOff(message);
    }
  }


  private handleNoteOn(message: MidiMessage) {
    const channelConfig = this.configService.getChannelConfig(message.channel);
    if (channelConfig) {

      if (channelConfig.noteVoltageChannel != null) {
        const noteVoltage = new ControlVoltageOutput(channelConfig.noteVoltageChannel,
                                                     this.midiNoteToVoltage(message.data1, channelConfig));
        this.controlOutputService.setVoltageOutput(noteVoltage);
      }

      if (channelConfig.pressureVoltageChannel != null) {
        const noteVoltage = new ControlVoltageOutput(channelConfig.pressureVoltageChannel,
                                                     this.midiVelocityToVoltage(message.data1));
        this.controlOutputService.setVoltageOutput(noteVoltage);
      }

      if (channelConfig.gateChannel != null) {
        const gate = new GateOutput(channelConfig.gateChannel, true);
        this.controlOutputService.setGateOutput(gate);
      }

      this.controlOutputService.send();

    }
  }


  private handleNoteOff(message: MidiMessage) {
    const channelConfig = this.configService.getChannelConfig(message.channel);
    if (channelConfig) {

      if (channelConfig.gateChannel != null) {
        const gate = new GateOutput(channelConfig.gateChannel, false);
        this.controlOutputService.setGateOutput(gate);
      }

      this.controlOutputService.send();

    }
  }


  private midiNoteToVoltage(midiNote: number, channelConfig: ChannelConfig): number {
    const scale = this.configService.getSelectedScale();
    const octave = Math.floor(midiNote / scale.notesCents.length);
    const note = midiNote - octave * scale.notesCents.length;
    const cents = octave * scale.octaveCents + scale.notesCents[note];
    return cents / 1200;
  }


  private midiVelocityToVoltage(note: number): number {
    // TODO convert midi velocity to voltage
    return 0;
  }

}
