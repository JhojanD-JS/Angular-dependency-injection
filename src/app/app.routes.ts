import { Routes } from '@angular/router';
import { Layout } from './layout/layout/layout';
import { ExpenseList } from './features/expenses/components/expense-list/expense-list';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [{ path: 'gastos', component: ExpenseList }],
  },
];
