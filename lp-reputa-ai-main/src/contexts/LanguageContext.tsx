import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.startTrial': 'Start Free Trial',
    
    // Hero Section
    'hero.title': 'Turn Your Google Reviews Into Your Best Marketing Engine',
    'hero.subtitle': 'Reputa AI is the intelligent virtual assistant that automates your online reputation. Save your valuable time, boost your rating, and attract more customers.',
    'hero.startTrial': 'Start Your 14-Day Free Trial',
    'hero.watchDemo': 'Watch Demo',
    'hero.noCredit': 'No credit card required. Cancel anytime.',
    
    // Problem Section
    'problem.title': 'Does This Feel Familiar?',
    'problem.stressed': 'Stressed by Negative Reviews?',
    'problem.time': 'Running Out of Time?',
    'problem.losing': 'Losing to Competitors?',
    
    // Features Section
    'features.title': 'Reputa AI: Your Automated Reputation Guardian',
    'features.dashboard.title': 'Centralized Dashboard',
    'features.dashboard.desc': 'Monitor all your reviews in one place with real-time notifications.',
    'features.ai.title': 'AI Smart Replies',
    'features.ai.desc': 'Intelligent responses that sound natural and maintain your brand voice.',
    'features.generator.title': 'Positive Review Generator',
    'features.generator.desc': 'Proactively encourage satisfied customers to leave positive reviews.',
    'features.shield.title': 'AI Anomaly Shield',
    'features.shield.desc': 'Detect and respond to fake or suspicious reviews automatically.',
    
    // How It Works
    'how.title': 'Get Started in 3 Easy Steps',
    'how.step1.title': 'Connect',
    'how.step1.desc': 'Securely connect your Google Business Profile.',
    'how.step2.title': 'Automate',
    'how.step2.desc': 'Let Reputa AI work for you in the background.',
    'how.step3.title': 'Grow',
    'how.step3.desc': 'Watch your rating improve and new customers walk in.',
    
    // Testimonial
    'testimonial.quote': 'Since using Reputa AI, I save 5 hours a month and no longer stress about reviews. My coffee shop\'s rating went from 4.3 to 4.8 in just 3 months! Highly recommended.',
    'testimonial.author': 'Budi Santoso',
    'testimonial.title': 'Owner, Kopi Senja Yogyakarta',
    
    // Pricing
    'pricing.title': 'Choose the Right Plan for You',
    'pricing.starter': 'Starter',
    'pricing.business': 'Business',
    'pricing.plus': 'Plus',
    'pricing.popular': 'Most Popular',
    'pricing.choosePlan': 'Choose Plan',
    'pricing.month': '/month',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.setup.q': 'Is it difficult to set up?',
    'faq.setup.a': 'Not at all! Our setup process takes less than 5 minutes. Simply connect your Google Business Profile and we\'ll handle the rest.',
    'faq.security.q': 'Is my data secure?',
    'faq.security.a': 'Absolutely. We use enterprise-grade encryption and comply with international data protection standards. Your data is never shared with third parties.',
    'faq.cancel.q': 'Can I cancel my subscription at any time?',
    'faq.cancel.a': 'Yes, you can cancel anytime from your dashboard. There are no cancellation fees or long-term commitments.',
    
    // Final CTA
    'cta.title': 'Ready to Turn Your Reviews Into Revenue?',
    'cta.button': 'Get Your 14-Day Free Trial',
    
    // Footer
    'footer.description': 'The intelligent virtual assistant that automates your online reputation management.',
    'footer.product': 'Product',
    'footer.contact': 'Contact',
    'footer.connect': 'Connect',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2025 Reputa AI. All rights reserved.',
  },
  id: {
    // Navigation
    'nav.features': 'Fitur',
    'nav.pricing': 'Harga',
    'nav.faq': 'FAQ',
    'nav.startTrial': 'Mulai Uji Coba Gratis',
    
    // Hero Section
    'hero.title': 'Ubah Ulasan Google Menjadi Mesin Pemasaran Terbaik Anda',
    'hero.subtitle': 'Reputa AI adalah asisten virtual cerdas yang mengelola reputasi online Anda secara otomatis. Hemat waktu berharga Anda, naikkan rating, dan datangkan lebih banyak pelanggan.',
    'hero.startTrial': 'Mulai Uji Coba Gratis 14 Hari',
    'hero.watchDemo': 'Lihat Demo',
    'hero.noCredit': 'Tidak perlu kartu kredit. Batal kapan saja.',
    
    // Problem Section
    'problem.title': 'Apakah Ini yang Anda Rasakan Setiap Hari?',
    'problem.stressed': 'Stres karena Ulasan Negatif?',
    'problem.time': 'Kehabisan Waktu?',
    'problem.losing': 'Kalah dari Kompetitor?',
    
    // Features Section
    'features.title': 'Reputa AI: Penjaga Reputasi Otomatis Anda',
    'features.dashboard.title': 'Dashboard Terpusat',
    'features.dashboard.desc': 'Pantau semua ulasan Anda di satu tempat dengan notifikasi real-time.',
    'features.ai.title': 'Balasan Cerdas AI',
    'features.ai.desc': 'Respons cerdas yang terdengar natural dan menjaga suara merek Anda.',
    'features.generator.title': 'Generator Ulasan Positif',
    'features.generator.desc': 'Proaktif mendorong pelanggan puas untuk meninggalkan ulasan positif.',
    'features.shield.title': 'Perisai Anomali AI',
    'features.shield.desc': 'Deteksi dan tanggapi ulasan palsu atau mencurigakan secara otomatis.',
    
    // How It Works
    'how.title': 'Mulai dalam 3 Langkah Mudah',
    'how.step1.title': 'Hubungkan',
    'how.step1.desc': 'Hubungkan Google Business Profile Anda dengan aman.',
    'how.step2.title': 'Otomatisasi',
    'how.step2.desc': 'Biarkan Reputa AI bekerja untuk Anda di latar belakang.',
    'how.step3.title': 'Berkembang',
    'how.step3.desc': 'Lihat rating Anda meningkat dan pelanggan baru berdatangan.',
    
    // Testimonial
    'testimonial.quote': 'Sejak menggunakan Reputa AI, saya menghemat 5 jam per bulan dan tidak lagi stres dengan ulasan. Rating kedai kopi saya naik dari 4.3 menjadi 4.8 hanya dalam 3 bulan! Sangat direkomendasikan.',
    'testimonial.author': 'Budi Santoso',
    'testimonial.title': 'Pemilik, Kopi Senja Yogyakarta',
    
    // Pricing
    'pricing.title': 'Pilih Paket yang Sesuai Untuk Anda',
    'pricing.starter': 'Pemula',
    'pricing.business': 'Bisnis',
    'pricing.plus': 'Plus',
    'pricing.popular': 'Paling Populer',
    'pricing.choosePlan': 'Pilih Paket',
    'pricing.month': '/bulan',
    
    // FAQ
    'faq.title': 'Pertanyaan yang Sering Diajukan',
    'faq.setup.q': 'Apakah sulit untuk mengatur?',
    'faq.setup.a': 'Sama sekali tidak! Proses pengaturan kami membutuhkan waktu kurang dari 5 menit. Cukup hubungkan Google Business Profile Anda dan kami akan mengurus sisanya.',
    'faq.security.q': 'Apakah data saya aman?',
    'faq.security.a': 'Tentu saja. Kami menggunakan enkripsi tingkat enterprise dan mematuhi standar perlindungan data internasional. Data Anda tidak pernah dibagikan kepada pihak ketiga.',
    'faq.cancel.q': 'Bisakah saya membatalkan langganan kapan saja?',
    'faq.cancel.a': 'Ya, Anda dapat membatalkan kapan saja dari dashboard Anda. Tidak ada biaya pembatalan atau komitmen jangka panjang.',
    
    // Final CTA
    'cta.title': 'Siap Mengubah Ulasan Menjadi Pendapatan?',
    'cta.button': 'Dapatkan Uji Coba Gratis 14 Hari',
    
    // Footer
    'footer.description': 'Asisten virtual cerdas yang mengotomatisasi manajemen reputasi online Anda.',
    'footer.product': 'Produk',
    'footer.contact': 'Kontak',
    'footer.connect': 'Terhubung',
    'footer.privacy': 'Kebijakan Privasi',
    'footer.terms': 'Syarat Layanan',
    'footer.copyright': '© 2025 Reputa AI. Hak cipta dilindungi.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('reputa-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('reputa-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};