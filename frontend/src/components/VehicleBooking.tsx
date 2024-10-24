import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface VehicleBookingProps {
  bookingDetails: { pickup: string; dropoff: string; vehicleType: string };
  estimatedBookingResponse: { estimatedPrice: string; totalDistance: string; estimatedDuration: string };
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVehicleTypeChange: (value: string) => void;
  handleGetPriceEstimate: () => void;
  handleConfirmBooking: () => void;
}

export function VehicleBooking({
  bookingDetails,
  estimatedBookingResponse,
  isDialogOpen,
  setIsDialogOpen,
  handleInputChange,
  handleVehicleTypeChange,
  handleGetPriceEstimate,
  handleConfirmBooking,
}: VehicleBookingProps) {
  return (
    <>
      {/* Book a Vehicle Card */}
      <Card>
        <CardHeader>
          <CardTitle>Book a Vehicle</CardTitle>
          <CardDescription>Enter your booking details</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  name="pickup"
                  placeholder="Enter pickup Location"
                  value={bookingDetails.pickup}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <Input
                  id="dropoff"
                  name="dropoff"
                  placeholder="Enter drop-off Location"
                  value={bookingDetails.dropoff}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle-type">Vehicle Type</Label>
              <Select onValueChange={handleVehicleTypeChange}>
                <SelectTrigger id="vehicle-type">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="trailer">Trailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full md:w-auto" onClick={handleGetPriceEstimate}>
              Get Price Estimate
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>Here are the details for your booking:</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Estimated Price:</span>
              <span className="text-2xl font-bold">{estimatedBookingResponse.estimatedPrice}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Distance:</span>
              <span>{estimatedBookingResponse.totalDistance}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Estimated Duration:</span>
              <span>{estimatedBookingResponse.estimatedDuration} minutes</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
