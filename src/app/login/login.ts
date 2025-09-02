import { Component } from '@angular/core';

@Component({
  selector: 'login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  counter = 0;
  
  increment() {
    debugger
    this.counter++;
  }
  str = 'Login works!dsdsd';
}
