import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  items: Array<any> = [
    {
      'id': 1,
      'title': "TODO #1",
      'description': 'description 1',
      "isCompleted": false
    },
    {
      'id': 2,
      'title': "TODO #2",
      'description': 'description 2',
      "isCompleted": false
    },
    {
      'id': 3,
      'title': "TODO #3",
      'description': 'description 3',
      "isCompleted": false
    },
    {
      'id': 4,
      'title': "TODO #4",
      'description': 'description 4',
      "isCompleted": false
    },
    {
      'id': 5,
      'title': "TODO #5",
      'description': 'description 5.',
      "isCompleted": false
    }
  ]

  constructor(private http: HttpClient) { }

  createItem(title, description) {

    let randomId = Math.random().toString(36).substr(2, 5);
    this.items.push({
      'id': randomId,
      'title': title,
      'description': description,
      isCompleted: false
    });
  }

  getItems() {
    return this.items;
  }

  getItemById(id) {
    return this.items.filter(item => item.id === id);
  }
}
