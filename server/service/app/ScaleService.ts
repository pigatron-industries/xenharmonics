import {Service, OnInit} from '@tsed/common';
import {Scale} from '../../model/Scale';
import {StorageService} from '../storage/StorageSevice';

@Service()
export class ScaleService implements OnInit {

  private scales: Scale[] = [];

  constructor(private storageService: StorageService) {
  }

  $onInit() {
    this.loadScales();
  }

  private async loadScales() {
    const scales = await this.storageService.load('xen_scales');
    if (scales) {
      this.scales = scales;
    }
    console.log(this.scales);
  }

  private saveScales() {
    this.storageService.save('xen_scales', this.scales);
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
