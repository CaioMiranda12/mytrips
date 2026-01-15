import { TripDetailsProvider } from '@/app/shared/providers/TripDetailsProvider'

export default async function TripLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tripId: string }>
}) {
  const { tripId } = await params;

  return (
    <TripDetailsProvider tripId={tripId}>
      {children}
    </TripDetailsProvider>
  )
}
