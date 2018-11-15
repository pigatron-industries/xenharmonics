import {OnInit, Service} from '@tsed/common';
import {ControlVoltage} from '../../model/ControlVoltage';
import {InputOutputService} from './InputOutputService';

import {config} from '../../config';

@Service()
export class ControlOutputService implements OnInit {

  private controlVoltages: ControlVoltage[];

  constructor(private inputOutputSevice: InputOutputService) {
  }

  $onInit() {
    this.initControlVoltages();
  }

  private initControlVoltages() {
    this.controlVoltages = [];
    for (let i = 0; i < config.dacOutputChannels; i++) {
      this.controlVoltages.push(new ControlVoltage(i, 0));
    }
  }

  public getVoltageOutputs(): ControlVoltage[] {
    return this.controlVoltages;
  }

  public setVoltageOutputs(newControlVoltages: ControlVoltage[]): ControlVoltage[] {
    for (const newControlVoltage of newControlVoltages) {
      this.controlVoltages[newControlVoltage.channel] = newControlVoltage;
    }
    return this.controlVoltages;
  }

  public latch() {
    // TODO
    // shiftOut each control voltage
    // toggle latch on/off
  }
}
