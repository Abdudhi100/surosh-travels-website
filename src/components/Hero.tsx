"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative bg-white py-20 lg:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full shadow-sm">
              <Star className="w-4 h-4 fill-emerald-700" />
              <span className="text-sm font-medium">
                Trusted by 10,000+ Pilgrims
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-gray-900">
              Your Journey to Sacred Destinations Begins Here
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-xl">
              We provide comprehensive travel services for Hajj, Umrah, and study abroad programs.
              From visa applications to hotel bookings — we handle every detail of your journey with care.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 transition-all"
                onClick={() => scrollToSection("services")}
              >
                Explore Packages
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50"
                onClick={() => scrollToSection("contact")}
              >
                Contact Us
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-gray-200">
              {[
                { label: "Happy Travelers", value: "10K+" },
                { label: "Years Experience", value: "15+" },
                { label: "Satisfaction Rate", value: "98%" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-3xl font-semibold text-emerald-600">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1736240624842-c13db7ba4275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Kaaba in Mecca"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-emerald-700">✓</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Complete Package</div>
                  <div className="font-medium text-gray-900">All-Inclusive Services</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
