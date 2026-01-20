export interface CreateActivityFormInput {
  title: string
  description?: string
  date: Date
  hour?: string
  estimatedCost?: number
  status: 'PLANNED' | 'DONE' | 'CANCELED'
}
