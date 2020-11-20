export default date => {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const currentDate = new Date().getDate()

  // enable date for scheduling if matches one of following condition
  const enable =
    date.getFullYear() > currentYear ||
    (date.getFullYear() === currentYear && date.getMonth() > currentMonth) ||
    (date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth &&
      date.getDate() > currentDate) ||
    (date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth &&
      date.getDate() === currentDate)

  // disable date for scheduling if matches one of following condition
  const disable =
    date.getFullYear() < currentYear ||
    (date.getFullYear() === currentYear && date.getMonth() < currentMonth) ||
    (date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth &&
      date.getDate() < currentDate)

  if (enable) return true
  if (disable) return false
}
