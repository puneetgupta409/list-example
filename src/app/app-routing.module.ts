import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { ProductDetailsComponent } from './Components/product-detail/product-detail.component';
const appRoutes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'ProductsDetails/:id', // Parent route
    component: ProductDetailsComponent, // LayoutComponent will be responsible for displaying the 'dashboard' component
    children: [
      { path: '', loadChildren: () => import('./Components/product-detail/product-detail.module').then(m => m.ProductDetailsModule)},
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
