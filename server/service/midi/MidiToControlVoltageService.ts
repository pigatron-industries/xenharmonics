
import {Service} from '@tsed/common';
import {MidiMessage} from './MidiMessage';
import {ApplicationStateService} from '../app/ApplicationStateService';
import {ControlOutputService} from '../io/ControlOutputService';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';
import {ChannelConfig} from '../../model/ChannelConfig';

@Service()
export class MidiToControlVoltageService {

  constructor(private applicationStateService: ApplicationStateService,
              private controlOutputService: ControlOutputService) {
  }

  public onMidiMessage(message: MidiMessage) {
    if (message.command === MidiMessage.COMMAND_NOTE_ON) {
      this.handleNoteOn(message);
    } else if (message.command === MidiMessage.COMMAND_NOTE_OFF) {
      this.handleNoteOff(message);
    }
  }


  private handleNoteOn(message: MidiMessage) {
    console.log('Note On, Channel ' + message.channel + ', Note ' + message.data1 + ', Velocity ' + message.data2);
    const channelConfig = this.applicationStateService.getChannelConfig(message.channel);
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
        // TODO turn gate on
      }

    }
  }


  private handleNoteOff(message: MidiMessage) {
    console.log('Note Off, Channel ' + message.channel + ', Note ' + message.data1 + ', Velocity ' + message.data2);
    const channelConfig = this.applicationStateService.getChannelConfig(message.channel);
    if (channelConfig) {

      if (channelConfig.gateChannel != null) {
        // TODO turn gate off
      }

    }
  }


  private midiNoteToVoltage(midiNote: number, channelConfig: ChannelConfig): number {
    const scale = this.applicationStateService.getSelectedScale();
    const octave = midiNote % scale.notesCents.length;
    const note = midiNote - octave * scale.notesCents.length;
    const cents = octave * scale.octaveCents + scale.notesCents[note];
    return cents / 12;
  }


  private midiVelocityToVoltage(note: number): number {
    // TODO convert midi velocity to voltage
    return 0;
  }

}
