import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/services";
import {CartService} from "../../../core/services/cart.service";
import {reduce} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartCount = 0

  constructor(
    public authService: AuthService,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.getCartCount()
  }

  getCartCount() {
    this.cartService.carts$
      .subscribe(carts => {
        console.log(carts)
      if (carts) {
        this.cartCount = carts.reduce((acc: any, item: any) => {
          return acc + item.quantity
        },0)
      }
    })
  }

  logout() {
    this.authService.logout()
  }
}
