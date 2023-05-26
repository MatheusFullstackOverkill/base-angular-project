import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnloggedAreaModule } from './presenters/navigation/unlogged-area/unlogged-area.module';
import { LoggedAreaModule } from './presenters/navigation/logged-area/logged-area.module';
import { RequestInterceptor, ResponseInterceptor } from './infrastructure/interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnloggedAreaModule,
    LoggedAreaModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
