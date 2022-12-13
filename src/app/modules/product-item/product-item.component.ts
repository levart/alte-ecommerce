import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../core/interfaces/product";
import {CartService} from "../../core/services/cart.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() product!: Product;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addCart({
      product: this.product,
      quantity: 1
    })
  }
}
