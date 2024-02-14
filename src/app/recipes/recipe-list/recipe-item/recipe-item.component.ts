import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss',
})
export class RecipeItemComponent {
  @Input('recipeItem') recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
