import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTASection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-gradient-hero">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-brand-gray hover:bg-white/90 text-lg px-8 py-4 shadow-lg">
              <a href="https://reputa-pilot-58.lovable.app/" target="_blank" rel="noopener noreferrer">
                {t('cta.button')}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;