import {Service, OnInit} from '@tsed/common';
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
    }
  }

  private saveScales() {
    this.storageService.save(SCALES_KEY, this.scales);
  }

  async getAll(): Promise<Scale[]> {
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
