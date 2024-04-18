import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    MessageModule,
    MessagesModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private messageSub!: Subscription;

  loginForm: FormGroup;
  loginSub!: Subscription;
  successRegister!: string;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _route: ActivatedRoute, private _router: Router) {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(12)]]
    })
  }

  ngOnInit(): void {
    this.messageSub = this._route.params.subscribe(params => {
      this.successRegister = params['message'];
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginSub = this._authService.login(this.loginForm.value).subscribe({
        next: (response) => this._router.navigate(['/home']),
        error: (error) => console.error(error)
      })
    }
  }
}
