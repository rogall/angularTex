import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../_models';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Product[]>(`http://localhost:8081/products`);
  }

  register(title: string, desc: string) {
      var p = new Product();
      p.Title = title;
      p.Description = desc;
      return this.http.post(`http://localhost:8081/product/` + title + `/` + desc, p).subscribe(
        data => {
           alert(data);
        },
        error => {
            
        });
  }
}
