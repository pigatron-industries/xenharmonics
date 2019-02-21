import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams, Put
} from '@tsed/common';
import {Scale} from '../model/Scale';
import {ScaleService} from '../service/app/ScaleService';
import {NotFound} from 'ts-httpexceptions';
import {ApplicationStateService} from '../service/app/ApplicationStateService';


@Controller('/scale')
export class ScaleController {

  constructor(private scaleService: ScaleService,
              private applicationStateService: ApplicationStateService) {
  }

  @Get('/')
  getAll(): Scale[] {
    return this.scaleService.getAll();
  }

  @Get('/selected')
  getSelected(): Scale {
    return this.applicationStateService.getSelectedScale();
  }

  @Put('/selected/:id')
  setSelected(@Required() @PathParams('id') id: number): Scale {
    return this.applicationStateService.setSelectedScale(id);
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
