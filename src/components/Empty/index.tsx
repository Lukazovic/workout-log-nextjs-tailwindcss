import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons'

import Heading from 'components/Heading'

export type EmptyProps = {
  className?: string
}

const Empty = ({ className = '' }: EmptyProps) => (
  <div
    className={`w-full flex flex-col md:flex-row text-center align-center justify-center text-4xl ${className}`.trim()}
  >
    <FontAwesomeIcon
      className="mr-4 w-9 text-red-500 self-center"
      icon={faCalendarTimes}
    />

    <Heading level="h4">No exercises yet!</Heading>
  </div>
)

export default Empty
