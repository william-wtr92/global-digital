import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { FaRegTrashAlt } from "react-icons/fa"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Employee } from "@/features/companies/employees/types/employee"
import { useAppContext } from "@/hooks/useAppContext"
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

type DeleteEmployeeDialogProps = {
  employee: Employee
}

const DeleteEmployeeDialog = ({ employee }: DeleteEmployeeDialogProps) => {
  const t = useTranslations()
  const queryClient = useQueryClient()
  const { id } = useParams() as { id: string }
  const { userInfo } = useAppContext()

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await apiFetch({
        url: routes.api.companies.deleteEmployee(id, employee.id),
        method: "DELETE",
      })

      if (result.status !== 200) {
        toast.error(t("Companies.habilitation.deleteEmployeeError"))

        return
      }

      toast.success(t("Companies.habilitation.deleteEmployeeSucess"))
      await queryClient.invalidateQueries({ queryKey: ["employees"] })
    },
    onError: () => {
      toast.error(t("Companies.habilitation.deleteEmployeeError"))
    },
  })

  const handleDeleteEmployee = () => {
    mutation.mutate()
  }

  return (
    <Dialog>
      <DialogTrigger asChild disabled={userInfo.id === employee.userId}>
        <Button variant="ghostNoHover" size="none">
          <FaRegTrashAlt className="text-2xl text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">
            {t("Companies.habilitation.sureDeleteEmployee")}
          </DialogTitle>
          <DialogDescription className="text-left">
            {t("Companies.habilitation.deleteEmployeeDescription")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex-row justify-end gap-2">
          <DialogClose>
            <Button type="submit" variant="ghost" className="border">
              {t("Companies.habilitation.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDeleteEmployee}
          >
            {t("Companies.habilitation.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteEmployeeDialog
