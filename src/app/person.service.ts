import { Injectable } from '@angular/core';

export interface Person {
  name: string;
  age: number;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private people: Person[] = [];

  constructor() { }

  save(person: Person) {
    this.people.push(person);
  }

  getAll() {
    return this.people;
  }

}
