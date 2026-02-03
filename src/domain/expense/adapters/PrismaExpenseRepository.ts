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
      include: {
        participants: true,
      }
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
      participants: expense.participants.map(participant => ({
        id: participant.id,
        expenseId: participant.expenseId,
        userId: participant.userId
      }))
    };
  }

  async findByTripId(tripId: string): Promise<Expense[]> {
    const expensesList = await prisma.expense.findMany({
      where: { tripId },
      orderBy: { date: "desc" },
      include: {
        participants: true,
      }
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
      participants: expense.participants?.map(participant => ({
        id: participant.id,
        expenseId: participant.expenseId,
        userId: participant.userId
      })) || []
    }))
  }
}
