import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalSpinnerComponent } from './shared/components/global-spinner/global-spinner.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, GlobalSpinnerComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {}

  showHeader(): boolean {
    return !this.router.url.includes('login');
  }
  title = 'angular-test-app';
}
