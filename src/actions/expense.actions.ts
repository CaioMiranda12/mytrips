'use server'

import { PrismaExpenseRepository } from "@/domain/expense/adapters/PrismaExpenseRepository";
import { CreateExpense } from "@/domain/expense/use-cases/CreateExpense";
import { CreateExpenseDTO } from "@/domain/expense/dtos/CreateExpenseDTO";

export async function createExpenseAction(data: CreateExpenseDTO) {
  const repo = new PrismaExpenseRepository();
  const useCase = new CreateExpense(repo);

  return useCase.execute(data);
}
