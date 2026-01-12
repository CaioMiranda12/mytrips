export function formatDate(date: Date | string) {
  const parsedDate = typeof date === 'string'
    ? new Date(date)
    : date

  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
