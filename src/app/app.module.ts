import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { GenerateNumbersFormComponent } from './generate-numbers-form/generate-numbers-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumbersDisplaySectionComponent } from './numbers-display-section/numbers-display-section.component';
import {SharedModule} from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    GenerateNumbersFormComponent,
    NumbersDisplaySectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
