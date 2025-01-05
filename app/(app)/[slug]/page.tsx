import { docs } from "@/.source"
import { notFound, redirect } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const originalUrl = docs.map((i) => i.slug).find((i) => i.split("/").pop() === params.slug)
  if (!originalUrl) {
    notFound()
  }

  return redirect(`/${originalUrl.toLowerCase()}`)
}
