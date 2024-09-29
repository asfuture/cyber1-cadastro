import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNgxMask, NgxMaskDirective } from 'ngx-mask';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './shared/viewmodel/user.component';
import { FormComponent } from './shared/viewmodel/form.component';
import { HomeComponent } from './shared/viewmodel/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective
    
  ],
  providers: [provideHttpClient(),provideNgxMask({})],
  bootstrap: [AppComponent]
})
export class AppModule { }
