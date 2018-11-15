import {BodyParams, Controller, Get, PathParams, Put, Required} from '@tsed/common';
import {ControlVoltage} from '../model/ControlVoltage';
import {ControlOutputService} from '../service/io/ControlOutputService';

@Controller('/output')
export class OutputController {

  constructor(private controlOutputService: ControlOutputService) {
  }

  @Get('/voltage')
  get(): ControlVoltage[] {
    return this.controlOutputService.getVoltageOutputs();
  }

  @Put('/voltage')
  output(@BodyParams() controlVoltages: ControlVoltage[]): ControlVoltage[] {
    return this.controlOutputService.setVoltageOutputs(controlVoltages);
  }

}

