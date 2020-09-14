import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/models/sub-category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subCategories: SubCategory[];
  id: number;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];

        this.categoryService.getSubCategories(this.id).subscribe(
          subCategories => {
            this.subCategories = subCategories;
          },
          error => {
            console.log(error);
          }
        )
      }
    });
  }

}
