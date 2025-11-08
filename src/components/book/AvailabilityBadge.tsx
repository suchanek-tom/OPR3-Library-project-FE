import { FC } from 'react'

interface AvailabilityBadgeProps {
  available: boolean
}

const AvailabilityBadge: FC<AvailabilityBadgeProps> = ({ available }) => {
  return (
    <span
      className={`w-fit px-2 py-1 rounded-full text-xs font-semibold block ${
        available
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {available ? 'Available' : 'Unavailable'}
    </span>
  )
}

export default AvailabilityBadge
