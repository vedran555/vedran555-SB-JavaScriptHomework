// separate file for angular material modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatTooltipModule,
    MatSnackBarModule
  ],
  exports: [
    MatTooltipModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialComponentsModule { }

