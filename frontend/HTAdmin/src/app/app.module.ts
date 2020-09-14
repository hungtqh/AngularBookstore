import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { CategoryEditComponent } from './components/category/category-edit/category-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { SubCategoryComponent } from './components/category/sub-category/sub-category.component';
import { SubCategoryEditComponent } from './components/category/sub-category/sub-category-edit/sub-category-edit.component';
import { BookComponent } from './components/book/book.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuSidebarComponent,
    CategoryComponent,
    DashboardComponent,
    SigninComponent,
    CategoryEditComponent,
    SpinnerComponent,
    SubCategoryComponent,
    SubCategoryEditComponent,
    BookComponent,
    BookEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
