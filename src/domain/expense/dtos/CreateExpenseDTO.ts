import { ExpenseCategory } from "../enums/ExpenseCategory";

export type CreateExpenseDTO = {
  title: string;
  amount: number;
  category?: ExpenseCategory;
  date: Date;
  tripId: string;
  paidById: string;
  participants: string[];
};
