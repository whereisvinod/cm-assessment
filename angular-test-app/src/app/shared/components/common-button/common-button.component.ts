import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.scss'],
})
export class ButtonComponent {
  @Input() buttonClass: string = 'default-btn';
  @Input() disabled: boolean = false;
  @Output() btnClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.btnClick.emit(event);
  }
}
