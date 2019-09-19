import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridReactiveFormsComponent } from './ag-grid-reactive-forms/ag-grid-reactive-forms.component';
import { NgSelectCellRendererComponent } from './ag-grid-reactive-forms/ng-select-cell-renderer/ng-select-cell-renderer.component';
import { TextCellRendererComponent } from './ag-grid-reactive-forms/text-cell-renderer/text-cell-renderer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AgGridReactiveFormsComponent,
    TextCellRendererComponent,
    NgSelectCellRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([TextCellRendererComponent,
      NgSelectCellRendererComponent]),
    NgSelectModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
