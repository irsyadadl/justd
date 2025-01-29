import { Carousel } from "ui"

export default function CarouselAnatomy() {
  return (
    <Carousel className="w-full max-w-xs **:data-[slot=card]:flex **:data-[slot=card]:h-56 **:data-[slot=card]:flex-col **:data-[slot=card]:overflow-hidden">
      <Carousel.Content>
        <Carousel.Item className="basis-1/2">1</Carousel.Item>
        <Carousel.Item className="basis-1/2">2</Carousel.Item>
        <Carousel.Item className="basis-1/2">3</Carousel.Item>
      </Carousel.Content>

      <Carousel.Handler>
        <Carousel.Button segment="previous" />
        <Carousel.Button segment="next" />
      </Carousel.Handler>
    </Carousel>
  )
}
