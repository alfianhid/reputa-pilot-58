import { LayoutDashboard, Sparkles, Star, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: LayoutDashboard,
      title: t('features.dashboard.title'),
      description: t('features.dashboard.desc')
    },
    {
      icon: Sparkles,
      title: t('features.ai.title'),
      description: t('features.ai.desc')
    },
    {
      icon: Star,
      title: t('features.generator.title'),
      description: t('features.generator.desc')
    },
    {
      icon: Shield,
      title: t('features.shield.title'),
      description: t('features.shield.desc')
    }
  ];

  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('features.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card-elevated p-6 text-center hover:shadow-brand animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mx-auto mb-4 shadow-md">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;