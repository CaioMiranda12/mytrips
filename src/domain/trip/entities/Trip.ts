import { Expense } from "@/domain/expense/entities/Expense";

export type TripRole = 'ADMIN' | 'MEMBER'

export type TripMember = {
  userId: string;
  role: TripRole;
  name: string;
}

export type Trip = {
  id: string;
  title: string;
  description?: string;
  location: string;
  startDate: Date;
  endDate: Date;
  ownerId: string;
  createdAt: Date;
  members: TripMember[];
  expenses?: Expense[];
}
