import { getDictionary, i18n, Locale } from '@nivo/i18n'
import { atom, useAtomValue } from 'jotai'

export const localeAtom = atom<Locale>(i18n.defaultLocale)

export const dictionaryAtom = atom((get) => getDictionary(get(localeAtom)))

export const useDictionary = () => {
  return useAtomValue(dictionaryAtom)
}