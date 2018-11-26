import { Component } from '@angular/core';

@Component({
  selector: 'xen-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss']
})
export class ScalesComponent {

  columnsToDisplay = ['actions', 'name'];

  scales = [ {id: 1, name: 'test'} ];

}
