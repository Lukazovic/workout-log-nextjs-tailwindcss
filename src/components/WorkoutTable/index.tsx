import TableHeader from 'components/WorkoutTable/TableHeader'
import TableData, { ExerciseProps } from 'components/WorkoutTable/TableData'
import Empty from 'components/Empty'

import GeneralTools from 'services/tools/general'

export type WorkoutTableProps = {
  className?: string
  items?: ExerciseProps[]
  onRemoveItem?: (id: string) => void
}

const WorkoutTable = ({
  className = '',
  items,
  onRemoveItem
}: WorkoutTableProps) => (
  <table className={`w-full ${className}`.trim()} aria-label="workout-list">
    <thead>
      <TableHeader />
    </thead>
    <tbody>
      {items && items.length ? (
        items.map((item, index) => (
          <TableData
            key={item.id}
            id={item.id}
            duration={item.duration}
            kind={item.kind}
            date={item.date}
            variant={GeneralTools.isOdd(index) ? 'light' : 'dark'}
            onRemove={onRemoveItem}
          />
        ))
      ) : (
        <tr>
          <td className="py-6">
            <Empty />
          </td>
        </tr>
      )}
    </tbody>
  </table>
)

export default WorkoutTable
