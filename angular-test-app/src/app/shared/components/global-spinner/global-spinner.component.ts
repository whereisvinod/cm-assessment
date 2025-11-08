import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-global-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="overlay" *ngIf="loader.loading$ | async">
      <mat-spinner diameter="60"></mat-spinner>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.4);
        z-index: 9999;
      }
    `,
  ],
})
export class GlobalSpinnerComponent {
  loader = inject(LoadingService);
}
