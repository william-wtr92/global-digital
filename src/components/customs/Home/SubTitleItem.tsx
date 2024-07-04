"use client"

type SubTitleItemProps = {
  number: number
  title: string
}

const SubTitleItem = ({ number, title }: SubTitleItemProps) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center md:w-24">
      <span className="font-semibold md:text-xl">{number}</span>
      <span className="font-semibold md:text-xl">{title}</span>
    </div>
  )
}

export default SubTitleItem
