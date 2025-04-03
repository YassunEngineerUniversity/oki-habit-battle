interface ContainerProps {
  children: React.ReactNode
  top?: string
  bottom?: string
}

const ContentContainer = ({children, top = "pt-[60px]", bottom = "pb-[90px]"}: ContainerProps) => {
  return (
    <div className={`${top} ${bottom}`}>
      { children }
    </div>
  )
}

export default ContentContainer