/**
 * Portfolyoda once statik olarak kullanilan deneyim satirlari (TR metin).
 * Seed ve admin "varsayilan yukle" ile veritabanina yazilir.
 */
export const defaultExperiencesSeed = [
  {
    title: 'Stajyer Yazılım Geliştirici',
    company: 'Mantis Software',
    period: '02-2025 - Günümüz',
    location: 'Ankara, Türkiye',
    website: 'mantis.com.tr',
    description: 'Uzun dönem Full-Stack stajyer geliştirici.',
    skills: ['Java', 'Angular', 'Python', 'Spring Boot', 'FastAPI'],
    order: 0
  },
  {
    title: 'Stajyer Yazılım Geliştirici',
    company: 'SmartPusle Tech.',
    period: '06-09.2024',
    location: 'İstanbul, Türkiye',
    website: 'www.smartpulse.io',
    description: 'Kısa dönem Full-Stack stajyer geliştirici.',
    skills: ['C#', '.Net', 'Angular'],
    order: 1
  },
  {
    title: 'Kurucu Ortak',
    company: 'CBU BLOCKCHAIN',
    period: '2022-2025',
    location: 'Uzaktan (Manisa, Türkiye)',
    website: '',
    description:
      'Etkinlikler düzenleyen, hackathonlarda projeler geliştiren, ekibi geliştirmeyi ve topluma katkı sağlamayı amaçlayan bir topluluk.',
    skills: ['JavaScript', 'Smart Contracts', 'Solidity', 'CSS', 'Node.js'],
    order: 2
  }
] as const
