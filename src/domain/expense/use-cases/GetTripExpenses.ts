import { ExpenseRepository } from "../interfaces/ExpenseRepository"

export class GetTripExpenses {
  constructor(private expenseRepo: ExpenseRepository) { }

  async execute(tripId: string) {
    if (!tripId) {
      throw new Error("TripId é obrigatório")
    }

    return this.expenseRepo.findByTripId(tripId)
  }
}
