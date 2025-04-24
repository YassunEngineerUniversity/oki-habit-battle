import ContentContainer from '@/components/layout/container/ContentContainer'
import PageHeader from '@/components/layout/header/PageHeader'
import Contact from '@/features/Contact'

const ContactPage = () => {
  return (
    <>
      <PageHeader backLink="/profile" title="お問い合わせ"/>
      <ContentContainer>
        <Contact/>
      </ContentContainer>
    </>
  )
}

export default ContactPage
