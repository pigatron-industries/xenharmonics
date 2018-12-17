
export class Scale {

  id: number;
  name: string;
  description: string;
  notesCents: number[];
  octaveCents: number;

  constructor() {
    this.notesCents = [0];
    this.octaveCents = 1200;
  }

}
