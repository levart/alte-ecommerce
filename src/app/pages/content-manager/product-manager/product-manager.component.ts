import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../../../core/services/products.service";
import {Product} from "../../../core/interfaces/product";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements  OnDestroy {
  products$: Observable<Product[]> = this.productsService.getDate()

  sub$ = new Subject()
  constructor(
    private productsService: ProductsService,
  ) { }

  deleteProduct(id: string | undefined) {
    id && this.productsService.delete(id)
      .pipe(takeUntil(this.sub$))
      .subscribe(() => {
        this.products$ = this.productsService.getDate()
      })
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
