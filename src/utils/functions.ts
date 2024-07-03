export const getFullName = (firstName: string, lastName: string) =>
  `${firstName}${lastName}`
    .toLocaleLowerCase()
    .split(" ")
    .join("")
    .split(".")
    .join("")
