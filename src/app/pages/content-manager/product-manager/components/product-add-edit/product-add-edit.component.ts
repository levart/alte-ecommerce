import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../../../../../core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, Subject, takeUntil} from "rxjs";
import {CategoriesService} from "../../../../../core/services";
import {Category} from "../../../../../core/interfaces/category";

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });
  categoryId?: string;
  categories$: Observable<Category[]> = this.categoriesService.getDate()

  sub$ = new Subject()

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.sub$))
      .subscribe(params => {
        if (params['id']) {
          this.productsService.getById(params['id']).subscribe(product => {
            this.categoryId = product.category?.id
            this.form.patchValue(product)
          })
        }
      })
  }


  submit() {
    this.form.markAllAsTouched()
    if (this.form.invalid) return
    if (this.form.value.id) {
      this.productsService.update(this.form.value.id, this.form.value)
        .pipe(takeUntil(this.sub$))
        .subscribe(() => {
          this.router.navigate(['/content-manager/products'])
        })
    } else {
      this.productsService.create(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/content-manager/products'])
        })
    }
  }

  ngOnDestroy() {
    this.sub$.next(null)
    this.sub$.complete()
  }

  categoryChanged($event: any) {
    console.log($event)
    this.categories$.pipe(
      takeUntil(this.sub$),
      map(categories => categories.find(category => category.id === $event))
    ).subscribe((category) => {
      if (category) {
        this.form.patchValue({category})
      }
    })
  }
}
