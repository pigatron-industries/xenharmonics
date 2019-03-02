import {BodyParams, Controller, Get, Put, QueryParams, Required} from '@tsed/common';
import {ControlVoltageOutput} from '../model/ControlVoltageOutput';
import {ControlOutputService} from '../service/io/ControlOutputService';
import {GateOutput} from '../model/GateOutput';

@Controller('/output')
export class OutputController {

  constructor(private controlOutputService: ControlOutputService) {
  }

  @Get('/voltage')
  getVoltage(): ControlVoltageOutput[] {
    return this.controlOutputService.getVoltageOutputs();
  }

  @Put('/voltage')
  putVoltage(@BodyParams() controlVoltages: ControlVoltageOutput[], @QueryParams('send') send: boolean): ControlVoltageOutput[] {
    const response = this.controlOutputService.setVoltageOutputs(controlVoltages);
    if (send) {
      this.controlOutputService.send();
    }
    return response;
  }

  @Get('/gate')
  getGate(): GateOutput[] {
    return this.controlOutputService.getGateOutputs();
  }

  @Put('/gate')
  putGate(@BodyParams() gates: GateOutput[], @QueryParams('send') send: boolean): GateOutput[] {
    const response = this.controlOutputService.setGateOutputs(gates);
    if (send) {
      this.controlOutputService.send();
    }
    return response;
  }

  @Put('/send')
  send(): any {
    this.controlOutputService.send();
    return '';
  }

}

