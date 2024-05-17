'use client'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import { useAtomValue, useSetAtom } from 'jotai'
import { selectAtom } from 'jotai/utils'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useDictionary } from '@/state/dictionary'
import {
  addToAudioConversionQueueAtom,
  audioConversionAtom,
} from '@/state/uploads'

export interface AudioConversionProgressColumnProps {
  uploadId: string
}

export function AudioConversionProgressColumn({
  uploadId,
}: AudioConversionProgressColumnProps) {
  const dictionary = useDictionary()
  const audioConversion = useAtomValue(
    selectAtom(
      audioConversionAtom,
      useCallback((state) => state.get(uploadId), [uploadId]),
    ),
  )

  const addToAudioConversionQueue = useSetAtom(addToAudioConversionQueueAtom)

  if (!audioConversion) {
    return null
  }

  const { isRunning, progress, error } = audioConversion

  return (
    <div className="flex items-center gap-2 font-medium text-muted-foreground">
      {isRunning ? (
        <Progress value={progress} className="transition-all" />
      ) : error ? (
        <>
          <CrossCircledIcon className="mr-2 h-4 w-4 text-red-500 dark:text-red-400" />
          <span className="text-red-500 dark:text-red-400">
            {dictionary.audio_conversion_error}
            <Button
              variant="link"
              className="inline p-0 text-inherit dark:text-inherit"
              onClick={() => addToAudioConversionQueue(uploadId)}
            >
              ({dictionary.audio_conversion_retry})
            </Button>
          </span>
        </>
      ) : progress === 100 ? (
        <>
          <CheckCircledIcon className="h-4 w-4 text-emerald-500" />
          <span className="text-emerald-500">
            {dictionary.audio_conversion_complete}
          </span>
        </>
      ) : (
        <>
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="text-muted-foreground">
            {dictionary.audio_conversion_waiting}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoCircledIcon className="h-4 w-4 cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-[280px]">
                <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
                  {dictionary.audio_conversion_tooltip}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </div>
  )
}
