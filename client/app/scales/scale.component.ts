import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ScaleService} from './scale.service';
import {Scale} from './Scale';

@Component({
  selector: 'xen-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  scale: Scale = null;

  constructor(private scaleService: ScaleService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] === 'new') {
        this.scale = new Scale();
      } else {
        this.scaleService.getById(params['id']).then((data: Scale) => {
          this.scale = data;
        });
      }
    });
  }

}
