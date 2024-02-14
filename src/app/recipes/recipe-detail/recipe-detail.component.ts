import { Component, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingListService } from '../../shoppingList/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
})
export class RecipeDetailComponent {
  @Input('selectedRecipe') recipe: Recipe;

  constructor(private recipeService: RecipeService) {}

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    console.log(this.recipe.ingredients);
  }
}
