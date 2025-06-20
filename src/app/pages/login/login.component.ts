import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  // Qo'lda belgilangan login va parol
  readonly correctUsername = 'admin';
  readonly correctPassword = '1234';

  constructor(private router: Router) {}

  onLogin() {
    if (
      this.username === this.correctUsername &&
      this.password === this.correctPassword
    ) {
      this.router.navigate(['/products']); // Sahifani o'zgartiradi
    } else {
      alert('Login yoki parol noto‘g‘ri!');
    }
  }

  
}
