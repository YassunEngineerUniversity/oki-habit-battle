import ContentContainer from '@/components/layout/container/ContentContainer'
import PageHeader from '@/components/layout/header/PageHeader'
import WithDrawal from '@/features/WithDrawal'

const WithDrawalPage = () => {
  return (
    <>
      <PageHeader backLink="/profile" title="退会"/>
      <ContentContainer>
        <WithDrawal/>
      </ContentContainer>
    </>
  )
}

export default WithDrawalPage