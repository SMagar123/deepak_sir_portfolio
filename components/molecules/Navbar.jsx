"use client"

import * as React from "react"
import { Menu } from "lucide-react"
import { motion } from "motion/react"
import { useLenis } from "lenis/react"

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
  { label: "Home", id: "home" },
  { label: "Story", id: "story" },
  { label: "Ventures", id: "ventures" },
  { label: "Impact", id: "impact" },
  { label: "Insights", id: "insights" },
  { label: "Media", id: "media" },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [activeId, setActiveId] = React.useState("home")
  const lenis = useLenis()

  // ── Smooth scroll to a section ──────────────────────────────
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    // Prefer Lenis's scrollTo for buttery motion; fall back to native
    if (lenis) {
      lenis.scrollTo(el, { offset: -80, duration: 1.2 })
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // ── Track the active section on scroll ──────────────────────
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-45% 0px -45% 0px", // triggers when section crosses middle of viewport
        threshold: 0,
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const isActive = (id) => activeId === id

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-4 z-50 flex w-full justify-center px-4"
    >
      {/* ── Desktop ── */}
      <nav
        className={cn(
          "hidden items-center gap-1 rounded-xl border border-chart-5 md:flex",
          "bg-background/80 px-2 py-1.5 shadow-sm backdrop-blur-md"
        )}
      >
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.id)
              return (
                <NavigationMenuItem key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      "block cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors lg:text-xl",
                      active
                        ? "text-primary"
                        : "text-foreground/80 hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </button>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <span className="mx-1 h-5 w-px bg-border" aria-hidden />

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <button
            type="button"
            onClick={() => scrollToSection("connect")}
            className="block h-9 cursor-pointer rounded-lg bg-chart-3 px-5 pt-1 text-center text-primary-foreground lg:pt-0 lg:text-xl"
          >
            Connect
          </button>
        </motion.div>
      </nav>

      {/* ── Mobile ── */}
      <nav
        className={cn(
          "flex w-full max-w-md items-center justify-between md:hidden",
          "rounded-xl border border-primary/40 bg-background/80 backdrop-blur-md",
          "px-4 py-2 shadow-sm"
        )}
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="cursor-pointer text-sm font-semibold text-foreground"
        >
          Portfolio
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
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
                const active = isActive(link.id)
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.05 + i * 0.04,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false)
                        // Small delay so the sheet closes before scrolling
                        setTimeout(() => scrollToSection(link.id), 250)
                      }}
                      className={cn(
                        "block w-full cursor-pointer rounded-lg px-4 py-3 text-left text-base font-medium transition-colors",
                        "hover:bg-muted",
                        active ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </button>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.35 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => scrollToSection("connect"), 250)
                  }}
                  className="block h-11 w-full cursor-pointer rounded-xl bg-chart-3 px-4 text-center text-base text-primary-foreground"
                >
                  Connect
                </button>
              </motion.div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  )
}
