import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Pagination } from '../domain/pagination';

@Injectable()
export class PaginationService {
    private paginationSubject: Subject<Pagination>;
    private pagination: Pagination;

    constructor() {
      this.paginationSubject = new Subject<Pagination>();
      this.pagination = new Pagination();
      this.setPagination(this.pagination);
    }

    public getPagination(): Observable<Pagination> {
      return this.paginationSubject.asObservable();
    }

    public setItemsPerPage(itemsPerPage: number) {
      this.pagination.itemsPerPage = itemsPerPage;
      this.setPagination(this.pagination);
    }

    public setCurrentPage(currentPage: number) {
      this.pagination.currentPage = currentPage;
      this.setPagination(this.pagination);
    }

    public setTotalItems(totalItems: number) {
      this.pagination.totalItems = totalItems;
      this.setPagination(this.pagination);
    }

    public setMaxSize(maxSize: number) {
      this.pagination.maxSize = maxSize;
      this.setPagination(this.pagination);
    }

    private setPagination(pagination: Pagination) {
      this.paginationSubject.next(pagination);
    }
}
