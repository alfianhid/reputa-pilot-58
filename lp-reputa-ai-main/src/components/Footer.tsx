import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brand-gray-dark text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <img 
              src="/lovable-uploads/logo-reputa-ai.png" 
              alt="Reputa AI Logo" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-white/70 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('nav.features')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {t('nav.pricing')}
                </button>
              </li>
              <li>
                <a href="mailto:contact@reputa-ai.com" className="text-white/70 hover:text-white transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.connect')}</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@reputa-ai.com" className="text-white/70 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-3">
              <a href="#" className="block text-white/70 hover:text-white transition-colors text-sm">
                {t('footer.privacy')}
              </a>
              <a href="#" className="block text-white/70 hover:text-white transition-colors text-sm">
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/70 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;