import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t('pricing.starter'),
      price: "$10",
      features: [
        "Up to 100 reviews/month",
        "Basic AI responses",
        "Email support",
        "Monthly reports"
      ],
      popular: false
    },
    {
      name: t('pricing.business'),
      price: "$30",
      features: [
        "Up to 500 reviews/month",
        "Advanced AI responses",
        "Priority support",
        "Weekly reports",
        "Custom response templates",
        "Review analytics"
      ],
      popular: true
    },
    {
      name: t('pricing.plus'),
      price: "$60",
      features: [
        "Unlimited reviews",
        "Premium AI responses",
        "24/7 phone support",
        "Daily reports",
        "Multi-location management",
        "API access",
        "Dedicated account manager"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('pricing.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`card-pricing ${plan.popular ? 'featured' : ''} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-brand text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 shadow-brand">
                    <Star className="w-4 h-4" />
                    {t('pricing.popular')}
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                  <span className="text-text-secondary ml-1">{t('pricing.month')}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-brand-blue mr-3 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                asChild 
                className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
              >
                <a href="https://reputa-pilot-58.lovable.app/" target="_blank" rel="noopener noreferrer">
                  {t('pricing.choosePlan')}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;