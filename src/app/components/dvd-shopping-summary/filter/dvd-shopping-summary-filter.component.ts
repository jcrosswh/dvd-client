import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { DvdClientService } from '../../../services/dvd-client.service';
import { CategoryService } from '../../../services/category.service';
import { PaginationService } from '../../../services/pagination.service';

import { Pagination } from '../../../domain/Pagination';

@Component({
  selector: 'dvd-shopping-summary-filter',
  templateUrl: './dvd-shopping-summary-filter.component.html'
})
export class DvdShoppingSummaryFilterComponent implements OnInit {
  private paginationSubscription:Subscription;
  public categories:Array<any>;
  private selectedCategories:Array<string>;
  public maxSizes:Array<number>;
  public pagination:Pagination;

  constructor(
    private dvdClientService: DvdClientService,
    private categoryService: CategoryService,
    private paginationService: PaginationService
  ) {
    this.categories = [];
    this.selectedCategories = [];
    this.maxSizes = [4, 8, 12, 24, 48, 96];
  }

  public ngOnInit() {
    this.paginationSubscription = this.paginationService.getPagination()
       .subscribe((pagination) => {
         this.pagination = pagination;
       });
     this.dvdClientService.getCategories()
         .then(categories => {
           categories.forEach(
             category => this.categories.push({name: category, isChecked: false})
           );
         });
    this.paginationService.setItemsPerPage(this.maxSizes[3]);
  }

  public applyCategoryFilter(category: any) {
    if (category.isChecked) {
      this.categoryService.addSelectedCategory(category.name);
    } else {
      this.categoryService.removeSelectedCategory(category.name);
    }
  }

  public resetFilter(element: any) {
    element.blur();
    this.categories.forEach(category => category.isChecked = false);
    this.categoryService.clearCategories();
  }

  public itemCountChanged(itemsPerPage: number) {
    this.paginationService.setItemsPerPage(itemsPerPage);
  }
}
