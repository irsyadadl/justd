"use client"

import type React from "react"

import { motion } from "motion/react"
import { Link as NextLink } from "next-view-transitions"
import { Link } from "react-aria-components"
import { tv } from "tailwind-variants"

const navLinkStyles = tv({
  base: "relative flex items-center gap-x-3 py-2 py-4.5 text-muted-fg text-sm tracking-tight transition-colors focus-visible:text-fg data-focused:outline-hidden sm:py-3",
  variants: {
    isActive: {
      false: "text-muted-fg hover:text-fg forced-colors:text-[Gray]",
      true: "text-fg forced-colors:text-[WindowText]",
    },
  },
})

interface NavLinkProps {
  href: string
  isActive?: boolean
  isNextLink?: boolean
  children?: React.ReactNode
  target?: string
  className?: string
}

const NavLink = ({ href, isActive, className, isNextLink, ...props }: NavLinkProps) => {
  const El = isNextLink ? NextLink : Link
  return (
    <El href={href} className={navLinkStyles({ isActive, className })} {...props}>
      <>
        {props.children}
        {isActive && (
          <motion.span
            layoutId="current-indicator-navlink"
            className="absolute inset-x-0 bottom-[-0.550rem] h-0.5 w-full rounded bg-fg"
          />
        )}
      </>
    </El>
  )
}

export { NavLink }
