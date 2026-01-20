
export type Activity = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  hour?: string;
  amount?: number;
  status: 'PLANNED' | 'DONE' | 'CANCELED';
  tripId: string;
  createdAt: Date;
}