import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarTimes } from '@fortawesome/free-solid-svg-icons'

import Heading from 'components/Heading'

const Empty = () => (
  <div className="w-full flex align-center justify-center text-4xl">
    <FontAwesomeIcon
      className="mr-4 text-red-500"
      icon={faCalendarTimes}
      aria-hidden="false"
    />

    <Heading as="h4">No exercises yet!</Heading>
  </div>
)

export default Empty
