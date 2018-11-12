import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatTabsModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { RootComponent } from './root.component';


@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    RouterModule.forRoot([]),
    MatTabsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class RootModule { }
