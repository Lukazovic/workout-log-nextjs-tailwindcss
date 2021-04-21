export type DividerProps = {
  className?: string
}

const Divider = ({ className = '' }: DividerProps) => (
  <hr
    role="divider"
    className={`border-t-2 border-black ${className}`.trim()}
  />
)

export default Divider
