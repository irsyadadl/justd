import { source } from "@/utils/source"
import { createSearchAPI } from "fumadocs-core/search/server"

export const { GET } = createSearchAPI("advanced", {
  indexes: source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: page.data.structuredData,
  })),
})

export const runtime = "edge"
