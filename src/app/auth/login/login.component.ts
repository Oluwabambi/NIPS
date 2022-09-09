import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  invalidUser: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // if (localStorage.getItem('token') !== null) {
    //   this.router.navigateByUrl('index/clients');
    // }
  }

  loginForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  userLogin() {
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
    this.submitted = false;
    this.invalidUser = false;
    console.log(res);
    localStorage.setItem('token', res.message.user_token.token);
    localStorage.setItem('loggedInUser', res.message.user);
    this.router.navigateByUrl('index/clients');
      },
      error: (err) => {
        this.invalidUser = true;
        this.submitted = false;
        console.log(err);
      },
    })

  }

}
