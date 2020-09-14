import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { SigninComponent } from './components/signin/signin.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { SubCategoryComponent } from './components/category/sub-category/sub-category.component';
import { SubCategoryEditComponent } from './components/category/sub-category/sub-category-edit/sub-category-edit.component';
import { BookComponent } from './components/book/book.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin', component: DashboardComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/new', component: CategoryEditComponent },
  { path: 'category/edit/:id', component: CategoryEditComponent },
  { path: 'login', component: SigninComponent },
  { path: 'category/:id/sub-categories', component: SubCategoryComponent },
  { path: 'category/:id/sub-categories/add', component: SubCategoryEditComponent },
  { path: 'category/:id/sub-categories/edit/:subId', component: SubCategoryEditComponent },
  { path: 'book', component: BookComponent },
  { path: 'book/new', component: BookEditComponent },
  { path: 'book/edit/:id', component: BookEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }