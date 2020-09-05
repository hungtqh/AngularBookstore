import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy {
  private userSub: Subscription;

  user: User;
  page: string;
  profileForm: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    }
    );

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
