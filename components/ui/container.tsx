import { tv } from "tailwind-variants"

const containerStyles = tv({
  base: "@container mx-auto w-full max-w-7xl lg:max-w-(--breakpoint-xl) 2xl:max-w-(--breakpoint-2xl)",
  variants: {
    intent: {
      constrained: "sm:px-6 lg:px-8",
      "padded-content": "px-4 sm:px-6 lg:px-8",
    },
  },
  defaultVariants: {
    intent: "padded-content",
  },
})

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?: "constrained" | "padded-content"
  ref?: React.Ref<HTMLDivElement>
}

const Container = ({ className, intent, ref, ...props }: ContainerProps) => (
  <div className={containerStyles({ intent, className })} {...props} ref={ref} />
)

export type { ContainerProps }
export { Container }
