import {Component, OnInit} from '@angular/core';
import {ScaleService} from './scale.service';
import {Scale} from '../../../server/model/Scale';

@Component({
  selector: 'xen-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss']
})
export class ScalesComponent implements OnInit {

  columnsToDisplay = ['actions', 'name'];

  scales: Scale[] = [];

  constructor(private scaleService: ScaleService) {
  }

  async ngOnInit() {
    this.scales = await this.scaleService.getAll();
  }

}
