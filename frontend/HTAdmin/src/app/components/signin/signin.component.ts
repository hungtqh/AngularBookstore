import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  spinner: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let username = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.login(username, password);
  }

  login(username: string, password: string) {
    this.spinner = true;
    this.authService.login(username, password).subscribe(
      res => {
        console.log(res);
        //this.loggedIn = true;
        this.spinner = false;
        location.reload();
      },
      error => {
        console.log(error);
        this.spinner = false;
        //this.loggedIn = false;
      }
    )
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      res => {
        console.log(res);
      },
      error => {
        //console.log(error);
      }
    );
  }
}
