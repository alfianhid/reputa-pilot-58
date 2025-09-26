import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/logo-reputa-ai.png" 
              alt="Reputa AI Logo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {t('nav.features')}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {t('nav.faq')}
            </button>
            <LanguageSwitcher />
            <Button asChild className="btn-primary">
              <a href="https://reputa-pilot-58.lovable.app/" target="_blank" rel="noopener noreferrer">
                {t('nav.startTrial')}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-secondary hover:text-text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("features")}
                className="block px-3 py-2 text-text-secondary hover:text-text-primary w-full text-left"
              >
                {t('nav.features')}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="block px-3 py-2 text-text-secondary hover:text-text-primary w-full text-left"
              >
                {t('nav.pricing')}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="block px-3 py-2 text-text-secondary hover:text-text-primary w-full text-left"
              >
                {t('nav.faq')}
              </button>
              <div className="px-3 py-2 border-t border-border">
                <LanguageSwitcher />
              </div>
              <div className="px-3 py-2">
                <Button asChild className="btn-primary w-full">
                  <a href="https://reputa-pilot-58.lovable.app/" target="_blank" rel="noopener noreferrer">
                    {t('nav.startTrial')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;