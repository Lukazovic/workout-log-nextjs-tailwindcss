export type TableHeaderProps = {
  className?: string
}

const TableHeader = ({ className = '' }: TableHeaderProps) => (
  <tr
    className={`w-full text-lg grid grid-cols-3 bg-gray-800 text-white text-left ${className}`.trim()}
  >
    <th className="px-2">Time</th>
    <th className="px-2">Type</th>
    <th className="px-2">Date</th>
  </tr>
)

export default TableHeader
