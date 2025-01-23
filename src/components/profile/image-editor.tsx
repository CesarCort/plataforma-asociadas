// TODO: Deuda técnica - Actualización pendiente
// Este componente utiliza una aserción de tipo para el componente Cropper debido a incompatibilidades
// entre react-easy-crop y React 19. Se debe revisar y actualizar cuando:
// 1. react-easy-crop se actualice con soporte para React 19
// 2. O cuando se implemente una solución propia usando Canvas API
// Ticket relacionado: [Agregar número de ticket aquí]

import { useState, useCallback } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Upload } from 'lucide-react'
import Cropper from 'react-easy-crop'
import type { Area, Point } from 'react-easy-crop'

// Aserción de tipo para el componente Cropper
const CropperComponent = Cropper as any

interface ImageEditorProps {
  onImageSave: (file: File) => Promise<void>
}

export function ImageEditor({ onImageSave }: ImageEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '')
        setIsOpen(true)
        // Resetear zoom y crop al cargar nueva imagen
        setZoom(1)
        setCrop({ x: 0, y: 0 })
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', error => reject(error))
      image.src = url
    })

  async function getCroppedImg(
    imageSrc: string,
    pixelCrop: Area,
    fileName: string
  ): Promise<File> {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    // Establecer un tamaño fijo para la imagen de salida
    const maxSize = 800
    const cropSize = Math.min(pixelCrop.width, pixelCrop.height, maxSize)

    canvas.width = cropSize
    canvas.height = cropSize

    // Asegurar que el recorte mantenga la proporción correcta
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      cropSize,
      cropSize
    )

    // Convertir el canvas a un archivo con calidad controlada
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            reject(new Error('Canvas is empty'))
            return
          }
          const file = new File([blob], fileName, { type: 'image/jpeg' })
          resolve(file)
        },
        'image/jpeg',
        0.95 // Calidad de la imagen
      )
    })
  }

  const handleSave = async () => {
    try {
      if (!croppedAreaPixels) return

      setIsLoading(true)
      const croppedImageFile = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        'profile-photo.jpg'
      )
      
      await onImageSave(croppedImageFile)
      setIsOpen(false)
    } catch (e) {
      console.error('Error al guardar la imagen:', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start gap-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => document.getElementById('profile-photo')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          Subir foto
        </Button>
        <input
          type="file"
          id="profile-photo"
          className="hidden"
          accept="image/*"
          onChange={onSelectFile}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Editar foto de perfil</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {imgSrc && (
              <div className="relative h-[500px]">
                <CropperComponent
                  image={imgSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  objectFit="contain"
                  cropSize={{ width: 400, height: 400 }}
                  cropShape="round"
                  showGrid={true}
                  minZoom={0.5}
                  maxZoom={3}
                  zoomSpeed={0.1}
                  restrictPosition={true}
                />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? 'Guardando...' : 'Guardar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 