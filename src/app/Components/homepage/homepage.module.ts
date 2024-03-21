

// Import necessary Angular modules and dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import { HomepageService } from './homepage.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    LazyLoadImageModule,
    ToastModule
  ],
  providers: [
    HomepageService,
    MessageService
  ],
})
// Define the module class
export class HomepageModule { }
