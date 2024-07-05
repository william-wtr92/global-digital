import { cx } from "class-variance-authority"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open?: boolean
  close?: () => void
  variant?: "destructive" | "neutral" | "success"
  title: string
  content: string
  cancel: string
  confirm: string
  onSubmit: () => void
  withTrigger?: boolean
  trigger?: string
}

const CustomAlertDialog = (props: Props) => {
  const {
    open,
    close,
    variant = "neutral",
    title,
    content,
    cancel,
    confirm,
    onSubmit,
    withTrigger,
    trigger,
  } = props

  const buttonVariants = {
    destructive: "bg-destructive font-semibold hover:bg-red-600",
    neutral: "font-semibold",
    success: "bg-green-500 font-semibold hover:bg-green-700",
  }

  const buttonClass = cx(buttonVariants[variant])

  return (
    <AlertDialog {...(open && { open })}>
      {withTrigger && (
        <AlertDialogTrigger>
          <Button className={buttonClass}>{trigger}</Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel {...(close && { onClick: close })}>
            {cancel}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} className={buttonClass}>
            {confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CustomAlertDialog
