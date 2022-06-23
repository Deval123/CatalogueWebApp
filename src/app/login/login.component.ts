import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authen: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogin(value: any) {
    console.log(value);
    this.authen.login(value)
      .subscribe(res => {
        let jwt = res.headers.get('Authorization');
        console.log(jwt);
        this.authen.saveToken(jwt);
        this.router.navigateByUrl('/');
      }, err => {
        if (err.status == 403) {
          console.log(err);
        }
      });
  }

  isAdmin() {
    return this.authen.isAdmin();
  }

  isUser() {
    return this.authen.isUser();
  }
}
