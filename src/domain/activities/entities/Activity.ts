
export type Activity = {
  id: string;
  title: string;
  description?: string;
  date: Date;
  status: 'PLANNED' | 'DONE' | 'CANCELED';
  tripId: string;
  createdAt: Date;
}