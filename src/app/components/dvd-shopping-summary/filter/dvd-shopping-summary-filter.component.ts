import { Component, OnInit } from '@angular/core';

import { DvdClientService } from '../../../services/dvd-client.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'dvd-shopping-summary-filter',
  templateUrl: './dvd-shopping-summary-filter.component.html'
})
export class DvdShoppingSummaryFilterComponent implements OnInit {
  private categories:any[];
  private selectedCategories:string[];

  constructor(
    private dvdClientService: DvdClientService,
    private categoryService: CategoryService
  ) {
    this.categories = [];
    this.selectedCategories = [];
  }

  public ngOnInit() {
     this.dvdClientService.getCategories()
         .then(categories => {
           categories.forEach(
             category => this.categories.push({name: category, isChecked: false})
           );
         });
  }

  public applyCategoryFilter(category: any) {
    if (category.isChecked) {
      // if (this.selectedCategories.indexOf(category.name) === -1) {
      //   this.selectedCategories.push(category.name);
      // }
      this.categoryService.addSelectedCategory(category.name);
    } else {
      var index = this.selectedCategories.indexOf(category.name);
      if (index !== -1) {
          this.selectedCategories.splice(index, 1);
      }
    }
    // this.generateDisplayList();
  }

  public resetFilter(element: any) {
    element.blur();
    this.categories.forEach(category => category.isChecked = false);
    this.selectedCategories = [];
    // this.generateDisplayList();
  }
}
