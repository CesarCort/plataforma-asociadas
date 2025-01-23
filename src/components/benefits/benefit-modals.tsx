import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Textarea } from "../ui/textarea"
import { Badge } from "../ui/badge"
import { Benefit } from "../../hooks/useBenefits"
import { useState } from "react"
import { Calendar, MapPin, Users, X, Gift } from "lucide-react"

interface BenefitModalProps {
  benefit: Benefit | null
  open: boolean
  onClose: () => void
}

export function RedeemModal({ benefit, open, onClose }: BenefitModalProps) {
  if (!benefit) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¡Beneficio canjeado exitosamente!</DialogTitle>
          <DialogDescription>
            Se han enviado las instrucciones a tu correo electrónico registrado.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Instrucciones:</h4>
          <p className="text-sm text-muted-foreground">
            {benefit.instructions}
          </p>
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={onClose}>Entendido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ReportModal({ benefit, open, onClose }: BenefitModalProps) {
  const [comment, setComment] = useState('')

  if (!benefit) return null

  const handleSubmit = () => {
    // Aquí iría la lógica para enviar el reporte
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reportar beneficio no recibido</DialogTitle>
          <DialogDescription>
            Lamentamos que no hayas podido acceder a este beneficio. Por favor, cuéntanos más sobre tu caso para poder ayudarte.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Textarea
            placeholder="Describe tu caso aquí..."
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Enviar reporte</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DetailModal({ benefit, open, onClose }: BenefitModalProps) {
  if (!benefit) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white">
        {/* Header con imagen y botón de cerrar */}
        <div className="relative">
          <img 
            src={benefit.imageUrl} 
            alt={benefit.title}
            className="w-full h-[300px] object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white/75"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {/* Título y badge de estado */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">{benefit.title}</h2>
              </div>
              {benefit.status === 'available' && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                  Nuevo
                </Badge>
              )}
            </div>
          </div>

          {/* Detalles del beneficio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-5 w-5" />
              <span>Vigencia: Del 2 al 15 de febrero del 2025</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Virtual</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>20 plazas</span>
            </div>
          </div>

          {/* Descripción */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Descripción:</h3>
            <p className="text-muted-foreground">
              {benefit.description} para impulsar tus habilidades y destacarte en el sector. ¡Inscríbete ahora y transforma tu carrera!
            </p>
          </div>

          {/* Términos y condiciones */}
          <div className="mt-8 text-sm text-muted-foreground">
            *Al canjear este beneficio estas aceptando los{" "}
            <a href="#" className="text-primary hover:underline">
              Términos y Condiciones
            </a>
          </div>

          {/* Botón de acción */}
          {benefit.status === 'available' && (
            <Button className="w-full mt-6" size="lg">
              Canjear beneficio
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 