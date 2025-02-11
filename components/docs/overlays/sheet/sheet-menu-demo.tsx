"use client"

import { useState } from "react"

import {
  IconBook,
  IconBookOpen,
  IconBrandCopilot,
  IconBrandGithub,
  IconBuilding,
  IconChartBar,
  IconCodeBrackets,
  IconFilter,
  IconGear,
  IconGlobe,
  IconHeart,
  IconLogout,
  IconMessages,
  IconPeople,
  IconPerson,
  IconStar,
} from "justd-icons"
import { Menu as MenuPrimitive } from "react-aria-components"
import { Avatar, Button, Checkbox, Menu, Modal, Select, Sheet, TextField } from "ui"

export default function SheetMenuDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  return (
    <>
      <Modal.Content isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Header>
          <Modal.Title>Edit status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <TextField
              prefix={<IconBrandGithub />}
              label="Status"
              placeholder="What's your status?"
            />
            <Select label="Clear Status">
              <Select.Trigger />
              <Select.List>
                <Select.Option>Never</Select.Option>
                <Select.Option>in 30 Minutes</Select.Option>
                <Select.Option>in 1 Hour</Select.Option>
                <Select.Option>in 8 Hours</Select.Option>
                <Select.Option>after Today</Select.Option>
                <Select.Option>after a Week</Select.Option>
                <Select.Option>after a Month</Select.Option>
              </Select.List>
            </Select>
            <Select label="Visible to">
              <Select.Trigger />
              <Select.List>
                <Select.Option>Everyone</Select.Option>
                <Select.Option>Organization</Select.Option>
                <Select.Option>Public</Select.Option>
              </Select.List>
            </Select>
            <Checkbox
              label="Busy"
              description="When others mention you, assign you, or request your review, GitHub will let them know that you have limited availability."
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close>Clear Status</Modal.Close>
          <Button onPress={closeModal}>Set Status</Button>
        </Modal.Footer>
      </Modal.Content>
      <Sheet>
        <Sheet.Trigger aria-label="Open menu">
          <Avatar src="/images/avatar/cobain.jpg" alt="irsyadadl" />
        </Sheet.Trigger>
        <Sheet.Content closeButton={false}>
          <Sheet.Header className="sticky top-0 mb-2 flex flex-row items-center gap-x-3 border-b bg-overlay p-4">
            <Avatar src="/images/avatar/cobain.jpg" alt="irsyadadl" />
            <div>
              <Sheet.Title>irsyadadl</Sheet.Title>
              <Sheet.Description>Irsyad A. Panjaitan</Sheet.Description>
            </div>
          </Sheet.Header>
          <Sheet.Body className="px-0 sm:px-0">
            <MenuPrimitive className="divide-y [&_.xss3]:p-2">
              <Menu.Section>
                <Menu.Item onAction={openModal}>
                  <IconBrandGithub />
                  Edit Status
                </Menu.Item>
              </Menu.Section>
              <Menu.Section>
                <Menu.Item>
                  <IconPerson />
                  Your profile
                </Menu.Item>
                <Menu.Item>
                  <IconBook /> Your repositories
                </Menu.Item>
                <Menu.Item>
                  <IconBrandCopilot /> Your Copilot
                </Menu.Item>
                <Menu.Item>
                  <IconChartBar /> Your projects
                </Menu.Item>
                <Menu.Item>
                  <IconStar /> Your stars
                </Menu.Item>
                <Menu.Item>
                  <IconCodeBrackets /> Your gists
                </Menu.Item>
                <Menu.Item>
                  <IconBuilding /> Your organizations
                </Menu.Item>
                <Menu.Item>
                  <IconGlobe /> Your enterprises
                </Menu.Item>
                <Menu.Item>
                  <IconHeart />
                  Your sponsors
                </Menu.Item>
              </Menu.Section>
              <Menu.Section>
                <Menu.Item>
                  <IconFilter /> Feature preview
                </Menu.Item>
                <Menu.Item>
                  <IconGear />
                  Settings
                </Menu.Item>
              </Menu.Section>
              <Menu.Section>
                <Menu.Item>
                  <IconBookOpen /> GitHub Docs
                </Menu.Item>
                <Menu.Item>
                  <IconPeople /> GitHub Support
                </Menu.Item>
                <Menu.Item>
                  <IconMessages /> GitHub Community
                </Menu.Item>
              </Menu.Section>
              <Menu.Section>
                <Menu.Item>
                  <IconLogout /> Sign out
                </Menu.Item>
              </Menu.Section>
            </MenuPrimitive>
          </Sheet.Body>
        </Sheet.Content>
      </Sheet>
    </>
  )
}
