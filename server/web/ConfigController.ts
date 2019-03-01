import {BodyParams, Controller, Get, Put, QueryParams, Required} from '@tsed/common';
import {ConfigService} from '../service/app/ConfigService';

@Controller('/config')
export class ConfigController {

  constructor(private configService: ConfigService) {
  }

}
