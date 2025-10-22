import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "Hajj 2024 Pilgrim",
      content: "Surosh Travels made my Hajj experience absolutely seamless. From visa processing to hotel arrangements, everything was handled professionally. The guides were knowledgeable and caring.",
      rating: 5,
      initials: "AH"
    },
    {
      name: "Fatima Khan",
      role: "Umrah Traveler",
      content: "I've traveled for Umrah three times with this agency, and each time has been better than the last. Their attention to detail and customer service is unmatched. Highly recommended!",
      rating: 5,
      initials: "FK"
    },
    {
      name: "Omar Ali",
      role: "Study Abroad Student",
      content: "They helped me secure admission to my dream university and handled all the visa paperwork. The team was supportive throughout the entire process. Thank you for making my dream come true!",
      rating: 5,
      initials: "OA"
    },
    {
      name: "Aisha Rahman",
      role: "Hajj 2023 Pilgrim",
      content: "The entire journey was well-organized and stress-free. The accommodations were excellent, and the group leaders were very supportive. Will definitely use their services again.",
      rating: 5,
      initials: "AR"
    },
    {
      name: "Yusuf Ibrahim",
      role: "Study Abroad Consultant",
      content: "As someone who has used multiple travel services, I can confidently say this is the best. Their expertise in student visas and university applications is exceptional.",
      rating: 5,
      initials: "YI"
    },
    {
      name: "Mariam Siddiqui",
      role: "Umrah Traveler",
      content: "Professional, caring, and extremely organized. They took care of everything - flights, hotels, transportation. I could focus entirely on my spiritual journey. Amazing service!",
      rating: 5,
      initials: "MS"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl mb-4">
            Trusted by Thousands of Travelers
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say about their experiences with us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                <p className="text-sm mb-6 text-muted-foreground">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
