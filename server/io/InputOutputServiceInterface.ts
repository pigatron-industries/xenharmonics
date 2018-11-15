
export interface InputOutputServiceInterface {
  setup();
  digitalWrite(pin: number, state: boolean);
  shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number);
}

export enum ByteOrder {
  MSBFIRST,
  LSBFIRST
}
