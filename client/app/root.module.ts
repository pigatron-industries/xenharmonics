import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {RootComponent} from './root.component';
import {ControlComponent} from './control/control.component';
import {ScalesComponent} from './scales/scales.component';


const routes = [
  { path: 'control', component: ControlComponent },
  { path: 'scales', component: ScalesComponent },
  { path: 'scales/:id', component: ScalesComponent },
];

@NgModule({
  declarations: [
    RootComponent,
    ControlComponent,
    ScalesComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule {
}
