import {BodyParams, Controller, Get, PathParams, Put, Required} from '@tsed/common';
import {ControlVoltageOutput} from '../model/ControlVoltageOutput';
import {ControlOutputService} from '../service/io/ControlOutputService';

@Controller('/output')
export class OutputController {

  constructor(private controlOutputService: ControlOutputService) {
  }

  @Get('/voltage')
  get(): ControlVoltageOutput[] {
    return this.controlOutputService.getVoltageOutputs();
  }

  @Put('/voltage')
  output(@BodyParams() controlVoltages: ControlVoltageOutput[]): ControlVoltageOutput[] {
    return this.controlOutputService.setVoltageOutputs(controlVoltages);
  }

  @Put('/send')
  send(): any {
    this.controlOutputService.send();
    return '';
  }

}

