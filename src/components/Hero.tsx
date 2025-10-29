// Hero.tsx
import { Button } from "./ui/button";
import { ArrowRight, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section id="home" className="relative header-hero-unified hero-padding-uniform bg-gradient-to-br from-emerald-50 to-teal-50 hero-padding overflow-visible lg:-mt-32">
      <div className="container mx-auto px-4 hero-overlap">
        {/* Mobile: Image on top, Desktop: Side by side with text overlapping image */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-0 relative lg:z-50">
          
          {/* Image Container - Shows first on mobile and desktop */}
          <div className="order-2 hero-image-fade lg:order-2 lg:w-[60%] lg:-mt-20 relative lg:z-[70]">
            <div className="hero-card-blend relative rounded-2xl overflow-hidden lg:h-[700px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYWFiYSUyMG1lY2NhJTIwcGlsZ3JpbWFnZXxlbnwxfHx8fDE3NjA5NDcxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Kaaba in Mecca"
                className="w-full h-[400px] lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          </div>

          {/* Text Content Container with white background - Overlaps image on desktop */}
          <div className="order-1 lg:order-1 lg:w-[55%] lg:-mr-32 lg:-mt-16 relative lg:z-[60]">
            <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-2xl space-y-4 lg:max-h-[500px]">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 fill-emerald-700" />
                <span className="text-sm">Trusted by 10,000+ Pilgrims</span>
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl">
                Your Journey to Sacred Destinations Begins Here
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground">
                We provide comprehensive travel services for Hajj, Umrah, and study abroad programs. 
                From visa applications to hotel bookings, we handle every detail of your journey.
              </p>

              <div className="flex flex-wrap gap-3">
              {/* Explore Packages → Services section */}
                <a href="#services">
                  <Button size="default" className="bg-emerald-600 hover:bg-emerald-700">
                    Explore Packages
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>

              {/* Contact Us → Contact section */}
                <a href="#contact">
                <Button size="default" variant="outline">
                  Contact Us
                </Button>
                </a>
              </div>


              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div>
                  <div className="text-2xl lg:text-3xl text-emerald-600">10K+</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl text-emerald-600">15+</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-2xl lg:text-3xl text-emerald-600">98%</div>
                  <div className="text-xs lg:text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
