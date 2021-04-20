const formatDateToPtBrDate = (timestamp: number) =>
  new Intl.DateTimeFormat('pt-BR').format(timestamp)

export default {
  formatDateToPtBrDate
}
