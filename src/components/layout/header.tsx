"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/layout/user-nav"
import { ChevronsUpDown, UserCircle } from "lucide-react"
import type { Dispatch, SetStateAction } from "react"

interface HeaderProps {
  role: string
  setRole: Dispatch<SetStateAction<string>>
}

export function Header({ role, setRole }: HeaderProps) {
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-[150px] justify-between">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                {capitalizedRole}
              </div>
              <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[150px]">
            <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
              <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="sales">Sales</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="finance">Finance</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  )
}
