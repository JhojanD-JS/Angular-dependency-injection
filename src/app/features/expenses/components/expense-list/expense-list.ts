import { Component } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Expense, ExpenseCategory, ExpenseData } from '../../models/expenseModel';
import { ExpenseForm } from '../expense-form/expense-form';

@Component({
  selector: 'app-expense-list',
  imports: [CurrencyPipe, DatePipe, ExpenseForm],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {
  showForm = false;
  formTitle = '';
  expenseToEdit: Expense | null = null;

  expensesList: Expense[] = [
    {
      id: 1,
      description: 'Alquiler de apartamento',
      amount: 1200,
      date: '2026-10-01',
      category: ExpenseCategory.Housing,
    },
    {
      id: 2,
      description: 'Supermercado',
      amount: 250,
      date: '2026-10-03',
      category: ExpenseCategory.Food,
    },
    {
      id: 3,
      description: 'Transporte público',
      amount: 50,
      date: '2026-10-05',
      category: ExpenseCategory.Transport,
    },
    {
      id: 4,
      description: 'Suscripción a Netflix',
      amount: 15,
      date: '2026-10-06',
      category: ExpenseCategory.Entertainment,
    },
    {
      id: 5,
      description: 'Gimnasio',
      amount: 40,
      date: '2026-10-08',
      category: ExpenseCategory.Health,
    },
  ];

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
      this.updateExpense(this.expenseToEdit.id, data);
    } else {
      this.addExpense(data);
    }
    this.closeForm();
  }

  addExpense(data: ExpenseData): void {
    // Buscamos el id más alto para que el nuevo sea el siguiente
    let highestId = 0;
    for (const expense of this.expensesList) {
      if (expense.id > highestId) {
        highestId = expense.id;
      }
    }

    const newExpense: Expense = {
      id: highestId + 1,
      description: data.description,
      amount: data.amount,
      date: data.date,
      category: data.category,
    };

    this.expensesList.push(newExpense);
  }

  updateExpense(id: number, data: ExpenseData): void {
    for (const expense of this.expensesList) {
      if (expense.id === id) {
        expense.description = data.description;
        expense.amount = data.amount;
        expense.date = data.date;
        expense.category = data.category;
      }
    }
  }

  deleteExpense(expense: Expense): void {
    const ok = confirm('¿Eliminar "' + expense.description + '"?');
    if (ok) {
      for (let i = 0; i < this.expensesList.length; i++) {
        if (this.expensesList[i].id === expense.id) {
          this.expensesList.splice(i, 1);
          break;
        }
      }
    }
  }

  hasExpenses(): boolean {
    return this.expensesList.length > 0;
  }
}
