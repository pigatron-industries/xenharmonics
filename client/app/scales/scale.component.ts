import {Component, OnInit} from '@angular/core';
import {ScaleService} from './scale.service';
import {Scale} from '../../../server/model/Scale';

@Component({
  selector: 'xen-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  scale: Scale = null;

  constructor(private scaleService: ScaleService) {
  }

  async ngOnInit() {
  }

}
