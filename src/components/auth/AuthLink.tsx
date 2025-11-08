import { FC } from 'react'
import { Link } from 'react-router-dom'

interface AuthLinkProps {
  text: string
  linkText: string
  linkTo: '/login' | '/register'
}

const AuthLink: FC<AuthLinkProps> = ({ text, linkText, linkTo }) => {
  return (
    <p className="text-center text-sm text-gray-600 mt-6">
      {text}{' '}
      <Link to={linkTo} className="text-blue-600 hover:text-blue-800 font-medium">
        {linkText}
      </Link>
    </p>
  )
}

export default AuthLink
