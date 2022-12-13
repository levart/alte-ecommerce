import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Cart} from "../../core/interfaces/cart";
import {CartService} from "../../core/services/cart.service";
import {AuthService, OrdersService} from "../../core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  carts$: Observable<Cart[]> = this.cartService.carts$

  sub$: Subject<any> = new Subject<any>()

  get total() {
    return this.cartService.totalPrice
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  removeFromCart(cart: Cart) {
    this.cartService.removeFromCart(cart)
  }

  checkout(carts: Cart[]) {
    const checkout  = {
      carts,
      total: this.cartService.totalPrice,
      user: this.authService.email
    }
    console.log(checkout)

    this.ordersService.create(checkout)
      .pipe(takeUntil(this.sub$))
      .subscribe((res) => {
        this.cartService.removeCart()
        this.router.navigate(['/orders'])
      })
  }

  ngOnDestroy(): void {
    this.sub$.next(null)
    this.sub$.complete()
  }
}
