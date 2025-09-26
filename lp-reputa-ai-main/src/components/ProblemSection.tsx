import { Frown, Clock, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemSection = () => {
  const { t } = useLanguage();
  
  const problems = [
    {
      icon: Frown,
      title: t('problem.stressed'),
    },
    {
      icon: Clock,
      title: t('problem.time'),
    },
    {
      icon: TrendingDown,
      title: t('problem.losing'),
    }
  ];

  return (
    <section className="section-padding bg-background-secondary">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {t('problem.title')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6 shadow-brand">
                <problem.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                {problem.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;