import TableHeader from 'components/WorkoutTable/TableHeader'
import TableData, { ExerciseProps } from 'components/WorkoutTable/TableData'

import GeneralTools from 'services/tools/general'

export type WorkoutTableProps = {
  items?: ExerciseProps[]
}

const WorkoutTable = ({ items }: WorkoutTableProps) => (
  <table className="w-full border-2 border-black">
    <thead>
      <TableHeader />
    </thead>
    <tbody>
      {items &&
        items.length &&
        items.map((item, index) => (
          <TableData
            key={item.id}
            id={item.id}
            duration={item.duration}
            kind={item.kind}
            date={item.date}
            variant={GeneralTools.isOdd(index) ? 'light' : 'dark'}
          />
        ))}
    </tbody>
  </table>
)

export default WorkoutTable
