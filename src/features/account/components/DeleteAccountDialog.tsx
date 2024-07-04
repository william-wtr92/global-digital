import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
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
import { apiFetch } from "@/lib/api"
import routes from "@/utils/routes"

type DeleteAccountDialogProps = {
  id: string
}

const DeleteAccountDialog = ({ id }: DeleteAccountDialogProps) => {
  const t = useTranslations()
  const router = useRouter()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const result = await apiFetch({
        url: routes.api.freelance.deleteAccount(id),
        method: "DELETE",
      })

      if (result.status !== 200) {
        toast.error(t("Form.UpdateProfilForm.deleteAccountError"))

        return
      }

      queryClient.invalidateQueries({ queryKey: ["user"] })
      queryClient.invalidateQueries({
        queryKey: ["freelanceUpdateProfile", id],
      })
      queryClient.invalidateQueries({
        queryKey: ["freelanceProfile"],
      })
      queryClient.invalidateQueries({
        queryKey: ["areaMoreAboutFreelance"],
      })
      toast.success(t("Form.UpdateProfilForm.deleteAccountSuccess"))
      router.push(routes.registration)
    },
    onError: () => {
      toast.error(t("Form.UpdateProfilForm.deleteAccountError"))
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          {t("Form.UpdateProfilForm.deleteAccount")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-left">
            {t("Form.UpdateProfilForm.areYouSure")}
          </DialogTitle>
          <DialogDescription className="text-left">
            {t("Form.UpdateProfilForm.deleteAccountDescription")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex-row justify-end gap-2">
          <DialogClose>
            <Button type="submit" variant="ghost" className="border">
              {t("Form.UpdateProfilForm.cancel")}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              mutation.mutate()
            }}
          >
            {t("Form.UpdateProfilForm.continue")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteAccountDialog
