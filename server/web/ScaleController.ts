import {
  Controller, Get, Post, Authenticated, Delete, BodyParams, Required, PathParams, QueryParams, Put
} from '@tsed/common';
import {Scale} from '../entity/Scale';
import {ScaleService} from '../service/ScaleService';
import {NotFound} from 'ts-httpexceptions';


@Controller('/scale')
export class ScaleController {

  constructor(private scaleService: ScaleService) {
  }

  @Get('/')
  async getAll(): Promise<Scale[]> {
    return this.scaleService.getAll();
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
