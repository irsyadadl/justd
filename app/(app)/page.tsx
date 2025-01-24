import { Blocks } from "./partials/blocks"
import { Cta } from "./partials/cta"
import { Hero } from "./partials/hero"
import { IconResources } from "./partials/icon-resources"
import { Resources } from "./partials/resources"

export default function Page() {
  return (
    <>
      <Hero />
      <div className="space-y-16 py-6 lg:py-16">
        <Blocks />
        <IconResources />
        <Resources />
      </div>
      <Cta />
    </>
  )
}
