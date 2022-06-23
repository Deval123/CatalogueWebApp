import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CatalogueWebApp';

  constructor(private authen: AuthenticationService) {
  }

  isAdmin() {
    return this.authen.isAdmin();
  }

  isUser() {
    return this.authen.isUser();
  }

  isAuthenticated() {
    return this.authen.isAuthenticated();
  }

  ngOnInit(): void {
    this.authen.loadToken();
  }

  logOut(){
    this.authen.logOut();
  }
}
