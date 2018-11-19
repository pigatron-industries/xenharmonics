import {OnInit, Service} from '@tsed/common';
import {getInputOutputService} from '../../io/InputOutputServiceFactory';
import {InputOutputServiceInterface, ByteOrder} from '../../io/InputOutputServiceInterface';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';

import {config} from '../../config';


@Service()
export class InputOutputService implements OnInit {

  private io: InputOutputServiceInterface;

  async $onInit() {
    this.io = await getInputOutputService();
    this.io.setup();
    return this.io;
  }

  public dacShiftOut(controlVoltages: ControlVoltageOutput[]) {
    for (const controlVoltage of controlVoltages) {
      const bytes: number[] = controlVoltage.getBytes();
      this.io.shiftOut(config.dacDataPin, config.dacClockPin, ByteOrder.MSBFIRST, bytes[0]);
      this.io.shiftOut(config.dacDataPin, config.dacClockPin, ByteOrder.MSBFIRST, bytes[1]);
    }
  }

  public dacLatch() {
    this.io.digitalWrite(config.dacLatchPin, true);
    this.io.digitalWrite(config.dacLatchPin, false);
  }

}
