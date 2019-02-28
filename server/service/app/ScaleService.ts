import {Service, OnInit} from '@tsed/common';
import {$log} from 'ts-log-debug';

import {Scale} from '../../model/Scale';
import {StorageService} from '../storage/StorageSevice';

const SCALES_KEY = 'xen_scales';

@Service()
export class ScaleService implements OnInit {

  private scales: Scale[] = [];

  constructor(private storageService: StorageService) {
  }

  $onInit() {
    this.loadScales();
  }

  private async loadScales() {
    const scales = await this.storageService.load(SCALES_KEY);
    if (scales) {
      this.scales = scales;
    } else {
      $log.info('Creating default scale');
      const defaultScale = new Scale();
      defaultScale.id = await this.storageService.createId();
      defaultScale.name = '12tet';
      defaultScale.description = '12-Tone Equal Temperament';
      defaultScale.notesCents = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
      defaultScale.octaveCents = 1200;
      this.saveScales();
    }
  }

  private saveScales() {
    this.storageService.save(SCALES_KEY, this.scales);
  }

  getAll(): Scale[] {
    return this.scales;
  }

  findById(id: number): Scale {
    return this.scales.find((value: Scale) => value.id === id);
  }

  async save(scale: Scale): Promise<Scale> {
    if (!scale.id) {
      scale.id = await this.storageService.createId();
      this.scales.push(scale);
    } else {
      const index = this.scales.findIndex((value: Scale) => value.id === scale.id);
      this.scales[index] = scale;
    }

    this.saveScales();
    return scale;
  }

}
