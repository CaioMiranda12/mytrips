import { ExpenseRepository } from "../interfaces/ExpenseRepository";
import { CreateExpenseDTO } from "../dtos/CreateExpenseDTO";

export class CreateExpense {
  constructor(private expenseRepo: ExpenseRepository) { }

  async execute(createExpenseDto: CreateExpenseDTO) {
    if (createExpenseDto.amount <= 0) {
      throw new Error("Valor da despesa inválido");
    }

    if (createExpenseDto.participants.length === 0) {
      throw new Error("Despesa precisa de participantes");
    }

    return this.expenseRepo.create(createExpenseDto);
  }
}
