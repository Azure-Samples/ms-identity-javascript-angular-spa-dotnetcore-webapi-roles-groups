import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: MsalService) { }

  loggedIn = false;

  ngOnInit(): void {
    
    this.checkAccount();

    this.authService.handleRedirectObservable().subscribe({
      next: (result) => console.log(result),
      error: (error) => console.log(error)
    });
  }

  checkAccount() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

}
