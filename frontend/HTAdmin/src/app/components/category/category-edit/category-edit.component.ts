import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'imagePath': new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    console.log(this.categoryForm);
  }

}
