import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContentManagerRoutingModule} from './content-manager-routing.module';
import {ContentManagerComponent} from './content-manager.component';


@NgModule({
  declarations: [
    ContentManagerComponent
  ],
  imports: [
    CommonModule,
    ContentManagerRoutingModule
  ]
})
export class ContentManagerModule {
}
