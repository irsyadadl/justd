import { Header } from "@/components/header"
import { Container, Link, Note } from "ui"

export const metadata = {
  title: "Charts",
  description:
    "Charts is a versatile component designed to simplify the creation of various types of charts and graphs. It supports dynamic data, customizable styles, and is compatible with multiple data visualization libraries, making it an essential tool for presenting insights effectively.",
}

export default function Page() {
  return (
    <div>
      <Header>
        Ch
        <span className="text-muted-fg">arts</span>
      </Header>
      <Container className={"py-4 sm:py-16"}>
        <Note intent="info" className="max-w-md">
          This page is under construction. Please check back later for updates. For now, you can
          check out the <Link href="/docs/2.x/components/charts/setup">Charts</Link>.
        </Note>
      </Container>
    </div>
  )
}
