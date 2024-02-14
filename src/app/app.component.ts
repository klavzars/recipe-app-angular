import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'recipe-app';
  displayComponent = 'recipe';

  onNavigationEvent(component: string) {
    console.log('display component: ' + component);
    this.displayComponent = component;
  }
}
