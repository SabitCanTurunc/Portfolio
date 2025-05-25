'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'home',
        expertise: 'expertise',
        work: 'work',
        experience: 'experience',
        contact: 'contact'
      },
      hero: {
        coder: {
          title: '<coder/>',
          description: 'Full-stack developer, experienced in writing clean and effective code.'
        },
        problemSolver: {
          title: 'trouble chief',
          description: 'I carefully analyze complex problems and produce practical and lasting software solutions.'
        }
      },
      expertise: {
        title: 'My Expertise',
        backend: {
          title: 'Backend Dev',
          subtitle: 'Python, Java',
          description: 'Experienced in Python, Java, JavaScript, TypeScript.'
        },
        frontend: {
          title: 'Frontend Dev',
          subtitle: 'Angular, Nextjs',
          description: 'Experience in developing at least 2 projects with HTML, CSS, JS, Angular, React and NextJS frameworks.'
        }
      },
      experience: {
        title: 'Professional Experience',
        items: {
          mantis: {
            title: 'Intern Software Developer',
            company: 'Mantis Software',
            period: '02-2025 - Present',
            location: 'Ankara, Turkey',
            description: 'Long term intern Full-Stack developer.'
          },
          smartpulse: {
            title: 'Intern Software Developer',
            company: 'SmartPusle Tech.',
            period: '06-09.2024',
            location: 'Istanbul, Turkey',
            description: 'Short term intern Full-Stack developer.'
          },
          blockchain: {
            title: 'Co-Founder',
            company: 'CBU BLOCKCHAIN',
            period: '2022-2025',
            location: 'Remote (Manisa, Turkey)',
            description: 'A community that organizes events, develops projects in hackathons, and aims to develop the team and contribute to society.'
          }
        }
      },
      work: {
        title: 'My Work',
        projects: {
          convexus: {
            title: 'Convexus',
            subtitle: 'AI powered sales assistant',
            category: 'Web Development'
          },
          neowrite: {
            title: 'NeoWrite',
            subtitle: 'AI powered blog platform',
            category: 'Web Development'
          },
          stepofhope: {
            title: 'Step Of Hope',
            subtitle: 'Blockchain based crowdfunding platform',
            category: 'Web Development'
          }
        }
      },
      contact: {
        title: 'Available for select freelance opportunities',
        description: 'Have an exciting project you need help with?',
        cta: 'Send me an email or contact me via instant message!',
        social: {
          linkedin: 'LinkedIn',
          instagram: 'Instagram',
          github: 'Github'
        }
      },
      footer: {
        copyright: '© 2025. Made with passion by Sabit Can Turunç.',
        rights: 'All rights reserved.'
      },
      scrollToTop: {
        ariaLabel: 'Scroll to top'
      }
    }
  },
  tr: {
    translation: {
      nav: {
        home: 'ana sayfa',
        expertise: 'uzmanlık',
        work: 'projeler',
        experience: 'deneyim',
        contact: 'iletişim'
      },
      hero: {
        coder: {
          title: '<coder/>',
          description: 'Full-stack geliştirici, temiz ve etkili kod yazma konusunda deneyimli.'
        },
        problemSolver: {
          title: 'dert babası',
          description: 'Karmaşık problemleri dikkatle inceler, pratik ve kalıcı yazılım çözümleri üretirim.'
        }
      },
      expertise: {
        title: 'Uzmanlık Alanlarım',
        backend: {
          title: 'Backend Dev',
          subtitle: 'Python, Java',
          description: 'Python, Java, JavaScript, TypeScript konularında deneyimli.'
        },
        frontend: {
          title: 'Frontend Dev',
          subtitle: 'Angular, Nextjs',
          description: 'HTML, CSS, JS, Angular, React ve NextJS framework\'leri ile en az 2 proje geliştirme deneyimi.'
        }
      },
      experience: {
        title: 'Profesyonel Deneyim',
        items: {
          mantis: {
            title: 'Stajyer Yazılım Geliştirici',
            company: 'Mantis Software',
            period: '02-2025 - Günümüz',
            location: 'Ankara, Türkiye',
            description: 'Uzun dönem Full-Stack stajyer geliştirici.'
          },
          smartpulse: {
            title: 'Stajyer Yazılım Geliştirici',
            company: 'SmartPusle Tech.',
            period: '06-09.2024',
            location: 'İstanbul, Türkiye',
            description: 'Kısa dönem Full-Stack stajyer geliştirici.'
          },
          blockchain: {
            title: 'Kurucu Ortak',
            company: 'CBU BLOCKCHAIN',
            period: '2022-2025',
            location: 'Uzaktan (Manisa, Türkiye)',
            description: 'Etkinlikler düzenleyen, hackathonlarda projeler geliştiren, ekibi geliştirmeyi ve topluma katkı sağlamayı amaçlayan bir topluluk.'
          }
        }
      },
      work: {
        title: 'Çalışmalarım',
        projects: {
          convexus: {
            title: 'Convexus',
            subtitle: 'Yapay zeka destekli satış asistanı',
            category: 'Web Geliştirme'
          },
          neowrite: {
            title: 'NeoWrite',
            subtitle: 'Yapay zeka destekli blog platformu',
            category: 'Web Geliştirme'
          },
          stepofhope: {
            title: 'Step Of Hope',
            subtitle: 'Blockchain tabanlı bağış platformu',
            category: 'Web Geliştirme'
          }
        }
      },
      contact: {
        title: 'Seçkin freelance fırsatları için müsaitim',
        description: 'Yardıma ihtiyacınız olan heyecan verici bir projeniz mi var?',
        cta: 'Bana e-posta gönderin veya anlık mesaj yoluyla iletişime geçin!',
        social: {
          linkedin: 'LinkedIn',
          instagram: 'Instagram',
          github: 'Github'
        }
      },
      footer: {
        copyright: '© 2025. Sabit Can Turunç tarafından tutku ile yapıldı.',
        rights: 'Tüm hakları saklıdır.'
      },
      scrollToTop: {
        ariaLabel: 'Yukarı dön'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    lng: typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') || 'tr' : 'tr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 