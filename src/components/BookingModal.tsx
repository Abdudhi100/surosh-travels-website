// src/components/BookingModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar, Users, Loader2 } from "lucide-react";
import { createBooking } from "../utils/api";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageData: {
    id: string;
    title: string;
    price: number;
  } | null;
}

export function BookingModal({ isOpen, onClose, packageData }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    departureDate: "",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageData) return;

    setIsSubmitting(true);

    try {
      await createBooking({
        packageId: packageData.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelers: parseInt(formData.travelers),
        departureDate: formData.departureDate,
        specialRequests: formData.specialRequests
      });

      toast.success("Booking submitted successfully! We'll contact you shortly to confirm.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        travelers: "1",
        departureDate: "",
        specialRequests: ""
      });
      onClose();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = packageData ? packageData.price * parseInt(formData.travelers || "1") : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Journey</DialogTitle>
          <DialogDescription>
            {packageData?.title && `Complete the form below to book ${packageData.title}`}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-name">Full Name *</Label>
              <Input
                id="booking-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-email">Email *</Label>
              <Input
                id="booking-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="booking-phone">Phone Number *</Label>
              <Input
                id="booking-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+234 8125424121"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-travelers">Number of Travelers *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="booking-travelers"
                  type="number"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-date">Preferred Departure Date *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="booking-date"
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="pl-10"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="booking-requests">Special Requests (Optional)</Label>
            <Textarea
              id="booking-requests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              placeholder="Any special requirements or preferences..."
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Price per person:</span>
              <span>#{packageData?.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Number of travelers:</span>
              <span>{formData.travelers}</span>
            </div>
            <div className="border-t border-emerald-200 pt-2 flex justify-between">
              <span>Total Amount:</span>
              <span className="text-emerald-600">#{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Booking"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
