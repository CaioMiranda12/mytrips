import { ExpenseCategory } from "../enums/ExpenseCategory";

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category?: ExpenseCategory;
  date: Date;
  tripId: string;
  paidById: string;
  paidBy?: {
    id: string;
    name: string;
  }
  createdAt: Date;
  participants?: {
    id: string;
    expenseId: string;
    userId: string;
  }[]
};
