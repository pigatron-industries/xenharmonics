
export interface InputOutputServiceInterface {
  setup();
  shiftOut(dataPin: number, clockPin: number, order: ByteOrder, value: number);
}

export enum ByteOrder {
  MSBFIRST,
  LSBFIRST
}
