import { Component } from '@angular/core';
import { AuthService } from "./_services"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  loggedIn: boolean
  
  constructor(private auth: AuthService) {
  }

  onRoutesChanged(): void {
    this.auth.isLoggedIn.subscribe( status => this.loggedIn = status)
  }
}
