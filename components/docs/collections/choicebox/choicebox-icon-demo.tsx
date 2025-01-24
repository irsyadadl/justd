import { IconBrandLaravel, IconBrandReactjs, IconBrandTypescript } from "justd-icons"
import { Choicebox } from "ui"

export default function ChoiceboxIconDemo() {
  return (
    <Choicebox
      className="mx-auto max-w-lg"
      selectionMode="single"
      defaultSelectedKeys={["Standard"]}
      aria-label="Select prices"
      gap={0}
      columns={1}
      items={frameworks}
    >
      {(item) => (
        <Choicebox.Item title={item.title} icon={item.icon} description={item.description} />
      )}
    </Choicebox>
  )
}

const frameworks = [
  {
    key: "laravel",
    title: "Laravel",
    description: "Laravel is a web application framework with expressive, elegant syntax.",
    icon: IconBrandLaravel,
  },
  {
    key: "react",
    title: "React",
    description: "React is a JavaScript library for building user interfaces.",
    icon: IconBrandReactjs,
  },
  {
    key: "ts",
    title: "Typescript",
    description: "Typescript is a typed superset of JavaScript that compiles to plain JavaScript.",
    icon: IconBrandTypescript,
  },
]
