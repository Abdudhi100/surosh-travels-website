"use client";

import { Button } from "./ui/button";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-5">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-md flex items-center justify-center">
              <span className="text-white text-[11px]">🕋</span>
            </div>
            <span className="text-[13px] font-medium text-gray-800 tracking-tight">
              Surosh Travels
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 text-[12.5px] font-light text-gray-600">
            {[
              ["Home", "#home"],
              ["Services", "#services"],
              ["About", "#about"],
              ["Testimonials", "#testimonials"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="hover:text-emerald-600 transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Contact & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-1 text-[11.5px] text-gray-500">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+234 812 542 4121</span>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 px-3.5 py-1 text-[11.5px] font-medium rounded-full shadow-sm">
              Book
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1 text-gray-700 hover:bg-gray-100 rounded-md transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t">
            <nav className="flex flex-col gap-3 text-sm text-gray-700 font-light">
              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["About", "#about"],
                ["Testimonials", "#testimonials"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-emerald-600 transition-colors"
                >
                  {label}
                </a>
              ))}
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full mt-3 py-1.5 text-[12px] font-medium rounded-full">
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
