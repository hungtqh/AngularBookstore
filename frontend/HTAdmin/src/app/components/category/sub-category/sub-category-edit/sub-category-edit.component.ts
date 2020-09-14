import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/sub-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sub-category-edit',
  templateUrl: './sub-category-edit.component.html',
  styleUrls: ['./sub-category-edit.component.css']
})
export class SubCategoryEditComponent implements OnInit {
  subCategoryForm: FormGroup;
  subCategory: SubCategory;
  editMode: boolean;
  subId: number;
  id: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subCategoryForm = new FormGroup({
      'name': new FormControl('', Validators.required),
    });

    this.subCategory = new SubCategory();

    this.route.params.subscribe(params => {
      this.id = params['id'];
      let category: Category = new Category();
      category.id = this.id;
      this.subCategory.category = category;

      if (params['subId']) {
        this.subId = params['subId'];

        this.categoryService.getSubCategoryById(this.subId).subscribe(
          subCategory => {
            this.subCategory = subCategory;
            this.subCategory.category = category;
            this.editMode = true;
            this.subCategoryForm.setValue({
              'name': subCategory.name,
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
    if (this.subCategoryForm.invalid) {
      return;
    }

    let name = this.subCategoryForm.get('name').value;
    this.subCategory.name = name;

    if (!this.editMode) {

      this.categoryService.addSubCategory(this.subCategory).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log(this.subCategory);
      this.categoryService.updateSubCategory(this.subCategory).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
