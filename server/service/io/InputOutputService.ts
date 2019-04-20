import {OnInit, Service} from '@tsed/common';
import {getInputOutputService} from '../../io/InputOutputServiceFactory';
import {InputOutputServiceInterface, ByteOrder, PinMode} from '../../io/InputOutputServiceInterface';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';

import {config} from '../../config';
import {GateOutput} from '../../model/GateOutput';


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
    if (config.dacOutputChannels > 0) {
      this.io.setPinMode(config.dacDataPin, PinMode.OUTPUT);
      this.io.setPinMode(config.dacClockPin, PinMode.OUTPUT);
      this.io.setPinMode(config.dacLatchPin, PinMode.OUTPUT);
      this.io.digitalWrite(config.dacDataPin, false);
      this.io.digitalWrite(config.dacClockPin, false);
      this.io.digitalWrite(config.dacLatchPin, false);
    }

    if (config.gateOutputChannels > 0) {
      this.io.setPinMode(config.gateDataPin, PinMode.OUTPUT);
      this.io.setPinMode(config.gateClockPin, PinMode.OUTPUT);
      this.io.setPinMode(config.gateLatchPin, PinMode.OUTPUT);
      this.io.digitalWrite(config.gateDataPin, false);
      this.io.digitalWrite(config.gateClockPin, false);
      this.io.digitalWrite(config.gateLatchPin, false);
    }
  }

  public dacShiftOut(controlVoltages: ControlVoltageOutput[]) {
    for (let i = controlVoltages.length - 1; i >= 0; i--) {
      const controlVoltage = controlVoltages[i];
      // Using native shiftOut is too fast for DAC!!!
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

  public gateShiftOut(gateOutputs: GateOutput[]) {
    for (let i = gateOutputs.length - 1; i >= 0; i--) {
      const gateOutput = gateOutputs[i];
      this.io.digitalWrite(config.gateDataPin, gateOutput.value);
      this.io.digitalWrite(config.gateClockPin, true);
      this.io.digitalWrite(config.gateClockPin, false);
    }
  }

  public gateLatch() {
    this.io.digitalWrite(config.gateLatchPin, true);
    this.io.digitalWrite(config.gateLatchPin, false);
  }

}
