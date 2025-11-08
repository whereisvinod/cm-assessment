import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  getItems(): Observable<any[]> {
    const mockItems = [
      { id: 1, name: 'Angular Basics', description: 'Learn Angular fundamentals.' },
      { id: 2, name: 'RxJS Deep Dive', description: 'Master reactive programming.' },
      { id: 3, name: 'Ng Optimizations', description: 'Improve performance and UX.' },
    ];
    return of(mockItems).pipe(delay(2000));
  }
}
