"use client";

import { Button } from "./ui/button";
import { Menu, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll for in-page anchors
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.hash.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(target.hash);
        if (el) {
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "smooth",
          });
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white text-[13px]">🕋</span>
            </div>
            <span className="text-[15px] text-gray-800 tracking-tight">
              Surosh Travels
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] text-gray-600 font-normal">
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

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+234 812 542 4121</span>
            </div>
            <Button
              asChild
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-[13px] font-normal rounded-full shadow-sm transition-all"
            >
              <a href="#services">Book Now</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-100 bg-white">
            <nav className="flex flex-col gap-3 text-[14px] text-gray-700 font-normal">
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
              <Button
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 w-full mt-3 py-2 text-[13px] font-normal rounded-full shadow-sm"
              >
                <a href="#services">Book Now</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
