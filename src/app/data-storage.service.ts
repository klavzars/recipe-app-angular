import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './recipes/recipes.model';
import { RecipeService } from './recipes/recipe.service';
import { catchError, exhaustMap, map, take, tap, throwError } from 'rxjs';
import { Ingredient } from './shared/ingredient.model';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  apiUrl: string = environment.apiUrl; // Access API URL from environment

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(this.apiUrl, recipes)
      .subscribe((response) => console.log(response));
  }

  loadRecipes() {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
