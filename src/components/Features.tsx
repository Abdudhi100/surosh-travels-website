import { Hotel, FileText, Plane, HeadphonesIcon, Shield, Clock } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Hotel,
      title: "Hotel Booking",
      description: "Premium accommodations near sacred sites with competitive rates and verified quality."
    },
    {
      icon: FileText,
      title: "Visa Application",
      description: "Complete visa processing support with documentation assistance and application tracking."
    },
    {
      icon: Plane,
      title: "Flight Arrangements",
      description: "Best flight deals with flexible schedules and preferred seating options."
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer service to assist you throughout your journey."
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive travel insurance coverage for peace of mind during your trip."
    },
    {
      icon: Clock,
      title: "Time Flexibility",
      description: "Flexible departure dates and customizable itineraries to suit your schedule."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            End-to-End Travel Logistics
          </h2>
          <p className="text-muted-foreground">
            We handle every aspect of your journey so you can focus on what matters most. 
            Our comprehensive services ensure a hassle-free experience from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="mb-6 text-emerald-50 max-w-2xl mx-auto">
            Let our experienced team guide you through every step. Get a personalized quote 
            and discover how we can make your travel dreams a reality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
              Get Free Consultation
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              View All Packages
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
