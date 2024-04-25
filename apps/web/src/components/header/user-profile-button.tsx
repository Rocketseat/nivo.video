import { auth, signOut } from '@nivo/auth'
import { Code, Cog, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Avatar } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export async function UserProfileButton() {
  const session = await auth()

  async function handleSignOut() {
    'use server'

    await signOut()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          {session?.user && session?.user.image ? (
            <Image
              className="aspect-square size-full"
              src={session.user.image}
              width={32}
              height={32}
              alt=""
            />
          ) : (
            <div className="aspect-square size-full bg-accent" />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href="/app/settings/profile" className="w-full">
            <Cog className="size-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2" asChild>
          <Link href="/app/settings/developers" className="w-full">
            <Code className="size-4" />
            Developers
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>🇺🇸 English</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem className="space-x-2 bg-muted">
              🇺🇸 English
            </DropdownMenuItem>
            <DropdownMenuItem>🇧🇷 Portuguese</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <form action={handleSignOut}>
          <DropdownMenuItem className="flex items-center gap-2" asChild>
            <button type="submit" className="w-full">
              <LogOut className="size-4" />
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
