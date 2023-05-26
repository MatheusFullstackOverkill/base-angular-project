import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedAreaRoutingModule } from './logged-area-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoggedAreaComponent } from './logged-area.component';
import { ConfirmationDirective } from '../../directives/confirmation.directive';


@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    LoggedAreaComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    LoggedAreaRoutingModule,
    ConfirmationDirective
  ]
})
export class LoggedAreaModule { }
