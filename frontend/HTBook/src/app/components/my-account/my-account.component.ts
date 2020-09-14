import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  user: User;
  page: string;
  maxDate: Date;
  phoneExists: boolean;
  updateSuccess: boolean;
  oldPasswordIncorrect: boolean;

  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

    $('.hero__categories ul').removeClass('d-block');
    $('.hero__categories ul').addClass('d-none');

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    }
    );

    this.maxDate = new Date();

    this.profileForm = new FormGroup({
      'fullName': new FormControl(this.user.customer.fullName, [Validators.required, this.validateFullName]),
      'phoneNumber': new FormControl({ value: this.user.phoneNumber, disabled: this.user.phoneNumber }, [Validators.pattern('(09|03|07|08|05)+([0-9]{8})')]),
      'email': new FormControl({ value: this.user.email, disabled: this.user.email }, [Validators.required, Validators.email]),
      'password': new FormControl({ value: '', disabled: true }),
      'newPassword': new FormControl({ value: '', disabled: true }),
      'passwordConfirm': new FormControl({ value: '', disabled: true }),
      'gender': new FormControl(this.user.customer.gender),
      'birthday': new FormControl(this.user.customer.birthday)
    }
    );
  }

  onUpdateSubmit() {
    // show error message and not submit
    if (this.profileForm.invalid) {
      console.log('invalid');
      this.profileForm.markAllAsTouched();
      return;
    }

    this.user.email = this.profileForm.get('email').value;
    this.user.phoneNumber = this.profileForm.get('phoneNumber').value;
    this.user.password = this.profileForm.get('password').value;
    this.user.newPassword = this.profileForm.get('newPassword').value;

    this.user.customer.fullName = this.profileForm.get('fullName').value;
    this.user.customer.gender = this.profileForm.get('gender').value;
    this.user.customer.birthday = this.profileForm.get('birthday').value;

    this.authService.updateProfile(this.user).subscribe(
      res => {
        console.log(res);
        this.updateSuccess = true;
      },
      error => {
        console.log(error);

        switch (error.error) {

          case 'phoneExists':
            this.phoneExists = true;
            setTimeout(() => {
              this.phoneExists = false;
            }, 3000);
            break;

          case 'oldPasswordIncorrect':
            this.oldPasswordIncorrect = true;
            setTimeout(() => {
              this.oldPasswordIncorrect = false;
            }, 3000);
            break;
        }
      }
    );
  }

  toggleEditable(event) {
    if (event.target.checked) {
      this.profileForm.get('password').enable();
      this.profileForm.get('newPassword').enable();
      this.profileForm.get('passwordConfirm').enable();
      this.profileForm.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32)]);
      this.profileForm.get('newPassword').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32)]);
      this.profileForm.get('passwordConfirm').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(32)]);
      this.profileForm.setValidators(this.checkPasswords);
    } else {
      this.profileForm.get('password').disable();
      this.profileForm.get('newPassword').disable();
      this.profileForm.get('passwordConfirm').disable();
    }
  }

  // Form Validators
  validateFullName(control: FormControl) {
    let fullName: string = control.value.trim();

    return (fullName.length > 0 && fullName.split(' ').length < 2) ? { 'invalidFullName': true } : null;
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('newPassword').value;
    let confirmPass = group.get('passwordConfirm').value;

    return pass === confirmPass ? null : { 'passwordMismatch': true }
  }


  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
