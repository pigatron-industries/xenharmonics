import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams, Put
} from '@tsed/common';
import {Scale} from '../model/Scale';
import {ScaleService} from '../service/app/ScaleService';
import {NotFound} from 'ts-httpexceptions';
import {ConfigService} from '../service/app/ConfigService';


@Controller('/scale')
export class ScaleController {

  constructor(private scaleService: ScaleService,
              private configService: ConfigService) {
  }

  @Get('/')
  getAll(): Scale[] {
    return this.scaleService.getAll();
  }

  @Get('/selected')
  getSelected(): Scale {
    return this.configService.getSelectedScale();
  }

  @Put('/selected/:id')
  setSelected(@Required() @PathParams('id') id: number): Scale {
    return this.configService.setSelectedScale(id);
  }

  @Get('/:id')
  findById(@Required() @PathParams('id') id: number): Scale {
    const scale = this.scaleService.findById(id);
    if (scale) {
      return scale;
    }

    throw new NotFound('Scale not found');
  }

  @Put('/')
  async save(@BodyParams() scale: Scale): Promise<Scale> {
    return this.scaleService.save(scale);
  }

}
