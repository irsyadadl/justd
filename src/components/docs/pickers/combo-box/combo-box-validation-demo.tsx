"use client"

import { Avatar, Button, ComboBox, Form } from "ui"

const users = [
  { id: 1, name: "Barbara Kirlin Sr.", image_url: "https://i.pravatar.cc/150?img=1" },
  //...
]
export default function ComboBoxValidationDemo() {
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-2">
      <ComboBox placeholder="Select a user" label="Users" isRequired>
        <ComboBox.Input />
        <ComboBox.List items={users}>
          {(item) => (
            <ComboBox.Option key={item.id} id={item.id} textValue={item.name}>
              <Avatar src={item.image_url} />
              <ComboBox.Label>{item.name}</ComboBox.Label>
            </ComboBox.Option>
          )}
        </ComboBox.List>
      </ComboBox>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
