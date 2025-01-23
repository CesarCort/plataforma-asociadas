declare module 'react-easy-crop' {
  import { ComponentType } from 'react'

  export interface Point {
    x: number
    y: number
  }

  export interface Area {
    width: number
    height: number
    x: number
    y: number
  }

  export interface CropperProps {
    image: string
    crop: Point
    zoom: number
    aspect: number
    onCropChange: (location: Point) => void
    onZoomChange: (zoom: number) => void
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
    cropSize?: { width: number; height: number }
    objectFit?: 'contain' | 'horizontal-cover' | 'vertical-cover'
    cropShape?: 'rect' | 'round'
    showGrid?: boolean
    zoomSpeed?: number
    minZoom?: number
    maxZoom?: number
    restrictPosition?: boolean
  }

  const Cropper: ComponentType<CropperProps>
  export default Cropper
} 