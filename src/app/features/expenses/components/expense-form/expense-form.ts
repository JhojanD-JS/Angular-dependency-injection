import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense, ExpenseCategory, ExpenseData } from '../../models/expenseModel';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css',
})
export class ExpenseForm implements OnInit {
  @Input() title = '';
  @Input() expense: Expense | null = null;
  @Output() saved = new EventEmitter<ExpenseData>();
  @Output() closed = new EventEmitter<void>();

  ExpenseCategory = ExpenseCategory;
  showError = false;

  form: ExpenseData = {
    description: '',
    amount: 0,
    date: '',
    category: ExpenseCategory.Others,
  };

  ngOnInit(): void {
    // Si llega un gasto, estamos editando: copiamos sus datos al formulario
    if (this.expense) {
      this.form = {
        description: this.expense.description,
        amount: this.expense.amount,
        date: this.expense.date,
        category: this.expense.category,
      };
    } else {
      this.form.date = this.getToday();
    }
  }

  // Devuelve la fecha de hoy con el formato yyyy-MM-dd que usa <input type="date">
  getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());

    if (month.length === 1) {
      month = '0' + month;
    }
    if (day.length === 1) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  }

  save(): void {
    const descriptionEmpty = this.form.description.trim() === '';
    const dateEmpty = this.form.date === '';
    const amountInvalid = this.form.amount <= 0;

    if (descriptionEmpty || dateEmpty || amountInvalid) {
      this.showError = true;
    } else {
      this.saved.emit(this.form);
    }
  }

  close(): void {
    this.closed.emit();
  }
}
