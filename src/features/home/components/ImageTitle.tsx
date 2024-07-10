"use client"
import Image from "next/image"

import { cn } from "@/utils/style"

type ImageTitleProps = {
  img: string
  title: string
  className?: string
  titleClassName?: string
  divTitleClassName?: string
}

const ImageTitle = ({
  img,
  title,
  className,
  titleClassName,
  divTitleClassName,
}: ImageTitleProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center gap-4 text-center md:flex-row",
        className,
      )}
    >
      <Image
        src={`/${img}`}
        width={180}
        height={180}
        alt={img}
        className="max-h-60 w-96 md:h-60 md:w-96"
      />

      <div
        className={cn(
          "flex justify-center md:w-96 md:justify-start",
          divTitleClassName,
        )}
      >
        <p
          className={cn(
            "w-72 text-xl font-semibold md:text-left",
            titleClassName,
          )}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

export default ImageTitle
