import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterModule
    ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule {
}
