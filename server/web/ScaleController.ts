import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams, Put
} from '@tsed/common';
import {Scale} from '../model/Scale';
import {ScaleService} from '../service/ScaleService';
import {NotFound} from 'ts-httpexceptions';
import {ApplicationStateService} from '../service/ApplicationStateService';


@Controller('/scale')
export class ScaleController {

  constructor(private scaleService: ScaleService,
              private applicationStateService: ApplicationStateService) {
  }

  @Get('/')
  async getAll(): Promise<Scale[]> {
    return this.scaleService.getAll();
  }

  @Get('/selected')
  async getSelected(): Promise<Scale> {
    return await this.applicationStateService.getSelectedScale();
  }

  @Put('/selected/:id')
  async setSelected(@Required() @PathParams('id') id: string): Promise<Scale> {
    return await this.applicationStateService.setSelectedScale(id);
  }

  @Get('/:id')
  async findById(@Required() @PathParams('id') id: string): Promise<Scale> {
    const scale = await this.scaleService.findById(id);
    if (scale) {
      return scale;
    }

    throw new NotFound('Scale not found');
  }

  @Put('/')
  save(@BodyParams() scale: Scale): Promise<Scale> {
    return this.scaleService.save(scale);
  }

}
