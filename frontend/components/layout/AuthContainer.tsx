interface ContainerProps {
  children: React.ReactNode
}

const AuthContainer = ({children}: ContainerProps) => {
  return (
    <div className="max-w-[375px] w-full mx-auto min-h-screen bg-white px-4">
      { children }
    </div>
  )
}

export default AuthContainer