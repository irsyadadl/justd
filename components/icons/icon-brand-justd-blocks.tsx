import { cn } from "@/utils/classes"

export function IconBrandJustdBlocks({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      className={cn("size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" fill="#52525C" rx="3.75" />
      <g fill="#fff" filter="url(#a)" shapeRendering="crispEdges">
        <path d="M5.71 6.64a.93.93 0 0 1 .93-.93H8.5a.93.93 0 0 1 .93.93V8.5a.93.93 0 0 1-.93.93H6.64a.93.93 0 0 1-.93-.93z" />
        <path
          d="M10.14 6.64a.93.93 0 0 1 .93-.93h1.86a.93.93 0 0 1 .93.93V8.5a.93.93 0 0 1-.93.93h-1.86a.93.93 0 0 1-.93-.93z"
          fillOpacity=".5"
        />
        <path d="M14.57 6.64a.93.93 0 0 1 .93-.93h1.86a.93.93 0 0 1 .93.93V8.5a.93.93 0 0 1-.93.93H15.5a.93.93 0 0 1-.93-.93zm0 4.43a.93.93 0 0 1 .93-.93h1.86a.93.93 0 0 1 .93.93v1.86a.93.93 0 0 1-.93.93H15.5a.93.93 0 0 1-.93-.93z" />
        <path
          d="M14.57 15.5a.93.93 0 0 1 .93-.93h1.86a.93.93 0 0 1 .93.93v1.86a.93.93 0 0 1-.93.93H15.5a.93.93 0 0 1-.93-.93z"
          fillOpacity=".5"
        />
      </g>
      <defs>
        <filter
          id="a"
          width="12.702"
          height="12.702"
          x="5.649"
          y="5.68"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy=".031" />
          <feGaussianBlur stdDeviation=".031" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
          <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_74_30" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_74_30" result="shape" />
        </filter>
      </defs>
    </svg>
  )
}
