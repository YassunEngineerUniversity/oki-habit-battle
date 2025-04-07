import ContentContainer from '@/components/layout/container/ContentContainer'
import PageHeader from '@/components/layout/header/PageHeader'
import BattleCreate from '@/features/BattleCreate'

const BattleCreatePage = () => {
  return (
    <>
      <PageHeader backLink="/" title="対戦の作成"/>
      <ContentContainer>
        <BattleCreate/>
      </ContentContainer>
    </>
  )
}

export default BattleCreatePage
