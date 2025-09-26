import { Link, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      icon: Link,
      number: "01",
      title: t('how.step1.title'),
      description: t('how.step1.desc')
    },
    {
      icon: Zap,
      number: "02",
      title: t('how.step2.title'),
      description: t('how.step2.desc')
    },
    {
      icon: TrendingUp,
      number: "03",
      title: t('how.step3.title'),
      description: t('how.step3.desc')
    }
  ];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('how.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-brand opacity-30 z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-brand">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-sm font-medium text-brand-blue tracking-wider">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;