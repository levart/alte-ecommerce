import {Category} from "./category";

export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  description: string;
  image: string;
}
