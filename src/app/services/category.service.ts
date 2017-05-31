import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {
    private selectedCategories = new BehaviorSubject<Array<string>>(null);

    public getSelectedCategories(): Observable<Array<string>> {
      return this.selectedCategories.asObservable();
    }

    public addSelectedCategory(category: string) {
      this.selectedCategories.next(['first', 'second']);
      // if (this.selectedCategories.indexOf(category.name) === -1) {
      //   this.selectedCategories.push(category.name);
      // }
    }

    public setSelectedCategories(categories: Array<string>) {
      this.selectedCategories.next(categories);
    }
}
