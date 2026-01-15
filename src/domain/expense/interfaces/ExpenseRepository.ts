import { Expense } from "../entities/Expense";
import { CreateExpenseDTO } from "../dtos/CreateExpenseDTO";

export interface ExpenseRepository {
  create(createExpenseDTO: CreateExpenseDTO): Promise<Expense>;
  findByTripId(tripId: string): Promise<Expense[]>
}
