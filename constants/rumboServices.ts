import { IconGroupPersonsPlus, IconTalentSearch } from '~/components/icon'

export const rumboServices = [
  {
    key: 'staffing',
    icon: '/images/staffing/icon-staff-augmentation.png',
    title: 'Staffing',
    description: 'Embed our digital talent into your projects or build tailor-made teams with total flexibility.',
    features: [
      'Talent on a full-time or part-time basis',
      'Vetted candidates delivered within 72 hours',
      'Scale your teams up or down anytime',
      // '15+ areas of digital expertise'
    ],
    img: 'src',
    to: '/staffing',
    textLink: 'Discover Staffing models'
  },
  {
    key: 'recruting',
    // icon: IconTalentSearch,
    icon: '/images/recruiting/icon-talent-search.png',
    title: 'Recruting',
    description: 'We source and vet top-tier digital talent to fill your openings.',
    features: [
      'From individual contributors to digital leaders',
      'Access the top 5% with our unique vetting process',
      '15+ areas of digital expertise'
    ],
    img: 'src',
    to: '/recruiting',
    textLink: 'Discover Recruiting models'
  }
]