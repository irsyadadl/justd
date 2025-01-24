import { app } from "@/config/app"
import { source } from "@/config/source"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.pageTree
  return [
    {
      url: app.url,
      lastModified: new Date(),
    },
    {
      url: `${app.url}/components`,
      lastModified: new Date(),
    },
    {
      url: `${app.url}/icons`,
      lastModified: new Date(),
    },
    {
      url: `${app.url}/colors`,
      lastModified: new Date(),
    },
    {
      url: `${app.url}/themes`,
      lastModified: new Date(),
    },
    {
      url: `${app.url}/charts`,
      lastModified: new Date(),
    },
    //   @ts-ignore
    ...extractUrls(docs.children[0].children).map((i) => ({ ...i, lastModified: new Date() })),
  ]
}

type DocNode = {
  type: string
  name: string
  url?: string
  lastModified: Date
  children: DocNode[]
  $ref?: Record<string, any>
}

function extractUrls(data: DocNode[]): { url: string }[] {
  const urls: { url: string }[] = []

  const traverse = (node: DocNode): void => {
    if (node.type === "page" && node.url) {
      urls.push({
        url: `${app.url}${node.url}`,
      })
    } else if (node.children) {
      node.children.forEach(traverse)
    }
  }

  data.forEach(traverse)

  return urls
}
