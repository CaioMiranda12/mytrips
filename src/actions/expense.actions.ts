'use server'

import { PrismaExpenseRepository } from "@/domain/expense/adapters/PrismaExpenseRepository";
import { CreateExpense } from "@/domain/expense/use-cases/CreateExpense";
import { CreateExpenseDTO } from "@/domain/expense/dtos/CreateExpenseDTO";
import { GetTripExpenses } from "@/domain/expense/use-cases/GetTripExpenses";

export async function createExpenseAction(data: CreateExpenseDTO) {
  const repo = new PrismaExpenseRepository();
  const useCase = new CreateExpense(repo);

  return useCase.execute(data);
}

export async function getTripExpensesAction(tripId: string) {
  const repo = new PrismaExpenseRepository()
  const useCase = new GetTripExpenses(repo)

  return useCase.execute(tripId)
}