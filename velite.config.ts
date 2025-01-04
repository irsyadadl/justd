import rehypeShiki from "@shikijs/rehype"
import { transformerNotationDiff } from "@shikijs/transformers"

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { defineCollection, defineConfig, s } from "velite"

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
})

const docs = defineCollection({
  name: "Docs",
  pattern: "docs/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      order: s.number(),
      published: s.boolean().default(true),
      references: s.array(s.string()).optional(),
      body: s.mdx(),
      toc: s.toc(),
      status: s.string().optional(),
    })
    .transform(computedFields),
})

const blog = defineCollection({
  name: "Blog",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      published: s.isodate(),
      author: s.string().optional(),
      references: s.array(s.string()).optional(),
      body: s.mdx(),
      toc: s.toc(),
      status: s.string().optional(),
    })
    .transform(computedFields),
})

export default defineConfig({
  root: "resources/content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { docs, blog },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeStringify,
      [
        rehypeShiki as any,
        {
          highlighter: transformerNotationDiff,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          langs: ["ts", "tsx", "js", "jsx", "json", "css", "html", "md", "mdx"],
          defaultLanguage: "tsx",
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["not-prose subheading-anchor"],
          },
        },
      ],
    ],
    remarkPlugins: [remarkParse, remarkRehype],
  },
})
