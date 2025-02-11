"use client"

import { IconBrandJustdBlocks } from "@/components/icons/icon-brand-justd-blocks"
import { cn } from "@/utils/classes"
import {
  IconBrandAstro,
  IconBrandLaravel,
  IconBrandNextjs,
  IconBrandRemix,
  IconWindowVisitFill,
} from "justd-icons"
import { Badge, Card, Container, Heading, Link } from "ui"

const resources = [
  {
    icon: IconBrandNextjs,
    name: "Next.js Starter Kit",
    url: "https://next.getjustd.com/",
    description:
      "A Next.js starter kit with Justd installed. You don't need to set up anything, just run clone it and you're good to go!",
    label: "Starter Kit",
  },
  {
    icon: IconBrandLaravel,
    name: "Laravel Starter Kit",
    url: "https://github.com/justdlabs/inertia.ts",
    description:
      "A Laravel starter kit with Justd installed. It includes a authentication system out of the box.",
    label: "Starter Kit",
  },
  {
    icon: IconBrandRemix,
    name: "Remix Starter Kit",
    url: "https://github.com/justdlabs/remix",
    description: "A Remix starter kit with Justd installed, ready for use in any application.",
    label: "Starter Kit",
  },
  {
    icon: IconBrandAstro,
    name: "Astro Starter Kit",
    url: "https://astro.getjustd.com/",
    description: "A Astro starter kit with Justd installed, ready for use in any application.",
    label: "Starter Kit",
  },
]

export function Resources() {
  return (
    <Container>
      <section id="starter-kit" className="mb-12">
        <Heading level={2} className="mb-4 text-2xl sm:text-2xl">
          Starter Kit
        </Heading>
        <div
          className="grid grid-cols-1 gap-px divide-y border-y p-px sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 sm:bg-border"
          aria-label="Resources"
        >
          {resources.map((item) => (
            <Link
              target="_blank"
              href={item.url}
              className="group relative bg-bg p-4 data-hovered:bg-overlay sm:p-8 lg:p-10"
              aria-label={item.name}
              key={item.name.toLowerCase().replaceAll(" ", "-")}
            >
              <div className="flex">
                <WrapperIcon>
                  <item.icon />
                </WrapperIcon>
                <Card.Header className="flex flex-col gap-y-2 sm:gap-y-4">
                  <Card.Title level={3} className="sm:mb-2 sm:text-2xl/0">
                    {item.name}
                  </Card.Title>
                  <Card.Description>{item.description}</Card.Description>
                  <div>
                    <Badge>{item.label}</Badge>
                  </div>
                </Card.Header>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="extra">
        <div className="mb-4">
          <Heading level={2} className="text-2xl sm:text-2xl">
            Justd Blocks
          </Heading>
          <p className="text-muted-fg leading-relaxed lg:text-lg">
            Create Beautiful Pages Effortlessly in No Time
          </p>
        </div>
        <div
          className="grid grid-cols-1 gap-px divide-y border-y p-px sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 sm:bg-border"
          aria-label="Extra"
        >
          <Link
            className="group relative bg-bg p-4 data-hovered:bg-overlay sm:p-8 lg:p-10"
            target="_blank"
            aria-label={"Justd Blocks"}
            rel="noopener noreferrer"
            href="https://dub.sh/RNMV32k"
          >
            <span className="absolute top-0 right-0 mt-12 mr-4 rotate-12 font-mono text-2xl text-muted-fg/20 tracking-tighter sm:text-7xl">
              15% off
            </span>
            <div className="flex">
              <WrapperIcon>
                <IconBrandJustdBlocks />
              </WrapperIcon>
              <Card.Header className="flex flex-col gap-y-2 sm:gap-y-4">
                <Card.Title level={3} className="sm:mb-2 sm:text-2xl/0">
                  Justd Blocks
                </Card.Title>
                <Card.Description>
                  Pre-designed, ready-to-use React components for seamless integration, customizable
                  and optimized for modern web applications.
                </Card.Description>
                <div>
                  <Badge>15% off</Badge>
                </div>
              </Card.Header>
            </div>
          </Link>
          <Link
            className="group relative bg-bg p-4 data-hovered:bg-overlay sm:p-8 lg:p-10"
            target="_blank"
            aria-label={"Justd icons"}
            rel="noopener noreferrer"
            href="https://blocks.getjustd.com/templates"
          >
            <div className="flex">
              <WrapperIcon>
                <IconWindowVisitFill className="size-6" />
              </WrapperIcon>
              <Card.Header className="flex flex-col gap-y-2 sm:gap-y-4">
                <Card.Title level={3} className="sm:mb-2 sm:text-2xl/0">
                  Templates
                </Card.Title>
                <Card.Description>
                  Looking for beautifully crafted templates to elevate your project? Browse through
                  a collection of designs tailored to meet your needs.
                </Card.Description>
                <div>
                  <Badge>15% off</Badge>
                </div>
              </Card.Header>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  )
}

export function Wrapper({
  slot = "wrapper-card",
  className,
  ...props
}: React.ComponentProps<"div"> & { slot?: string }) {
  return (
    <div
      data-slot={slot}
      className={cn("relative rounded-md border bg-overlay px-4 py-10 sm:px-6 sm:py-8", className)}
      {...props}
    />
  )
}

export function WrapperIcon(props: React.ComponentProps<"div">) {
  return (
    <div
      id="support"
      className="inset-ring inset-ring-fg/10 grid size-14 shrink-0 place-content-center rounded-full bg-secondary/20 text-xl group-hover:inset-ring-primary/25 group-hover:bg-primary/5 **:group-hover:text-primary **:[svg]:size-6"
      {...props}
    />
  )
}
