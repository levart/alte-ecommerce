import {Injectable} from '@angular/core';
import {Product} from "../interfaces/product";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product> {
  override documentName: string = 'products'
}
