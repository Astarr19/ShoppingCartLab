import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Item} from './item'

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private http: HttpClient) { }

  getAllItems(){
    return this.http.get("http://localhost:3000/cart-items", { responseType: "json"});
  }
  deleteItem(id: number){
    return this.http.delete(`http://localhost:3000/cart-items/${id}`, {responseType: "json"});
  }
  addItem(item: Item) {
    return this.http.post("http://localhost:3000/cart-items", {newItem: item}, {responseType: "json"});
  }

  editItem(item: Item, id: number){
    return this.http.put(`http://localhost:3000/cart-items/${id}`, {newItem: item}, {responseType: "json"});
  }
}
