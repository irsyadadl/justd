import { cn } from "@/utils/classes"

export const IconBrandJustdBlocks = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={cn("size-4", className)}
    >
      <path
        fill="currentColor"
        d="m12.72 1.688 8.25 4.514a1.5 1.5 0 0 1 .78 1.315v8.965a1.5 1.5 0 0 1-.78 1.313l-8.25 4.516a1.49 1.49 0 0 1-1.44 0l-8.25-4.516a1.5 1.5 0 0 1-.78-1.313V7.516a1.5 1.5 0 0 1 .78-1.312l8.25-4.516a1.49 1.49 0 0 1 1.44 0m6.813 5.437L12 3 9.208 4.527l7.533 4.125zm-15.066 0L12 11.25l3.179-1.741-7.532-4.124zm8.283 5.422v8.044l7.5-4.105V8.442l-3 1.642v4.166a.75.75 0 1 1-1.5 0v-3.345zM7.5 16.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  )
}
