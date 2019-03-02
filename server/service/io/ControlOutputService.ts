import {OnInit, Service} from '@tsed/common';
import {ControlVoltageOutput} from '../../model/ControlVoltageOutput';
import {InputOutputService} from './InputOutputService';

import {config} from '../../config';
import {GateOutput} from '../../model/GateOutput';

@Service()
export class ControlOutputService implements OnInit {

  private controlVoltages: ControlVoltageOutput[];
  private gates: GateOutput[];

  private controlVoltagesDirty: boolean;
  private gatesDirty: boolean;

  constructor(private inputOutputService: InputOutputService) {
  }

  $onInit() {
    this.initControlVoltages();
  }

  private initControlVoltages() {
    this.controlVoltages = [];
    for (let i = 0; i < config.dacOutputChannels; i++) {
      this.controlVoltages.push(new ControlVoltageOutput(i, 0));
    }
    for (let i = 0; i < config.gateOutputChannels; i++) {
      this.gates.push(new GateOutput(i, false));
    }
  }

  public getVoltageOutputs(): ControlVoltageOutput[] {
    return this.controlVoltages;
  }

  public setVoltageOutputs(newControlVoltages: ControlVoltageOutput[]): ControlVoltageOutput[] {
    for (const newControlVoltage of newControlVoltages) {
      this.controlVoltages[newControlVoltage.channel].setVoltage(newControlVoltage.voltage);
    }
    this.controlVoltagesDirty = true;
    return this.controlVoltages;
  }

  public setVoltageOutput(newControlVoltage: ControlVoltageOutput) {
    this.controlVoltages[newControlVoltage.channel].setVoltage(newControlVoltage.voltage);
    this.controlVoltagesDirty = true;
  }

  public getGateOutputs(): GateOutput[] {
    return this.gates;
  }

  public setGateOutputs(newGates: GateOutput[]): GateOutput[] {
    for (const gate of newGates) {
      this.gates[gate.channel].setValue(gate.value);
    }
    this.gatesDirty = true;
    return this.gates;
  }

  public setGateOutput(gate: GateOutput) {
    this.gates[gate.channel].setValue(gate.value);
    this.gatesDirty = true;
  }


  public send() {
    if (this.controlVoltagesDirty) {
      this.inputOutputService.dacShiftOut(this.controlVoltages);
    }
    if (this.gatesDirty) {
      this.inputOutputService.gateShiftOut(this.gates);
    }
    if (this.controlVoltagesDirty) {
      this.inputOutputService.dacLatch();
    }
    if (this.gatesDirty) {
      this.inputOutputService.gateLatch();
    }
  }
}
