"use client"

import React, { Suspense, useState } from "react"

import { cn } from "@/utils/classes"
import { useMediaQuery } from "@/utils/use-media-query"
import { useScrollPosition } from "hooks/use-scroll-position"
import { Heading } from "react-aria-components"
import scrollIntoView from "scroll-into-view-if-needed"

interface TableOfContentsProps {
  title: string
  url: string
  items?: TableOfContentsProps[]
}

interface Props {
  className?: string
  items: TableOfContentsProps[]
}

export function TableOfContents({ className, items }: Props) {
  // const [thereIsAnAd, setThereIsAnAd] = useState(true)
  const tocRef = React.useRef<HTMLDivElement>(null)
  const scrollPosition = useScrollPosition(tocRef)
  const ids = items.flatMap((item) => [
    item.url.split("#")[1]!,
    ...(item.items ? item.items.map((subItem) => subItem.url.split("#")[1]!) : []),
  ])
  const activeId = useActiveItem(ids)
  const activeIndex = activeId?.length || 0

  React.useEffect(() => {
    if (!activeId || activeIndex < 2) return
    const anchor = tocRef.current?.querySelector(`li > a[href="#${activeId}"]`)

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current,
      })
    }
  }, [activeId, activeIndex])

  const isLargeScreen = useMediaQuery("(min-width: 1024px)")

  return (
    <aside
      ref={tocRef}
      className={cn(
        "not-prose forced-color-adjust-none",
        "scrollbar-hidden xl:-mr-6 xl:sticky xl:top-[1.75rem] xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-12",
        "top-20",
        className,
      )}
      style={{
        WebkitMaskImage: isLargeScreen
          ? `linear-gradient(to top, transparent 0%, #000 100px, #000 ${scrollPosition > 30 ? "90%" : "100%"}, transparent 100%)`
          : undefined,
      }}
    >
      <nav aria-labelledby="on-this-page-title" className="w-56">
        <Suspense>
          <>
            <Heading level={2} className="mb-6 font-medium text-base text-fg leading-7 lg:text-lg">
              On this page
            </Heading>
            {items.length > 0 && (
              <ul className="flex flex-col gap-y-2.5">
                {items.map((item) => (
                  <React.Fragment key={item.title}>
                    <TocLink item={item} activeId={activeId} />
                    {item.items && item.items.length > 0 && (
                      <ul className="flex flex-col gap-y-2.5 lg:pl-2.5">
                        {item.items.map((subItem) => (
                          <TocLink key={subItem.title} item={subItem} activeId={activeId} />
                        ))}
                      </ul>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            )}
          </>
        </Suspense>
      </nav>
    </aside>
  )
}

function TocLink({ item, activeId }: { item: TableOfContentsProps; activeId: string | null }) {
  return (
    <li key={item.title}>
      <a
        className={cn(
          "block tracking-tight no-underline outline-hidden duration-200 focus-visible:text-fg focus-visible:outline-hidden lg:text-[0.885rem]",
          item.url.split("#")[1] === activeId
            ? "text-fg forced-colors:text-[Highlight]"
            : "text-muted-fg/90 forced-colors:text-[GrayText]",
        )}
        href={item.url}
      >
        {item.title}
      </a>
    </li>
  )
}

export function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let bestCandidate: IntersectionObserverEntry | null = null
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            (!bestCandidate || bestCandidate.intersectionRatio < entry.intersectionRatio)
          ) {
            bestCandidate = entry
          }
        })
        if (bestCandidate) {
          // @ts-ignore
          setActiveId(bestCandidate.target.id)
        }
      },
      { rootMargin: "0% 0% -25% 0%", threshold: 0.1 },
    )

    itemIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      itemIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [itemIds, activeId])

  return activeId
}
