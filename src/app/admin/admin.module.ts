import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../share/material-module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminAdeditComponent } from './admins/admin-adedit/admin-adedit.component';
import { AdminsComponent } from './admins/admins/admins.component';
import { BannerAdeditComponent } from './banners/banner-adedit/banner-adedit.component';
import { BannersComponent } from './banners/banners/banners.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { ProductAdeditComponent } from './products/product-adedit/product-adedit.component';
import { ProductsComponent } from './products/products/products.component';
import { UserAdeditComponent } from './users/user-adedit/user-adedit.component';
import { UsersComponent } from './users/users/users.component';
import { TopLeftComponent } from './top-left/top-left.component';
import { UploadsComponent } from './uploads/uploads.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CategoryAdeditComponent } from './categories/category-adedit/category-adedit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BannersComponent,
    BannerAdeditComponent,
    ProductsComponent,
    ProductAdeditComponent,
    UsersComponent,
    UserAdeditComponent,
    AdminsComponent,
    AdminAdeditComponent,
    PagenotfoundComponent,
    LoginComponent,
    TopLeftComponent,
    UploadsComponent,
    CategoriesComponent,
    CategoryAdeditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class AdminModule { }
