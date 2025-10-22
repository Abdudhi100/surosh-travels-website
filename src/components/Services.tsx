import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BookingModal } from "./BookingModal";

// Currency formatter for Naira
const formatNaira = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export function Services() {
  const [selectedPackage, setSelectedPackage] = useState<{
    id: string;
    title: string;
    price: number;
  } | null>(null);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const services = [
    {
      id: "package:hajj-2025",
      title: "Hajj Packages",
      description:
        "Complete Hajj pilgrimage packages with expert guidance, comfortable accommodation, and seamless logistics.",
      icon: "🕋",
      image:
        "https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjA5NDcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["5-Star Hotels", "Expert Guides", "Group Travel", "Visa Assistance"],
      badge: "Popular",
      price: 9_000_000,
    },
    {
      id: "package:umrah-2025",
      title: "Umrah Packages",
      description:
        "Flexible Umrah packages throughout the year with personalized itineraries and premium services.",
      icon: "🌙",
      image:
        "https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjA5NDcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["Year-Round", "Customizable", "Premium Hotels", "Transportation"],
      badge: "Flexible",
      price: 3_900_000,
    },
    {
      id: "package:study-abroad-2025",
      title: "Travel & Study Abroad",
      description:
        "Comprehensive support for students and travelers going abroad — from visa to accommodation.",
      icon: "✈️",
      image:
        "https://images.unsplash.com/photo-1724018305000-616597f21304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGFicm9hZCUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MDg1MjE1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      features: ["University Selection", "Visa Processing", "Accommodation", "Pre-Departure Guidance"],
      badge: "New",
      price: 6_000_000,
    },
  ];

  const handleBookNow = (service: typeof services[number]) => {
    setSelectedPackage({ id: service.id, title: service.title, price: service.price });
    setIsBookingModalOpen(true);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            Our Services
          </Badge>
          <h2 className="text-3xl lg:text-4xl mb-4 font-semibold">
            Tailored Travel Solutions for Every Journey
          </h2>
          <p className="text-muted-foreground">
            From spiritual pilgrimages to international studies, we provide end-to-end travel
            support designed for your comfort and success.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-xl transition-shadow overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-600 text-white">{service.badge}</Badge>
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">
                  {service.icon}
                </div>
              </div>

              {/* Text Content */}
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing and Button */}
                <div className="pt-2 border-t">
                  <div className="mb-3">
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <div className="text-2xl text-emerald-600 font-semibold">
                      {formatNaira(service.price)}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleBookNow(service)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Booking Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          packageData={selectedPackage}
        />
      </div>
    </section>
  );
}
