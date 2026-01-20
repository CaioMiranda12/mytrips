
export type Activity = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  hour?: string;
  estimatedCost?: number;
  status: 'PLANNED' | 'DONE' | 'CANCELED';
  tripId: string;
  createdAt: Date;
}