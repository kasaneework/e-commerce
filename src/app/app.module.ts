import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrontRoutingModule } from './front/front-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { MaterialModule } from './share/material-module';
import { FormsModule } from '@angular/forms';
import { DialogConfirmComponent } from './share/dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FrontRoutingModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
