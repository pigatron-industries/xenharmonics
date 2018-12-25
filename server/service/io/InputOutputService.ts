import {OnInit, Service} from '@tsed/common';
import {getInputOutputService} from '../../io/InputOutputServiceFactory';
import {InputOutputServiceInterface, ByteOrder, PinMode} from '../../io/InputOutputServiceInterface';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';

import {config} from '../../config';


@Service()
export class InputOutputService implements OnInit {

  private io: InputOutputServiceInterface;

  async $onInit() {
    this.io = await getInputOutputService();
    this.io.setup();
    this.setupPins();
    return this.io;
  }

  private setupPins() {
    this.io.setPinMode(config.dacDataPin, PinMode.OUTPUT);
    this.io.setPinMode(config.dacClockPin, PinMode.OUTPUT);
    this.io.setPinMode(config.dacLatchPin, PinMode.OUTPUT);
    this.io.digitalWrite(config.dacDataPin, false);
    this.io.digitalWrite(config.dacClockPin, false);
    this.io.digitalWrite(config.dacLatchPin, false);
  }

  public dacShiftOut(controlVoltages: ControlVoltageOutput[]) {
    for (const controlVoltage of controlVoltages) {
      // const bytes: number[] = controlVoltage.getBytes();
      // this.io.shiftOut(config.dacDataPin, config.dacClockPin, ByteOrder.MSBFIRST, bytes[1]);
      // this.io.shiftOut(config.dacDataPin, config.dacClockPin, ByteOrder.MSBFIRST, bytes[0]);
      const intValue = controlVoltage.getIntValue();
      this.io.shiftOut16(config.dacDataPin, config.dacClockPin, intValue);
    }
  }

  public dacLatch() {
    this.io.digitalWrite(config.dacLatchPin, true);
    this.io.digitalWrite(config.dacLatchPin, false);
  }

}
