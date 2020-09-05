import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() display: string;

  loggedIn: boolean = false;
  loginError: boolean = false;
  loginMode: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;
  spinner: boolean = false;

  searchForm: FormGroup;
  registerForm: FormGroup;
  loginForm: FormGroup;

  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    //Get current user
    this.getCurrentUser();

    // Check session
    this.authService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
        console.log(res);
      },
      error => {
        this.loggedIn = false;
      }
    );

    this.registerForm = new FormGroup({
      'full_name': new FormControl('', [Validators.required, this.validateFullName]),
      'phone_number': new FormControl('', [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'reg_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      'gender': new FormControl('', Validators.required),
      'birthday': new FormControl('', [])
    }
    );

    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSwitchMode(mode: string) {
    mode === 'login' ? this.loginMode = true : this.loginMode = false;
  }

  onRegisterSubmit() {

    // show error message and not submit
    if (this.registerForm.invalid) {
      this.registerForm.get('gender').markAsTouched();
      this.registerForm.get('full_name').markAsTouched();
      this.registerForm.get('phone_number').markAsTouched();
      this.registerForm.get('email').markAsTouched();
      this.registerForm.get('reg_password').markAsTouched();
      this.registerForm.get('birthday').markAsTouched();

      return;
    }

    let customer = new Customer();
    customer.fullName = this.registerForm.get('full_name').value.trim();
    customer.gender = this.registerForm.get('gender').value.trim();
    customer.birthday = this.registerForm.get('birthday').value.trim();
    customer.user = this.user;

    this.user = new User();
    this.user.email = this.registerForm.get('email').value.trim();
    this.user.phoneNumber = this.registerForm.get('phone_number').value.trim();
    this.user.password = this.registerForm.get('reg_password').value.trim();
    this.user.enabled = true;
    this.user.customer = customer;

    this.authService.register(this.user).subscribe(
      res => {
        console.log(res);
        this.login(this.user.email, this.user.password);
      },
      error => {
        console.log(error);
        if (error.error === 'emailExists') {
          this.emailExists = true;
          setTimeout(() => {
            this.emailExists = false;
          }, 3000);
        } else if (error.error === 'phoneExists') {
          this.phoneExists = true;
          setTimeout(() => {
            this.phoneExists = false;
          }, 3000);
        }
      }
    );
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.get('username').markAsTouched();
      this.loginForm.get('password').markAsTouched();
      return;
    }

    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    this.login(username, password);
  }

  onLogout() {
    this.authService.logout().subscribe(
      res => {
        location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  login(username: string, password: string) {
    this.spinner = true;
    this.authService.login(username, password).subscribe(
      res => {
        console.log(res);
        this.loggedIn = true;
        this.spinner = false;
        this.loggedIn = true;

        this.getCurrentUser();
        $('#accountModal').modal('hide');
      },
      error => {
        console.log(error);
        this.spinner = false;
        this.loggedIn = false;
      }
    )
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe(
      res => {
        this.user = res;
        console.log(res);
      },
      error => {
        //console.log(error);
      }
    );
  }

  // Registration Form Validators
  validateFullName(control: FormControl): { [s: string]: boolean } {
    let fullName: string = control.value.trim();
    if (fullName.length > 0 && fullName.split(' ').length < 2) {
      return { 'invalidFullName': true };
    }

    return null;
  }

}


