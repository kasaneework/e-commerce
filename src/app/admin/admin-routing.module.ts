import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../share/guard.service';
import { AdminAdeditComponent } from './admins/admin-adedit/admin-adedit.component';
import { AdminsComponent } from './admins/admins/admins.component';
import { BannerAdeditComponent } from './banners/banner-adedit/banner-adedit.component';
import { BannersComponent } from './banners/banners/banners.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './login/login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound/pagenotfound.component';
import { ProductAdeditComponent } from './products/product-adedit/product-adedit.component';
import { ProductsComponent } from './products/products/products.component';
import { CategoriesComponent } from './categories/categories/categories.component';
import { CategoryAdeditComponent } from './categories/category-adedit/category-adedit.component';
import { UserAdeditComponent } from './users/user-adedit/user-adedit.component';
import { UsersComponent } from './users/users/users.component';
import { UploadsComponent } from './uploads/uploads.component';


const routes: Routes = [

  { path: '',   redirectTo: 'login', pathMatch: 'full' }, // redirect to
  { path: 'login', component: LoginComponent},

  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  { path: 'uploads', component: UploadsComponent, canActivate:[AuthGuard]},

  { path: 'admins', component: AdminsComponent, canActivate:[AuthGuard] },
  { path: 'admin-adedit', component: AdminAdeditComponent, canActivate:[AuthGuard] },
  { path: 'admin-adedit/:id', component: AdminAdeditComponent, canActivate:[AuthGuard] },

  { path: 'banners', component: BannersComponent, canActivate:[AuthGuard] },
  { path: 'banner-adedit', component: BannerAdeditComponent, canActivate:[AuthGuard] }, //--case new
  { path: 'banner-adedit/:id', component: BannerAdeditComponent, canActivate:[AuthGuard] },

  { path: 'categories', component: CategoriesComponent, canActivate:[AuthGuard] },
  { path: 'category-adedit', component: CategoryAdeditComponent, canActivate:[AuthGuard] },
  { path: 'category-adedit/:id', component: CategoryAdeditComponent, canActivate:[AuthGuard] },

  { path: 'products', component: ProductsComponent, canActivate:[AuthGuard] },
  { path: 'product-adedit', component: ProductAdeditComponent, canActivate:[AuthGuard] },
  { path: 'product-adedit/:id', component: ProductAdeditComponent, canActivate:[AuthGuard] },

  { path: 'users', component: UsersComponent, canActivate:[AuthGuard] },
  { path: 'user-adedit', component: UserAdeditComponent, canActivate:[AuthGuard] },
  { path: 'user-adedit/:id', component: UserAdeditComponent, canActivate:[AuthGuard] },

  { path: '**', component: PagenotfoundComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard],
})
export class AdminRoutingModule { }
