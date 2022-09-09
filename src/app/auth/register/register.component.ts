import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  invalidDetails: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerForm = this.fb.group({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  registerUser() {
    this.submitted = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: res => {
        this.submitted = false;
        console.log(res);
        Swal.fire({
          title: 'Registration successful!',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        })
        setTimeout(()=> {
          this.router.navigateByUrl('auth/login');
        }, 3000)
      },
      error: err => {
        this.invalidDetails = true;
        console.log(err);
        
      }
    })
  }
}
