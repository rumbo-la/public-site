import { useI18n } from 'vue-i18n';

export const useRumboService =  () => {
  const { t } = useI18n();
  const rumboServices = [
    {
      key: 'staffing',
      icon: '/images/staffing/icon-staff-augmentation.png',
      title: 'Staffing',
      description: t('rumbo_service_staffing.description'),
      features: [
        t('rumbo_service_staffing.feature1'),
        t('rumbo_service_staffing.feature2'),
        t('rumbo_service_staffing.feature3'),
      ],
      img: 'src',
      to: '/staffing',
      textLink: t('rumbo_service_staffing.link'),
    },
    {
      key: 'recruting',
      icon: '/images/recruiting/icon-talent-search.png',
      title: 'Recruting',
      description: t('rumbo_service_recruiting.description'),
      features: [
        t('rumbo_service_recruiting.feature1'),
        t('rumbo_service_recruiting.feature2'),
        t('rumbo_service_recruiting.feature3'),
      ],
      img: 'src',
      to: '/recruiting',
      textLink: t('rumbo_service_recruiting.link'),
    }
  ]
  return {
    rumboServices
  }
}