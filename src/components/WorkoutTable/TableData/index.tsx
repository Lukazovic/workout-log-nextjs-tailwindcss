import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import DateTools from 'services/tools/date'

export type ExerciseProps = {
  id: string
  duration: number
  kind: string
  date: number
}

export type TableDataProps = {
  className?: string
  variant?: 'light' | 'dark'
  onRemove?: (id: string) => void
} & ExerciseProps

const BACKGROUND = {
  light: 'bg-white',
  dark: 'bg-gray-300'
}

const TableData = ({
  className,
  id,
  duration,
  kind,
  date,
  variant = 'light',
  onRemove
}: TableDataProps) => {
  const backgroundColor = BACKGROUND[variant]

  const formattedDate = DateTools.formatDateToPtBrDate(date)

  const handleRemove = () => {
    !!onRemove && onRemove(id)
  }

  return (
    <tr
      className={`w-full text-lg grid grid-cols-3 ${backgroundColor} ${className}`.trim()}
    >
      <td className="px-2">{duration}h</td>
      <td className="capitalize px-2">{kind}</td>
      <td className="px-2 flex justify-between">
        {formattedDate}

        <button
          className="px-2 text-red-600 hover:text-red-500 transition-colors duration-500"
          title="Delete Item"
          aria-label="Delete Item"
          onClick={handleRemove}
        >
          <FontAwesomeIcon className="w-4" icon={faTrash} />
        </button>
      </td>
    </tr>
  )
}

export default TableData
