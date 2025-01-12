import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Camera, ArrowRight, Linkedin } from "lucide-react"

export function WelcomeDialog() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            ¡Bienvenida a WIM Perú! ✨
          </DialogTitle>
          <DialogDescription className="text-center pt-4 space-y-4">
            <p className="text-lg">
              Nos emociona tenerte como parte de nuestra comunidad de mujeres líderes en minería 🌟
            </p>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-primary font-medium">
                Se vienen grandes cosas y queremos conocerte mejor... 🚀
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed cursor-pointer hover:opacity-75 transition">
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
            <Label htmlFor="phrase">Tu frase inspiradora</Label>
            <Input
              id="phrase"
              placeholder="Una frase que te identifique..."
              className="text-center"
            />
            <p className="text-sm text-muted-foreground text-center">
              Esta frase aparecerá en tu perfil ✍️
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn (opcional)
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/tu-perfil"
              type="url"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button size="lg" className="w-full sm:w-auto gap-2">
            Comenzar mi experiencia WIM
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Podrás editar esta información más tarde en tu perfil
        </div>
      </DialogContent>
    </Dialog>
  )
} 