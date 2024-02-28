import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  defaultAmount = 1;
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('shoppingListForm', { static: false }) shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;

        this.editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFormSubmit(shoppingListForm: NgForm) {
    console.log(shoppingListForm.value);
    console.log(shoppingListForm);

    const newIngredient = new Ingredient(
      shoppingListForm.value.name,
      shoppingListForm.value.amount
    );

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editItemIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.onIngredientAdded(newIngredient);
    }

    this.editMode = false;
    shoppingListForm.reset();
  }

  onFormClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onItemDelete() {
    this.shoppingListService.deleteIngredient(this.editItemIndex);
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
