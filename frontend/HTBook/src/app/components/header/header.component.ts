import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConst } from 'src/app/utils/app-const';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  loginError: boolean = false;
  loginMode: boolean = false;
  emailExists: boolean = false;
  phoneExists: boolean = false;
  spinner: boolean = false;
  loginMessage: string;
  maxDate: Date;

  searchForm: FormGroup;
  registerForm: FormGroup;
  loginForm: FormGroup;

  user: User;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // max birthday date
    this.maxDate = new Date();

    // facebook and google login listener
    this.route.queryParams.subscribe(params => {
      let authCode = params['code'];
      let loginPage = params['login-page'];

      if (authCode) {

        if (loginPage === 'google') {
          this.authService.loginWithGoogle(authCode).subscribe(
            res => {
              console.log(res);
              this.loggedIn = true;

              //Remove query params
              this.router.navigate([''], {
                queryParams: {
                  'code': null,
                  'login-page': null
                },
                queryParamsHandling: 'merge'
              })
              this.getCurrentUser();
            },
            error => {
              console.log(error);
            }
          );
        } else if (loginPage === 'facebook') {

          this.authService.loginWithFacebook(authCode).subscribe(
            res => {
              console.log(res);

              if (!res.hasEmail) {
                this.loginMessage = 'Vui lòng cập nhật địa chỉ email cho tài khoản facebook của bạn rồi thực hiện lại!';
              } else {
                this.loggedIn = true;

                //Remove query params
                this.router.navigate([''], {
                  queryParams: {
                    'code': null,
                    'login-page': null
                  },
                  queryParamsHandling: 'merge'
                })
                this.getCurrentUser();
              }
            },
            error => {
              console.log(error);
            }
          );

        }
      }
    }
    );

    //Get current user
    this.getCurrentUser();

    this.registerForm = new FormGroup({
      'full_name': new FormControl('', [Validators.required, this.validateFullName]),
      'phone_number': new FormControl('', [Validators.required, Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'reg_password': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      'gender': new FormControl('', Validators.required),
      'birthday': new FormControl('', [Validators.required])
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
      this.registerForm.markAllAsTouched();

      return;
    }

    let customer = new Customer();
    customer.fullName = this.registerForm.get('full_name').value;
    customer.gender = this.registerForm.get('gender').value;
    customer.birthday = this.registerForm.get('birthday').value;
    customer.user = this.user;

    this.user = new User();
    this.user.email = this.registerForm.get('email').value;
    this.user.phoneNumber = this.registerForm.get('phone_number').value;
    this.user.password = this.registerForm.get('reg_password').value;
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
      this.loginForm.markAllAsTouched();
      return;
    }

    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;

    this.login(username, password);
  }

  onLoginGoogle() {
    window.location.href = AppConst.googleLoginUrl;
  }

  onLoginFacebook() {
    window.location.href = AppConst.facebookLoginUrl;
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
      user => {
        this.user = user;
        console.log(user);
        this.loggedIn = !!user;
      },
      error => {
        //console.log(error);
        this.loggedIn = false;
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


