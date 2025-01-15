"use client"

import { cn } from "@/utils/classes"
import {
  IconBrandAstro,
  IconBrandLaravel,
  IconBrandNextjs,
  IconBrandRemix,
  IconWindowVisitFill,
} from "justd-icons"
import { Badge, Card, Container, Grid, Heading, Link } from "ui"

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
    url: "https://remix.getjustd.com/",
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
        <Heading level={2} className="mb-6">
          Starter Kit
        </Heading>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Resources">
          {resources.map((item) => (
            <Wrapper aria-label={item.name} key={item.name.toLowerCase().replaceAll(" ", "-")}>
              <Link
                href={item.url}
                aria-label={`Open ${item.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 size-full"
              />
              <div className="flex-1">
                <WrapperIcon>
                  <item.icon className="size-6" />
                </WrapperIcon>
                <Card.Header>
                  <Card.Title level={3}>{item.name}</Card.Title>
                  <Card.Description className="line-clamp-2">{item.description}</Card.Description>
                </Card.Header>
              </div>
              <Card.Footer className="justify-between">
                <Badge>{item.label}</Badge>
              </Card.Footer>
            </Wrapper>
          ))}
        </div>
      </section>

      <section id="support" className="mb-12">
        <Heading level={2} className="mb-6">
          Extra
        </Heading>
        <Grid
          columns={{
            initial: 1,
            sm: 2,
          }}
          gap={2}
          aria-label="Extra"
        >
          <Wrapper aria-label="Extra">
            <Link
              target="_blank"
              aria-label={"Justd icons"}
              rel="noopener noreferrer"
              href="https://github.com/sponsors/irsyadadl"
              className="absolute inset-0 size-full"
            />
            <div className="flex-1">
              <WrapperIcon>💖</WrapperIcon>
              <Card.Header>
                <Card.Title level={3}>Support This Project</Card.Title>
                <Card.Description className="line-clamp-2">
                  Join us in building something impactful. Your contributions, whether sharing,
                  coding, or spreading the word, help us grow and make a difference.
                </Card.Description>
              </Card.Header>
            </div>
            <Card.Footer>
              <Badge className="bg-pink-400/15 text-pink-700 group-data-hovered:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-hovered:bg-pink-400/20">
                support
              </Badge>
            </Card.Footer>
          </Wrapper>
          <Wrapper aria-label="Templates" id="templates">
            <Link
              target="_blank"
              aria-label={"Justd icons"}
              rel="noopener noreferrer"
              href="https://irsyad.co/templates"
              className="absolute inset-0 size-full"
            />
            <div className="flex-1">
              <WrapperIcon>
                <IconWindowVisitFill className="size-6" />
              </WrapperIcon>
              <Card.Header>
                <Card.Title level={3}>Templates</Card.Title>
                <Card.Description className="line-clamp-2">
                  Looking for beautifully crafted templates to elevate your project? Browse through
                  a collection of designs tailored to meet your needs.
                </Card.Description>
              </Card.Header>
            </div>
            <Card.Footer>
              <Badge className="bg-zinc-600/10 text-zinc-700 group-data-hovered:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hovered:bg-white/10">
                support
              </Badge>
            </Card.Footer>
          </Wrapper>
        </Grid>
      </section>
    </Container>
  )
}

export function Wrapper({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="wrapper-card"
      className={cn(
        "group relative inset-ring inset-ring-zinc-200 inset-shadow-xs inset-shadow-zinc-200 flex h-full w-full flex-col rounded-lg bg-overlay p-4 shadow-xs **:data-[slot=card-footer]:px-0 **:data-[slot=card-header]:px-0 lg:p-8 dark:inset-ring-zinc-500/10 dark:inset-shadow-zinc-800",
        className,
      )}
      {...props}
    />
  )
}

export function WrapperIcon(props: React.ComponentProps<"div">) {
  return (
    <div
      id="support"
      className="inset-ring inset-ring-fg/15 grid size-14 place-content-center rounded-full bg-secondary/20 text-xl group-hover:bg-secondary/30"
      {...props}
    />
  )
}
