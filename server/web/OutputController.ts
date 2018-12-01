import {BodyParams, Controller, Get, Put, QueryParams, Required} from '@tsed/common';
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
  output(@BodyParams() controlVoltages: ControlVoltageOutput[], @QueryParams('send') send: boolean): ControlVoltageOutput[] {
    const response = this.controlOutputService.setVoltageOutputs(controlVoltages);
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

