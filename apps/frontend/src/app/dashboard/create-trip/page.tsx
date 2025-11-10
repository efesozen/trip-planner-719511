'use client';

import { useTrips } from '@/features/trips/hooks/use-trips';

export default function CreateTripPage() {
  const { data: trips, isLoading } = useTrips();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create Trip</h1>
      <p className="text-muted-foreground mb-6">Page for creating a new trip and itinerary.</p>
      
      <div className="grid gap-4">
        {trips?.map((trip: any) => (
          <div key={trip.id} className="border rounded p-4">
            <pre>{JSON.stringify(trip, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
