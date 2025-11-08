import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ButtonComponent } from '../common-button/common-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userEmail = '';

  constructor(private cookieService: CookieService, private router: Router) {
    const userData = this.cookieService.get('user');
    if (userData) {
      this.userEmail = JSON.parse(userData).email;
    }
  }

  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  }
}
