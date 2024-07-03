export const firstLetterUppercase = (str: string | undefined) => {
  return str?.replace(/^\w/, (c) => c.toUpperCase())
}
