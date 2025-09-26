import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-dashboard.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding pt-24 bg-gradient-subtle">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h1 className="text-hero text-text-primary mb-6">
              {t('hero.title').includes('Best Marketing Engine') ? (
                <>
                  Turn Your Google Reviews Into Your{" "}
                  <span className="text-gradient">Best Marketing Engine</span>
                </>
              ) : (
                <>
                  Ubah Ulasan Google Menjadi{" "}
                  <span className="text-gradient">Mesin Pemasaran Terbaik Anda</span>
                </>
              )}
            </h1>
            <p className="text-large text-text-secondary mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <a href="https://reputa-pilot-58.lovable.app/" target="_blank" rel="noopener noreferrer">
                  {t('hero.startTrial')}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="https://s.id/demo-reputa-ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  {t('hero.watchDemo')}
                </a>
              </Button>
            </div>
            <p className="text-text-muted text-sm">
              {t('hero.noCredit')}
            </p>
          </div>

          {/* Hero Image */}
          <div className="animate-slide-up">
            <div className="relative">
              <img
                src={heroImage}
                alt="Reputa AI Dashboard on laptop in coffee shop"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-brand opacity-10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;