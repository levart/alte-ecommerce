import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../core/services/products.service";
import {Observable} from "rxjs";
import {Product} from "../../core/interfaces/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]> = this.productsService.getDate()

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
  }

}
