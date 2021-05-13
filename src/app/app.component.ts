import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Person, PersonService } from './person.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  people: Person[] = [
    {
      name: 'Jeiferson',
      age: 22,
      photo: 'https://media-exp1.licdn.com/dms/image/C4D03AQF0dkDPtCiLLA/profile-displayphoto-shrink_800_800/0/1620828159535?e=1626307200&v=beta&t=dCZlI-SmzPQwK6mNVLv7MHhwoImtB5eW2_pumOLTQI4'
    },
  ];

  showPhotoModal: boolean;
  showFormModal: boolean;
  photoUrl: string;
  currentIndex: number;

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
    photo: new FormControl(null),
  });

  constructor(
    private readonly personService: PersonService,
  ) {}

  newPerson() {
    this.showFormModal = true;
  }

  viewPhoto(url: string, index: number) {
    this.photoUrl = url;
    this.showPhotoModal = true;
    this.currentIndex = index;
  }

  savePerson() {
    if (this.form.invalid) {
      alert('Formulário inválido!');
      return;
    }

    const person: Person = this.form.value;

    if (this.people.some(_person => _person.name.toLocaleLowerCase() === person.name.toLocaleLowerCase())) {
      alert('Já existe um usuário cadastrado com esse nome!');
      return;
    }
    if (!person.photo) {
      person.photo = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png';
    }

    this.personService.save(person);
    this.form.reset();
    this.showFormModal = false;

    alert('Usuário cadastrado com sucesso!');

    this.people = this.personService.getAll();
  }

}
