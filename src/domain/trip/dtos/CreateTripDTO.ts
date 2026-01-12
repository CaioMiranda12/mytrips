export type CreateTripDTO = {
  title: string
  description?: string
  location: string;
  startDate: Date
  endDate: Date
  ownerId: string
}
