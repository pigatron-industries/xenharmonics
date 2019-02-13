


export class MidiMessage {

  static readonly COMMAND_NOTE_ON = 0x90;
  static readonly COMMAND_NOTE_OFF = 0x80;
  static readonly COMMAND_PRESSURE = 0xA0;
  static readonly COMMAND_CONTROL_CHANGE = 0xB0;
  static readonly COMMAND_PROGRAM_CHANGE = 0xC0;
  static readonly COMMAND_CHANNEL_PRESSURE = 0xD0;
  static readonly COMMAND_PITCH_BEND = 0xE0;

  public command: number;
  public channel: number;

  public data1: number;
  public data2: number;

}
