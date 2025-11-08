import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemsService } from '../../core/services/item.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatProgressSpinnerModule],
  providers: [ItemsService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  items: any[] = [];
  isLoading = true;
  isError = false;

  constructor(private itemsService: ItemsService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.isError = false;

    this.itemsService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.isError = true;
      },
    });
  }
}
