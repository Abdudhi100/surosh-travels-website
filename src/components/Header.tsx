import { Button } from "./ui/button";
import { Menu, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative top-0 z-50 bg-white border-b header-negative ">
      <div className="container mx-auto px-8 lg:px-16 header-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-none items-center lg:justify-center justify-start w-full lg:w-auto ">
            <img
              src="/surosh-logo.jpg"   // <-- replace with your logo path
              alt="Surosh Travels ltd Logo"
              className="logo-size object-contain"
              draggable={false}
            />
          </div>

          {/* Desktop Navigation - Only 3 links on the right */}
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#services" className="text-foreground hover:text-emerald-600 transition-colors">
              Services
            </a>
            <a href="#testimonials" className="text-foreground hover:text-emerald-600 transition-colors">
              Testimonials
            </a>
            <a href="#contact" className="text-foreground hover:text-emerald-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              <a href="#services" className="text-foreground hover:text-emerald-600 transition-colors">
                Services
              </a>
              <a href="#testimonials" className="text-foreground hover:text-emerald-600 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-foreground hover:text-emerald-600 transition-colors">
                Contact
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
