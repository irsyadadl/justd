import * as fs from "node:fs"
import { type Docs, docs } from "#site/content"

const VERSION = "2.x"

const groupDocs = (docs: Docs[]) => {
  const groups: any = {
    "dark-mode": [],
    "getting-started": [],
    prologue: [],
    components: {},
  }

  docs.forEach((doc) => {
    const { slug, title, order, toc } = doc
    if (slug.startsWith(`docs/${VERSION}/dark-mode/`)) {
      groups["dark-mode"].push({ title, slug, order, children: [], toc })
    } else if (slug.startsWith(`docs/${VERSION}/getting-started/`)) {
      groups["getting-started"].push({ title, slug, order, children: [], toc })
    } else if (slug.startsWith(`docs/${VERSION}/prologue/`)) {
      groups.prologue.push({ title, slug, order, children: [], toc })
    } else if (slug.startsWith(`docs/${VERSION}/components/`)) {
      const parts = slug.split("/")
      const category = parts[3]!
      const componentSlug = parts.slice(4).join("/")

      if (!groups.components[category]) {
        groups.components[category] = []
      }

      groups.components[category].push({
        title,
        slug: `docs/${VERSION}/components/${category}/${componentSlug}`,
        status: doc.status,
        order,
        children: [],
        toc,
      })
    }
  })

  Object.keys(groups).forEach((key) => {
    if (key === "components") {
      Object.keys(groups.components).forEach((category) => {
        groups.components[category].sort((a: any, b: any) => a.order - b.order)
      })
    } else {
      groups[key].sort((a: any, b: any) => a.order - b.order)
    }
  })

  return [
    {
      title: "Prologue",
      slug: `docs/${VERSION}/prologue/prologue`,
      children: groups.prologue,
    },
    {
      title: "Getting Started",
      slug: `docs/${VERSION}/getting-started/getting-started`,
      children: groups["getting-started"],
    },
    {
      title: "Dark Mode",
      slug: `docs/${VERSION}/dark-mode/dark-mode`,
      children: groups["dark-mode"],
    },
    {
      title: "Components",
      slug: `docs/${VERSION}/components/components`,
      children: Object.entries(groups.components).map(([category, items]) => ({
        title: category.charAt(0).toUpperCase() + category.slice(1),
        children: items,
      })),
    },
  ]
}

const generateSidebarJson = () => {
  return groupDocs(docs)
}

const sidebarJson = generateSidebarJson()
fs.writeFileSync("resources/lib/sidebar.json", JSON.stringify(sidebarJson, null, 2))

console.info("✅ sidebar.json generated successfully.")
