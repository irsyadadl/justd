"use client"

import type React from "react"

import { motion } from "motion/react"
import NextLink from "next/link"
import { Link } from "react-aria-components"
import { tv } from "tailwind-variants"

const navLinkStyles = tv({
  base: "relative flex focus-visible:text-fg items-center gap-x-3 tracking-tight py-2 text-sm text-muted-fg transition-colors data-focused:outline-hidden sm:py-3",
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
            className="absolute inset-x-0 w-full h-0.5 rounded bottom-[-0.550rem] bg-fg"
          />
        )}
      </>
    </El>
  )
}

export { NavLink }
