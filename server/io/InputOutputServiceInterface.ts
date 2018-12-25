
export interface InputOutputServiceInterface {
  setup();
  setPinMode(pin: number, mode: PinMode);
  digitalWrite(pin: number, state: boolean);
  shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number);
  shiftOut16(dataPin: number, clockPin: number, value: number);
}

export enum ByteOrder {
  MSBFIRST,
  LSBFIRST
}

export enum PinMode {
  OUTPUT,
  INPUT
}
