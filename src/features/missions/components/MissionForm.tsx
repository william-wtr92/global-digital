import { CalendarIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useForm, useWatch } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  MissionOperating,
  missionSchema,
  type MissionType,
} from "@/features/missions/types/missions"
import { cn } from "@/utils/style"

type Props = {
  defaultValues?: Partial<MissionType>
  onSubmit: (data: MissionType) => void
  submitText: string
}

const MissionForm = ({ defaultValues, onSubmit, submitText }: Props) => {
  const t = useTranslations("Missions")

  const form = useForm<MissionType>({
    resolver: zodResolver(missionSchema),
    defaultValues,
  })

  const { setValue, control } = form

  const startDate = useWatch({
    control,
    name: "startDate",
  })

  const operating = useWatch({
    control,
    name: "operating",
  })

  useEffect(() => {
    if (operating === MissionOperating.homeWorking) {
      setValue("localisation", "")
    }
  }, [operating, setValue])

  return (
    <div className="flex w-full flex-col justify-center xl:w-1/2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8 rounded-md bg-white p-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="mx-auto w-4/5 xl:w-2/3">
                <FormLabel className="relative left-1 font-bold text-neutral-800">
                  {t("form.create.title.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                    type="text"
                    placeholder={t("form.create.title.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="relative left-2 text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="mx-auto flex w-4/5 flex-col xl:w-2/3">
                <FormLabel>{t("form.create.startDate.label")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("form.create.startDate.picker")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="mx-auto flex w-4/5 flex-col xl:w-2/3">
                <FormLabel>{t("form.create.endDate.label")}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={!startDate}
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("form.create.endDate.picker")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="mx-auto w-4/5 xl:w-2/3">
                <FormLabel>{t("form.create.description.label")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("form.create.description.placeholder")}
                    className="h-48 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="relative left-2 text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operating"
            render={({ field }) => (
              <FormItem className="mx-auto w-4/5 xl:w-2/3">
                <FormLabel>{t("form.create.operating.label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t("form.create.operating.placeholder")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={MissionOperating.homeWorking}>
                      {t("form.create.operating.options.homeWorking")}
                    </SelectItem>
                    <SelectItem value={MissionOperating.onSite}>
                      {t("form.create.operating.options.onSite")}
                    </SelectItem>
                    <SelectItem value={MissionOperating.hybrid}>
                      {t("form.create.operating.options.hybrid")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="relative left-2 text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="localisation"
            render={({ field }) => (
              <FormItem className="mx-auto w-4/5 xl:w-2/3">
                <FormLabel className="relative left-1 font-bold text-neutral-800">
                  {t("form.create.localisation.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                    type="text"
                    placeholder={t("form.create.localisation.placeholder")}
                    {...field}
                    value={field.value ?? ""}
                    disabled={
                      form.watch("operating") === MissionOperating.homeWorking
                    }
                  />
                </FormControl>
                <FormMessage className="relative left-2 text-destructive" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="mx-auto w-4/5 xl:w-2/3">
                <FormLabel className="relative left-1 font-bold text-neutral-800">
                  {t("form.create.price.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:outline-accent-500 mt-2 px-4 py-2 focus-visible:border-0 focus-visible:ring-0"
                    type="number"
                    placeholder={t("form.create.price.placeholder")}
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage className="relative left-2 text-destructive" />
              </FormItem>
            )}
          />
          <Button
            disabled={!form.formState.isValid}
            className={`mx-auto w-1/2 bg-darkBlue py-2.5 font-semibold text-white ${!form.formState.isValid ? "cursor-not-allowed opacity-50" : "bg-gray-800 hover:cursor-pointer"}`}
            type="submit"
          >
            {submitText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default MissionForm
