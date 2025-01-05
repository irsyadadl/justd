import { remarkHeading, remarkImage } from "fumadocs-core/mdx-plugins"
import { defineConfig, defineDocs, frontmatterSchema } from "fumadocs-mdx/config"
import { z } from "zod"

export const { docs, meta } = defineDocs({
  dir: "resources/content/docs",
  docs: {
    async: false,
    schema: frontmatterSchema.extend({
      title: z.string(),
      description: z.string(),
      references: z.array(z.string()).optional(),
    }),
  },
  meta: {
    schema: frontmatterSchema.extend({
      title: z.string(),
      slug: z.string(),
      description: z.string(),
    }),
  },
})

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      inline: "tailing-curly-colon",
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
    remarkPlugins: [[remarkHeading, { generateToc: true }], remarkImage],
  },
})
