import {Injectable} from '@angular/core';
import {Category} from "../interfaces/category";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<Category> {
  override documentName: string = 'categories'
}
