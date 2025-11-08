import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/common-button/common-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  userEmail = this.auth.getUserEmail();

  gotoItemsPage() {
    this.router.navigate(['/list']);
  }
}
