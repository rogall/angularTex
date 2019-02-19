import { Component, OnInit } from '@angular/core';

import { trigger,state,style,transition,animate,keyframes} from '@angular/animations';

import { ProductsService } from 'app/_services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('productsAnim', [
      state('active', style({
        opacity: '1'
      })),
      transition('void => *', [
        style({transform: 'translateX(-30px)', opacity: '0'}),
        animate('700ms ease-in-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in-out', style({transform: 'translateX(-30px)', opacity: '0'}))
      ])
    ])
  ]
})
export class ProductsComponent {

  constructor(private productsService: ProductsService) {       
  }

  ngOnInit() {
    this.LoadProducts();
  }

  products = [];  

  title:string = '';
  description:string = '';
  state = 'active';

  addProduct(value:any) {
    this.productsService.register(value.title, value.description);
    this.title = '';
    this.description = '';
    this.products.push({'title': value.title, 'description': value.description});
  }

  private LoadProducts() {
    this.products = [];
    this.productsService.getAll().subscribe(prods => { 
      for (let index = 0; index < prods.length; index++) {
        var p = prods[index];
        this.products.push({'title': p.Title, 'description': p.Description});
      }   
    }); 
  }
}

