import {OnInit, Service} from '@tsed/common';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';
import {InputOutputService} from './InputOutputService';

import {config} from '../../config';

@Service()
export class ControlOutputService implements OnInit {

  private controlVoltages: ControlVoltageOutput[];

  constructor(private inputOutputSevice: InputOutputService) {
  }

  $onInit() {
    this.initControlVoltages();
  }

  private initControlVoltages() {
    this.controlVoltages = [];
    for (let i = 0; i < config.dacOutputChannels; i++) {
      this.controlVoltages.push(new ControlVoltageOutput(i, 0));
    }
  }

  public getVoltageOutputs(): ControlVoltageOutput[] {
    return this.controlVoltages;
  }

  public setVoltageOutputs(newControlVoltages: ControlVoltageOutput[]): ControlVoltageOutput[] {
    for (const newControlVoltage of newControlVoltages) {
      this.controlVoltages[newControlVoltage.channel].setVoltage(newControlVoltage.voltage);
    }
    return this.controlVoltages;
  }

  public setVoltageOutput(newControlVoltage: ControlVoltageOutput) {
    this.controlVoltages[newControlVoltage.channel].setVoltage(newControlVoltage.voltage);
  }

  public send() {
    this.inputOutputSevice.dacShiftOut(this.controlVoltages);
    this.inputOutputSevice.dacLatch();
  }
}
