import registry from "@/__registry__/generated"

export const GET = () => {
  return Response.json(registry)
}
