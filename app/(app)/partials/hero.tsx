"use client"

import { siteConfig } from "@/resources/config/site"
import { IconBrandJustd, IconCube, IconStar } from "justd-icons"
import { Header } from "react-aria-components"
import { Container, Link, buttonStyles } from "ui"

export function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-bg">
      <div
        aria-hidden="true"
        className="-top-10 sm:-top-56 -z-10 absolute inset-x-0 hidden transform-gpu overflow-hidden blur-3xl sm:block"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="-translate-x-1/2 relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] rotate-[30deg] bg-linear-to-tr opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-indigo-500 dark:to-blue-600 dark:opacity-20"
        />
      </div>
      <svg
        aria-hidden="true"
        className="-z-10 absolute inset-0 hidden h-full w-full stroke-fg/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] lg:block"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div className="border-b pt-10 pb-6 sm:py-8 lg:py-10 xl:py-20 2xl:py-24">
        <Container>
          <Header>
            <Link
              target="_blank"
              href={siteConfig.repo}
              className="group inline-flex items-center gap-x-1 rounded-full bg-zinc-50 px-3 py-2 text-xs text-zinc-900 data-hovered:bg-zinc-200"
            >
              <IconStar className="text-amber-400 duration-200 group-hover:fill-amber-400 group-hover:text-amber-400" />
              Stars sustain energy
            </Link>
            <h1 className="mt-4 mb-4 max-w-xl font-bold text-2xl tracking-tight lg:mb-6 lg:text-4xl">
              Accessible React UI Components. Copy, Customize, and Make Them Yours.
            </h1>
            <p className="block max-w-3xl max-w-xl text-base text-muted-fg leading-relaxed md:leading-relaxed lg:text-xl [&_strong]:font-medium">
              <strong className="text-fg">{siteConfig.name}</strong> is a chill set of React
              components, built on top of <strong className="text-fg">React Aria Components</strong>
              , all about keeping the web accessible. Easy to customize and just copy & paste into
              your React projects. Plus, it includes{" "}
              <strong className="text-fg">Tailwind CSS</strong> for sleek styling right out of the
              box.
            </p>
          </Header>

          <div className="mt-6 flex items-center gap-x-2">
            <Link
              className={buttonStyles({
                size: "large",
              })}
              href="/docs/2.x/getting-started/installation"
            >
              <IconBrandJustd />
              Get started
            </Link>
            <Link
              className={buttonStyles({
                size: "large",
                intent: "secondary",
              })}
              href="/docs/2.x/components/buttons/button"
            >
              <IconCube />
              Components
            </Link>
          </div>
        </Container>
      </div>
    </div>
  )
}
