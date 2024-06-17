import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { Search } from './search'
import { ThemeSwitcher } from './theme-switcher'
import { UserProfileButton } from './user-profile-button'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 35 24"
            fill="currentColor"
            className="h-5"
          >
            <path
              d="M18.4596 18.8701C11.7239 24.6244 6.94072 25.0302 4.49118 22.5786C2.2342 20.3216 4.10604 14.6605 8.66762 9.06984L0 0.404297H5.53891L14.1486 9.01394C8.71524 14.4804 5.5472 20.3009 7.18506 21.9388C8.54131 23.2971 12.7157 21.4149 17.2193 17.6298L18.4596 18.8701Z"
              fill="currentColor"
            ></path>
            <path
              d="M34.2605 23.5951H28.7216L20.1119 14.9855C25.5452 9.52109 28.7133 3.69851 27.0775 2.06272C25.7212 0.70439 21.5427 2.58866 17.0391 6.37375L15.7988 5.13345C22.5366 -0.622874 27.3218 -1.0308 29.7714 1.42082C32.0284 3.67779 30.1586 9.33888 25.5949 14.9296L34.2626 23.5951H34.2605Z"
              fill="currentColor"
            ></path>
          </svg>

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-2 lg:space-x-3">
            <MenuLink href="/">Dashboard</MenuLink>
            <MenuLink href="/uploads">Uploads</MenuLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Search />

          <Separator orientation="vertical" className="h-6" />

          <Button size="sm" asChild>
            <Link href="/upload">
              <PlusCircle className="mr-2 size-4" />
              Upload video
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </div>
  )
}
