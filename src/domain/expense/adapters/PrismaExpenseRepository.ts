import { prisma } from "@/lib/prisma";

import { ExpenseRepository } from "../interfaces/ExpenseRepository";
import { CreateExpenseDTO } from "../dtos/CreateExpenseDTO";
import { Expense } from "../entities/Expense";

import { ExpenseCategory as DomainExpenseCategory } from "../enums/ExpenseCategory";
import { ExpenseCategory as PrismaExpenseCategory } from "@prisma/client";


export class PrismaExpenseRepository implements ExpenseRepository {
  async create(createExpenseDTO: CreateExpenseDTO): Promise<Expense> {
    const { title, amount, category, date, tripId, paidById, participants } = createExpenseDTO;

    const expense = await prisma.expense.create({
      data: {
        title,
        amount,
        category: category
          ? (category as PrismaExpenseCategory)
          : null,
        date,
        tripId,
        paidById,
        participants: {
          createMany: {
            data: participants.map(userId => ({
              userId,
            })),
          },
        },
      },
    });

    return {
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category
        ? (expense.category as DomainExpenseCategory)
        : undefined,
      date: expense.date,
      tripId: expense.tripId,
      paidById: expense.paidById,
      createdAt: expense.createdAt,
    };
  }

  async findByTripId(tripId: string): Promise<Expense[]> {
    const expensesList = await prisma.expense.findMany({
      where: { tripId },
      orderBy: { date: "desc" },
    })

    return expensesList.map(expense => ({
      id: expense.id,
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category as DomainExpenseCategory,
      date: expense.date,
      tripId: expense.tripId,
      paidById: expense.paidById,
      createdAt: expense.createdAt,
    }))
  }
}
