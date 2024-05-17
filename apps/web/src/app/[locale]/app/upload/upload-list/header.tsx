'use client'

import { MagicWandIcon, TextIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ChevronDownIcon, Loader2 } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useDictionary } from '@/state/dictionary'
import {
  amountOfUploadsAtom,
  areUploadsEmptyAtom,
  clearUploadsAtom,
  isRunningAIGenerationAtom,
  isThereAnyPendingUploadAtom,
  uploadsAtom,
} from '@/state/uploads'

interface HeaderProps {
  onSubmit: () => void
}

export function Header({ onSubmit }: HeaderProps) {
  const dictionary = useDictionary()
  const {
    formState: { isSubmitting },
    setValue,
  } = useFormContext()

  const [isRunningAI, setIsRunningAI] = useAtom(isRunningAIGenerationAtom)

  const uploads = useAtomValue(uploadsAtom)
  const amountOfUploads = useAtomValue(amountOfUploadsAtom)
  const isThereAnyPendingUpload = useAtomValue(isThereAnyPendingUploadAtom)
  const areUploadsEmpty = useAtomValue(areUploadsEmptyAtom)
  const clearUploads = useSetAtom(clearUploadsAtom)

  async function generateAITitles() {
    setIsRunningAI(true)

    await Promise.allSettled(
      Array.from(uploads.values()).map(async (upload, index) => {
        const fileName = upload.file.name

        const response = await axios.get('/api/ai/generate/title', {
          params: {
            slug: fileName,
          },
        })

        const { title } = response.data

        setValue(`files.${index}.title`, title, {
          shouldValidate: true,
        })
      }),
    )

    setIsRunningAI(false)
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
        {dictionary.header_upload_title}
        {isThereAnyPendingUpload && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </h2>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="flex gap-2"
              disabled={areUploadsEmpty || isSubmitting}
            >
              {isRunningAI ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <MagicWandIcon className="h-3 w-3" />
              )}
              {dictionary.header_ai_tools}
              <ChevronDownIcon className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={isRunningAI}
              onSelect={generateAITitles}
            >
              <TextIcon className="mr-2 h-4 w-4" />
              {dictionary.header_generate_titles}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              disabled={areUploadsEmpty || isSubmitting}
            >
              {dictionary.header_clear_all}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dictionary.alert_dialog_title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {dictionary.alert_dialog_description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                {dictionary.alert_dialog_cancel}
              </AlertDialogCancel>
              <AlertDialogAction onClick={clearUploads}>
                {dictionary.alert_dialog_proceed}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          type="button"
          size="sm"
          className="w-32"
          disabled={areUploadsEmpty || isThereAnyPendingUpload || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            `${dictionary.header_create_all} (${amountOfUploads})`
          )}
        </Button>
      </div>
    </div>
  )
}
