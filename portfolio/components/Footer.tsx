import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations()

  return (
    <footer className="py-5 text-center">
      <p className="text-sm mt-2 opacity-50">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </p>
      <p className="text-sm mt-2 opacity-50">
        {t('footer.rights')}
      </p>
    </footer>
  )
}

export default Footer 