
export type CreateActivityDTO = {
  title: string;
  description?: string;
  date: Date;
  status: 'PLANNED' | 'DONE' | 'CANCELED';
  tripId: string;
}