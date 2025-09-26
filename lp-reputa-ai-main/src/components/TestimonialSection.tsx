import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonialPhoto from "@/assets/testimonial-photo.jpg";

const TestimonialSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="card-elevated p-8 md:p-12 text-center">
            {/* Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            
            {/* Quote */}
            <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed mb-8 italic">
              "{t('testimonial.quote')}"
            </blockquote>
            
            {/* Author */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <img
                src={testimonialPhoto}
                alt={t('testimonial.author')}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div className="text-center md:text-left">
                <div className="font-semibold text-text-primary">{t('testimonial.author')}</div>
                <div className="text-text-secondary">{t('testimonial.title')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;