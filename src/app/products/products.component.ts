import { Component, OnInit } from '@angular/core';
import { CartApiService } from '../cart-api.service';
import { Item } from '../item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private api:CartApiService) { }

  products: Item[];
  newItemForm: boolean = false;
  editItemForm: boolean = false;
  selectedIndex: number;
  ngOnInit(): void {
    this.api.getAllItems().subscribe((data: Item[])=>{
      this.products = data;
    })
  }

  delete(id) {
    this.api.deleteItem(id).subscribe(()=>{
      this.products.splice(id,1);
      return id;
    })
  }

  edit(g) {
    let newItem: Item = {
      id: this.products[this.selectedIndex].id,
      product: g.value.productEdit,
      price: g.value.priceEdit,
      quantity: g.value.quantityEdit
    };
    this.api.editItem(newItem, this.selectedIndex).subscribe(()=>{
      this.products.splice(this.selectedIndex,1,newItem);
      return newItem;
    });
    this.toggleEdit();
  }

  addItem(f) {
    let newItem: Item = {
      id: this.products.length+1,
      product: f.value.product,
      price: f.value.price,
      quantity: f.value.quantity
    };
    this.api.addItem(newItem).subscribe(()=>{
      this.products.push(newItem);
      return newItem;
    })
    this.toggleForm();
  }

  toggleForm= () => {
    if (this.editItemForm) {
      this.editItemForm = false;
    }
    (this.newItemForm) ? this.newItemForm = false : this.newItemForm = true;
  }
  toggleEdit= (index?) => {
    if (index) {
      this.selectedIndex = index;
    }
    if (this.newItemForm) {
      this.newItemForm = false;
    }
    (this.editItemForm) ? this.editItemForm = false : this.editItemForm = true;
  }
}
