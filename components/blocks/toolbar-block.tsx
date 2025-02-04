import { Wrapper } from "@/app/(app)/(home)/partials/resources"
import { SliderOnPopoverBlock } from "@/components/blocks/slider-on-popover-block"
import {
  IconCamera,
  IconCameraFill,
  IconDuplicate,
  IconDuplicateFill,
  IconGallery,
  IconGalleryFill,
  IconHeart,
  IconHeartFill,
  IconVideoPlaylist,
  IconVideoPlaylistFill,
} from "justd-icons"
import { Toolbar } from "ui"

export function ToolbarBlock() {
  return (
    <Wrapper>
      <div className="flex justify-center gap-2">
        <Toolbar aria-label="Toolbars" className="flex justify-between">
          <Toolbar.Group aria-label="Actions">
            <Toolbar.Item size="square-petite" aria-label="Support" appearance="outline">
              {({ isSelected }) => <>{isSelected ? <IconHeartFill /> : <IconHeart />}</>}
            </Toolbar.Item>
            <Toolbar.Item size="square-petite" aria-label="Duplicate" appearance="outline">
              {({ isSelected }) => <>{isSelected ? <IconDuplicateFill /> : <IconDuplicate />}</>}
            </Toolbar.Item>
            <SliderOnPopoverBlock />
          </Toolbar.Group>
          <Toolbar.Separator className="hidden sm:flex" />
          <Toolbar.Group className="hidden gap-2 sm:flex" aria-label="Gallery">
            <Toolbar.Item aria-label="Camera" size="square-petite" appearance="outline">
              {({ isSelected }) => <>{isSelected ? <IconCameraFill /> : <IconCamera />}</>}
            </Toolbar.Item>
            <Toolbar.Item aria-label="Gallery" size="square-petite" appearance="outline">
              {({ isSelected }) => <>{isSelected ? <IconGalleryFill /> : <IconGallery />}</>}
            </Toolbar.Item>
            <Toolbar.Item aria-label="Playlist" size="square-petite" appearance="outline">
              {({ isSelected }) => (
                <>{isSelected ? <IconVideoPlaylistFill /> : <IconVideoPlaylist />}</>
              )}
            </Toolbar.Item>
          </Toolbar.Group>
        </Toolbar>
      </div>
    </Wrapper>
  )
}
