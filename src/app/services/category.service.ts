import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CategoryService {
    private selectedCategories: Subject<Set<string>>;
    private workingSet: Set<string>;

    constructor() {
      this.selectedCategories = new Subject<Set<string>>();
      this.workingSet = new Set();
      this.setSelectedCategories(this.workingSet);
    }

    public getSelectedCategories(): Observable<Set<string>> {
      return this.selectedCategories.asObservable();
    }

    public addSelectedCategory(category: string) {
      this.workingSet.add(category);
      this.setSelectedCategories(this.workingSet);
    }

    public removeSelectedCategory(category: string) {
      this.workingSet.delete(category);
      this.setSelectedCategories(this.workingSet);
    }

    public clearCategories() {
      this.workingSet.clear();
      this.setSelectedCategories(this.workingSet);
    }

    public setSelectedCategories(categories: Set<string>) {
      this.selectedCategories.next(categories);
    }
}
