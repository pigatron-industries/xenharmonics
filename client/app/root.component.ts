import { Component } from '@angular/core';

@Component({
  selector: 'xen-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  title = 'xenharmonics';
  navLinks = [
    { path: 'control', label: 'Control' },
    { path: 'scales', label: 'Scales' }
  ];
}
