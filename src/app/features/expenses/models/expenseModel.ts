export enum ExpenseCategory {
  Housing,
  Food,
  Entertainment,
  Health,
  Transport,
  Others,
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}

// Lo que sale del formulario: un gasto sin id
export interface ExpenseData {
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
}
