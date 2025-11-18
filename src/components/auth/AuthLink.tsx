import { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthLinkProps } from '../../types/Auth'

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
