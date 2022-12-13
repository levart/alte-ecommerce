import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Product} from "../../../core/interfaces/product";
import {ProductsService} from "../../../core/services/products.service";
import {CategoriesService} from "../../../core/services";
import {Category} from "../../../core/interfaces/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements  OnDestroy {
  categories$: Observable<Category[]> = this.categoriesService.getDate()

  sub$ = new Subject()
  constructor(
    private categoriesService: CategoriesService,
  ) { }

  deleteCategory(id: string | undefined) {
    id && this.categoriesService.delete(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.categories$ = this.categoriesService.getDate()
      })
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
