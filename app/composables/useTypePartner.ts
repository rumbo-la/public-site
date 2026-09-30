import { useI18n } from 'vue-i18n';
import { IconFullTime, IconFractional } from '~/components/icon'

export const useTypePartner =  () => {
  const { t } = useI18n();
  const typePartner = [
    {
      key: 'full_time',
      icon: IconFullTime,
      title: t('full_time.title'),
      features: [
        t('full_time.feature1'),
        t('full_time.feature2'),
        t('full_time.feature3'),
        t('full_time.feature4'),
      ],
      to: 'https://form.feathery.io/to/xbitoY',
      textLink: t('button.join_us'),
    },
    {
      key: 'hourly',
      icon: IconFractional,
      title: t('hourly.title'),
      features: [
        t('hourly.feature1'),
        t('hourly.feature2'),
        t('hourly.feature3'),
      ],
      to: 'https://form.feathery.io/to/MxyZEv',
      textLink: t('button.join_us'),
    }
  ]
  return {
    typePartner
  }
}