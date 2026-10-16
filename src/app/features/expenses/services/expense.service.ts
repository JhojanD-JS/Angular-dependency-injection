import { Injectable } from '@angular/core';
import { Expense, ExpenseCategory, ExpenseData } from '../models/expenseModel';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private expensesList: Expense[] = [
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

  // Devuelve la lista original (no una copia) para que la tabla se actualice sola
  getExpenses(): Expense[] {
    return this.expensesList;
  }

  addExpense(data: ExpenseData): void {
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

  deleteExpense(id: number): void {
    for (let i = 0; i < this.expensesList.length; i++) {
      if (this.expensesList[i].id === id) {
        this.expensesList.splice(i, 1);
        break;
      }
    }
  }
}
