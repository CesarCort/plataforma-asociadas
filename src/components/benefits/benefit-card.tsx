import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Benefit } from "../../hooks/useBenefits"
import { Gift } from "lucide-react"

interface BenefitCardProps {
  benefit: Benefit
  onRedeem?: (benefit: Benefit) => void
  onReport?: (benefit: Benefit) => void
  onClick?: (benefit: Benefit) => void
}

const BADGE_STYLES = {
  status: {
    canjeado: {
      background: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-100'
    },
    reportado: {
      background: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-100'
    }
  },
  type: {
    'Educativos': {
      background: 'bg-sky-50',
      text: 'text-sky-700',
      border: 'border-sky-100'
    },
    'Capacitación': {
      background: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-100'
    },
    'Trabajo': {
      background: 'bg-violet-50',
      text: 'text-violet-700',
      border: 'border-violet-100'
    },
    'Networking': {
      background: 'bg-orange-50',
      text: 'text-orange-700',
      border: 'border-orange-100'
    }
  }
}

export function BenefitCard({ benefit, onRedeem, onReport, onClick }: BenefitCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Si el click fue en un botón, no propagamos el evento
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return
    }
    onClick?.(benefit)
  }

  const typeStyle = BADGE_STYLES.type[benefit.type]

  return (
    <Card 
      className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border border-border bg-white rounded-xl"
      onClick={handleClick}
    >
      <div className="relative">
        {/* Imagen con overlay gradiente */}
        <div className="relative h-48">
          <img 
            src={benefit.imageUrl} 
            alt={benefit.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Badge de tipo en la esquina superior derecha */}
        <Badge 
          className={`absolute top-3 right-3 ${typeStyle.background} ${typeStyle.text} ${typeStyle.border} border font-medium`}
        >
          {benefit.type}
        </Badge>

        {/* Badge de estado en la esquina superior izquierda */}
        {benefit.status === 'redeemed' && (
          <Badge 
            className={`absolute top-3 left-3 ${BADGE_STYLES.status.canjeado.background} ${BADGE_STYLES.status.canjeado.text} ${BADGE_STYLES.status.canjeado.border} border font-medium`}
          >
            Canjeado
          </Badge>
        )}
        {benefit.status === 'reported' && (
          <Badge 
            className={`absolute top-3 left-3 ${BADGE_STYLES.status.reportado.background} ${BADGE_STYLES.status.reportado.text} ${BADGE_STYLES.status.reportado.border} border font-medium`}
          >
            Reportado
          </Badge>
        )}

        {/* Icono flotante */}
        <div className="absolute -bottom-6 left-4">
          <div className="p-3 rounded-xl bg-white text-primary shadow-lg border border-border">
            <Gift className="w-6 h-6" />
          </div>
        </div>
      </div>

      <CardContent className="pt-8 p-4">
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold text-lg leading-tight">
            {benefit.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {benefit.description}
          </p>
        </div>

        {benefit.status === 'available' && onRedeem && (
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => onRedeem(benefit)}
          >
            Canjear beneficio
          </Button>
        )}
        {(benefit.status === 'redeemed' || benefit.status === 'reported') && onReport && (
          <Button 
            variant="outline" 
            className="w-full border-border hover:bg-muted/80"
            onClick={() => onReport(benefit)}
          >
            ¿No recibiste este beneficio?
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 