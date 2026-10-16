import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Expense, ExpenseCategory, ExpenseData } from '../../models/expenseModel';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseForm } from '../expense-form/expense-form';

@Component({
  selector: 'app-expense-list',
  imports: [CurrencyPipe, DatePipe, ExpenseForm],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList implements OnInit {
  expensesList: Expense[] = [];
  showForm = false;
  formTitle = '';
  expenseToEdit: Expense | null = null;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expensesList = this.expenseService.getExpenses();
  }

  openAdd(): void {
    this.expenseToEdit = null;
    this.formTitle = 'Agrega un nuevo gasto';
    this.showForm = true;
  }

  openEdit(expense: Expense): void {
    this.expenseToEdit = expense;
    this.formTitle = 'Edita el gasto';
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
  }

  onSaved(data: ExpenseData): void {
    if (this.expenseToEdit) {
      this.expenseService.updateExpense(this.expenseToEdit.id, data);
    } else {
      this.expenseService.addExpense(data);
    }
    this.closeForm();
  }

  deleteExpense(expense: Expense): void {
    const ok = confirm('¿Eliminar "' + expense.description + '"?');
    if (ok) {
      this.expenseService.deleteExpense(expense.id);
    }
  }

  hasExpenses(): boolean {
    return this.expensesList.length > 0;
  }

  getCategoryName(category: ExpenseCategory): string {
    switch (category) {
      case ExpenseCategory.Housing:
        return 'Vivienda';
      case ExpenseCategory.Food:
        return 'Alimentación';
      case ExpenseCategory.Entertainment:
        return 'Entretenimiento';
      case ExpenseCategory.Health:
        return 'Salud';
      case ExpenseCategory.Transport:
        return 'Transporte';
      default:
        return 'Otros';
    }
  }

  getCategoryClass(category: ExpenseCategory): string {
    switch (category) {
      case ExpenseCategory.Housing:
        return 'category-housing';
      case ExpenseCategory.Food:
        return 'category-food';
      case ExpenseCategory.Entertainment:
        return 'category-entertainment';
      case ExpenseCategory.Health:
        return 'category-health';
      case ExpenseCategory.Transport:
        return 'category-transport';
      default:
        return 'category-others';
    }
  }
}
