"use client"
import { InstallIcon } from "@/app/(app)/icons/partials/controller/install-icon"
import {
  IconArrowRight,
  IconBrandJustd,
  IconCheck,
  IconCircleCheckFill,
  IconCirclePerson,
  IconCirclePersonFill,
  IconClapperboard,
  IconClapperboardFill,
  IconCreditCard,
  IconCreditCardFill,
  IconCube,
  IconCubeFill,
  IconDeviceDesktop2,
  IconDeviceDesktop2Fill,
  IconFileText,
  IconFileTextFill,
  IconFolderCloud,
  IconFolderCloudFill,
  IconGiroCards,
  IconGiroCardsFill,
  IconInboxEmpty,
  IconInboxEmptyFill,
  IconLayoutAlignLeft,
  IconLayoutAlignLeftFill,
  IconLayoutColumnLeftside,
  IconLayoutColumnLeftsideFill,
  IconMoon,
  IconMoonFill,
  IconNotepad,
  IconNotepadFill,
  IconPackage,
  IconPackageFill,
  IconPercentBadge,
  IconPercentBadgeFill,
  IconPieChart,
  IconPieChartFill,
  IconRainy,
  IconRainyFill,
  IconRunShortcut,
  IconRunShortcutFill,
  IconScreenSharing,
  IconScreenSharingFill,
  IconSearch,
  IconSearchFill,
  IconSend,
  IconSendFill,
  IconService,
  IconServiceFill,
  IconShield,
  IconShieldFill,
  IconShoppingBag,
  IconShoppingBagFill,
  IconStorage,
  IconStorageFill,
  IconStore3,
  IconStore3Fill,
  IconTicket,
  IconTicketFill,
  IconTrash,
  IconTrashFill,
  IconTriangleExclamation,
  IconTriangleExclamationFill,
} from "justd-icons"
import { useEffect, useState } from "react"
import { Container, Link, buttonStyles } from "ui"

export function IconResources() {
  const [isCopied, setIsCopied] = useState(false)

  function handleCopy(text: string) {
    setIsCopied(true)
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true)
    })
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 2000)
    }
    return () => clearTimeout(timer)
  }, [isCopied])
  return (
    <div className="border-y py-16">
      <Container>
        <div className="grid items-end gap-6 md:grid-cols-2 md:gap-10">
          <div className="">
            <div className="grid size-14 place-content-center rounded-xl bg-secondary/50 ring-1 ring-fg/20 group-hover:bg-secondary">
              <IconBrandJustd className="size-6" />
            </div>
            <h2 className="mt-4 max-w-md font-semibold text-3xl tracking-tight md:text-4xl">
              Empower your design with Justd Icons
            </h2>
            <p className="mt-3 mb-6 text-pretty text-muted-fg leading-relaxed lg:text-lg">
              Justd Icons is a powerful open-source SVG icon library with over{" "}
              <strong className="text-fg">1,191 symbols</strong>, and more added with every release.
              Designed to seamlessly integrate into any project, they work perfectly whether or not
              you use Justd components.
            </p>

            {/*<div className="flex justify-between items-center py-1 px-3 max-w-xs h-11 text-sm rounded-lg border group bg-secondary/20 shadow-xs dark:bg-secondary/50">*/}
            {/*  <code>npm i justd-icons</code>*/}
            {/*  <Button*/}
            {/*    className={cn(*/}
            {/*      "size-8 group-hover:flex hidden -mr-2 rounded-xs",*/}
            {/*      isCopied ? "flex" : "hidden",*/}
            {/*    )}*/}
            {/*    onPress={() => handleCopy("npm i justd-icons")}*/}
            {/*    appearance="plain"*/}
            {/*    size="square-petite"*/}
            {/*  >*/}
            {/*    {isCopied ? <IconCheck /> : <IconDuplicate />}*/}
            {/*  </Button>*/}
            {/*</div>*/}
            <InstallIcon />
          </div>
          <div>
            <div className="grid flex-1 items-start gap-2 **:data-[slot=icon]:size-5 md:grid-cols-2">
              <div className="flex flex-wrap gap-6 rounded-lg border p-6">
                <IconCheck />
                <IconShoppingBag />
                <IconTriangleExclamation />
                <IconCirclePerson />
                <IconCube />
                <IconClapperboard />
                <IconPieChart />
                <IconFileText />
                <IconFolderCloud />
                <IconInboxEmpty />
                <IconCreditCard />
                <IconDeviceDesktop2 />
                <IconGiroCards />
                <IconMoon />
                <IconShield />
                <IconStore3 />
                <IconPackage />
                <IconTicket />
                <IconService />
                <IconLayoutAlignLeft />
                <IconLayoutColumnLeftside />
                <IconNotepad />
                <IconPercentBadge />
                <IconSearch />
                <IconStorage />
                <IconRainy />
                <IconTrash />
                <IconSend />
                <IconRunShortcut />
                <IconScreenSharing />
              </div>
              <div className="flex flex-wrap gap-6 rounded-lg border p-6">
                <IconCircleCheckFill />
                <IconShoppingBagFill />
                <IconTriangleExclamationFill />
                <IconCirclePersonFill />
                <IconCubeFill />
                <IconClapperboardFill />
                <IconPieChartFill />
                <IconFileTextFill />
                <IconFolderCloudFill />
                <IconInboxEmptyFill />
                <IconCreditCardFill />
                <IconDeviceDesktop2Fill />
                <IconGiroCardsFill />
                <IconMoonFill />
                <IconShieldFill />
                <IconStore3Fill />
                <IconPackageFill />
                <IconTicketFill />
                <IconServiceFill />
                <IconLayoutAlignLeftFill />
                <IconLayoutColumnLeftsideFill />
                <IconNotepadFill />
                <IconPercentBadgeFill />
                <IconSearchFill />
                <IconStorageFill />
                <IconRainyFill />
                <IconTrashFill />
                <IconSendFill />
                <IconRunShortcutFill />
                <IconScreenSharingFill />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Link className={buttonStyles} href="/icons">
                View all icons <IconArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
