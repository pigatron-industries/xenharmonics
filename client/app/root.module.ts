import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatTabsModule, MatTableModule, MatIconModule, MatToolbarModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import {RootComponent} from './root.component';
import {ControlComponent} from './control/control.component';
import {ScalesComponent} from './scales/scales.component';
import {ScaleComponent} from './scales/scale.component';


const routes = [
  { path: 'control', component: ControlComponent },
  { path: 'scales', component: ScalesComponent },
  { path: 'scales/:id', component: ScaleComponent },
];

@NgModule({
  declarations: [
    RootComponent,
    ControlComponent,
    ScalesComponent,
    ScaleComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule {
}
