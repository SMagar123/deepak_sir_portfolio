"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Ventures", href: "/ventures" },
  { label: "Impact", href: "/impact" },
  { label: "Insights", href: "/insights" },
  { label: "Media", href: "/media" },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-50 flex w-full justify-center px-4"
    >
      <nav
        className={cn(
          "hidden items-center gap-1 rounded-xl border border-chart-5 md:flex",
          "bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-md"
        )}
      >
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <NavigationMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-full px-4 py-2 text-sm font-medium transition-colors lg:text-xl",

                      active
                        ? "text-primary"
                        : "text-foreground/80 hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            href="/connect"
            className="block h-9 rounded-lg bg-primary px-5 pt-1 text-center text-primary-foreground lg:pt-0.5 lg:text-xl"
          >
            Connect
          </Link>
        </motion.div>
      </nav>

    
      <nav
        className={cn(
          "flex w-full max-w-md items-center justify-between md:hidden",
          "rounded-xl border border-primary/40 bg-background/80 backdrop-blur-md",
          "px-4 py-2 shadow-sm"
        )}
      >
        <Link href="/" className="text-sm font-semibold text-foreground">
          Portfolio
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger >
            <motion.div
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
              className="outline-none"
            >
              <Menu className="size-5 text-chart-3" />
            </motion.div>
          </SheetTrigger>

          <SheetContent side="right" className="w-75 bg-background sm:w-90">
            <SheetHeader>
              <SheetTitle className="text-left text-primary">Menu</SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-1 px-4">
              {navLinks.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-base font-medium transition-colors",
                        "hover:bg-muted",
                        active ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <Link
                  href="/connect"
                  className="block h-11 rounded-xl bg-primary px-4 pt-2 text-center text-base text-primary-foreground"
                  onClick={() => setOpen(false)}
                >
                  Connect
                </Link>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
