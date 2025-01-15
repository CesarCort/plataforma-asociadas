import * as React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, ArrowRight, Linkedin, X } from "lucide-react"

export function WelcomeDialog() {
  const [open, setOpen] = React.useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* 
        Botón para abrir el diálogo si lo deseas. Puedes eliminarlo si no lo necesitas.
      */}
      <DialogTrigger asChild>
        <Button>Abrir diálogo</Button>
      </DialogTrigger>

      {/* 
        DialogPortal se encarga de montar el contenido en un portal (por defecto, body).
        Dentro colocamos el Overlay y el Content con su z-index alto (z-50).
      */}
      <DialogPortal>
        <DialogOverlay className="bg-black/50 backdrop-blur-sm fixed inset-0 z-50" />
        
        {/* 
          - z-50 para asegurar que esté por encima de otros elementos. 
          - max-h / overflow-auto para permitir scroll vertical en móviles.
          - pointer-events-auto para que iOS permita tocar y hacer scroll.
          - WebkitOverflowScrolling: "touch" para un scroll nativo en iOS.
        */}
        <DialogContent
          style={{ WebkitOverflowScrolling: "touch" }}
          className="
            fixed
            z-50
            left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            pointer-events-auto
            w-full
            max-w-[95%]
            sm:max-w-[550px]
            max-h-[calc(100vh-4rem)]
            overflow-y-auto
            overflow-x-hidden
            touch-pan-y
            scrolling-touch
            bg-white
            rounded-lg
            p-6
            shadow-lg
            focus:outline-none
          "
        >
          {/* Botón para cerrar */}
          <DialogClose
            className="
              absolute
              right-4
              top-4
              rounded-sm
              opacity-70
              ring-offset-background
              transition-opacity
              hover:opacity-100
              focus:outline-none
              focus:ring-2
              focus:ring-ring
              focus:ring-offset-2
              disabled:pointer-events-none
            "
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          <DialogHeader className="mb-4">
            <DialogTitle className="text-[28px] font-bold leading-tight">
              ¡Bienvenida a WIM Perú! ✨
            </DialogTitle>
            <DialogDescription className="text-lg text-foreground leading-relaxed">
              Nos emociona tenerte como parte de nuestra comunidad de mujeres líderes en minería 🌟
            </DialogDescription>
          </DialogHeader>

          {/* Contenido principal */}
          <div className="space-y-6">
            <div className="bg-[#F8F8F8] py-3 px-4 rounded-lg text-center">
              <p className="text-[15px] font-medium">
                Se vienen grandes cosas y queremos conocerte mejor... 🚀
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-primary/20 cursor-pointer hover:opacity-75 transition">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phrase" className="text-[15px] font-medium">
                Tu frase inspiradora
              </Label>
              <Input
                id="phrase"
                placeholder="Una frase que te identifique..."
                className="text-center h-12"
              />
              <p className="text-sm text-muted-foreground text-center mt-1">
                Esta frase aparecerá en tu perfil ✍️
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="linkedin"
                className="flex items-center gap-2 text-[15px] font-medium"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn (opcional)
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/tu-perfil"
                type="url"
                className="h-12"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
            <Button
              variant="outline"
              className="w-full sm:w-auto px-6 h-11 text-[15px] font-normal"
              onClick={() => setOpen(false)}
            >
              Completar después
            </Button>
            <Button
              className="w-full sm:w-auto px-6 h-11 text-[15px] font-normal gap-2"
              onClick={() => setOpen(false)}
            >
              Comenzar mi experiencia WIM
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Podrás editar esta información más tarde en tu perfil
          </p>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}