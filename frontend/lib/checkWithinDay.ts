export const checkWithinDay = (date: string, day: number) => {
  const today = new Date()
  const createdDate = new Date(date)

  return today.getTime() - createdDate.getTime() < day * 24 * 60 * 60 * 1000
}