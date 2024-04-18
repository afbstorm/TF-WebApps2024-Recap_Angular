import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, PasswordModule, ButtonModule, InputTextModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  registerSub!: Subscription;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {
    this.registerForm = this._fb.group({
      username: [null, [Validators.required, Validators.maxLength(12)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(12)]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.registerSub = this._authService.register(this.registerForm.value).subscribe({
        next: (response: any) => this._router.navigate(['/login', {message: response.message}]),
        error: (error) => console.error(error)
      })
    }
  }
}
