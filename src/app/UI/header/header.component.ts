import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() navigationEvent = new EventEmitter<string>();

  onNavigateRecipes() {
    this.navigationEvent.emit('recipe');
  }

  onNavigateShoppingList() {
    this.navigationEvent.emit('shop');
  }
}
