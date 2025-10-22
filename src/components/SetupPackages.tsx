import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { createPackage } from "../utils/api";
import { toast } from "sonner";
import { Package } from "lucide-react";

export function SetupPackages() {
  const samplePackages = [
    {
      title: "Hajj Premium Package 2025",
      description: "Our premium Hajj package includes 5-star accommodations near Haram, expert guides, comprehensive visa support, and complete logistical arrangements for a stress-free pilgrimage.",
      type: "hajj",
      price: 5999,
      duration: "14 days",
      features: [
        "5-Star Hotel near Haram",
        "Expert Hajj Guides",
        "Group Transportation",
        "Visa Processing",
        "Travel Insurance",
        "24/7 Support"
      ],
      imageUrl: "https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjA5NDcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Umrah Deluxe Package",
      description: "Experience a spiritual journey with our Umrah deluxe package. Enjoy premium accommodations, guided tours, and flexible dates throughout the year.",
      type: "umrah",
      price: 2999,
      duration: "7 days",
      features: [
        "4-Star Hotel",
        "Flexible Dates",
        "Airport Transfers",
        "Visa Assistance",
        "Ziyarat Tours",
        "Prayer Materials"
      ],
      imageUrl: "https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjA5NDcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Study Abroad Complete Package",
      description: "Comprehensive support for international students including university selection, visa processing, accommodation arrangements, and pre-departure orientation.",
      type: "study-abroad",
      price: 1999,
      duration: "Full Support",
      features: [
        "University Selection",
        "Application Support",
        "Visa Processing",
        "Accommodation Help",
        "Pre-Departure Briefing",
        "Student Insurance"
      ],
      imageUrl: "https://images.unsplash.com/photo-1724018305000-616597f21304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGFicm9hZCUyMHN0dWRlbnRzfGVufDF8fHx8MTc2MDg1MjE1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const handleSetupPackages = async () => {
    try {
      for (const pkg of samplePackages) {
        await createPackage(pkg);
      }
      toast.success("Sample packages created successfully!");
    } catch (error) {
      console.error("Error setting up packages:", error);
      toast.error("Failed to create packages");
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5" />
          Initial Setup
        </CardTitle>
        <CardDescription>
          Click the button below to create sample travel packages in the database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSetupPackages} className="bg-emerald-600 hover:bg-emerald-700">
          Create Sample Packages
        </Button>
      </CardContent>
    </Card>
  );
}
