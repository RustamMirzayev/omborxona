import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    PasswordModule,
    ButtonModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

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
