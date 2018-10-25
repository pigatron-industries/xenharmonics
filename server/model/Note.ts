import {Required} from '@tsed/common';
import {Description} from '@tsed/swagger';

export class Note {

  @Required()
  @Description('Number of the octave')
  octaveNumber: number;

  @Required()
  @Description('Number of the note in the octave')
  noteNumber: number;

}
