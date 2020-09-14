import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;
  editMode: boolean;
  id: number;

  constructor(private categoryService: CategoryService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'imageUrl': new FormControl('', Validators.required)
    });

    this.category = new Category();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];

        this.categoryService.getCategoryById(this.id).subscribe(
          category => {
            this.category = category;
            this.editMode = true;
            this.categoryForm.setValue({
              'name': category.name,
              'imageUrl': category.imageUrl
            });
          },
          error => {
            console.log(error);
            this.editMode = false;
          }
        )
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    let name = this.categoryForm.get('name').value;
    let imageUrl = this.categoryForm.get('imageUrl').value;
    this.category.name = name;
    this.category.imageUrl = imageUrl;

    if (!this.editMode) {

      this.categoryService.addCategory(this.category).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log(this.category);
      this.categoryService.updateCategory(this.category).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/category']);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
