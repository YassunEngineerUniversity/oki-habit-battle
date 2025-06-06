interface ContainerProps {
  children: React.ReactNode
}

const PageContainer = ({children}: ContainerProps) => {
  return (
    <div className="max-w-[375px] w-full mx-auto min-h-screen bg-white px-3">
      { children }
    </div>
  )
}

export default PageContainer