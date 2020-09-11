import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { SigninComponent } from './components/signin/signin.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/new', component: CategoryEditComponent },
  { path: 'login', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }