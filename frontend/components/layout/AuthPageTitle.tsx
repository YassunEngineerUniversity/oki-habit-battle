interface AuthPageTitleProps {
  title: string
}

const AuthPageTitle = ({title}:AuthPageTitleProps) => {
  return (
    <h1 className="text-center text-2xl font-bold">{ title }</h1>
  )
}

export default AuthPageTitle