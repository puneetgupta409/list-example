
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductDetailsService } from './product-detail.service';
import { ProductDetailsComponent } from './product-detail.component';
import { DialogModule } from 'primeng/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule, 
    FormsModule,
    DialogModule,
    LazyLoadImageModule,
    ToastModule
    ], // Ensure CommonModule is imported here
    providers: [
    ProductDetailsService,
    MessageService
  ],
})
export class ProductDetailsModule {}
