import { Button } from "../ui/button"
import { Calendar, Clock, MapPin, Users, X } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Event {
  id: number
  title: string
  time: string
  type: "Virtual" | "Presencial"
  date: string
  isInterested?: boolean
  isRegistered?: boolean
  description?: string
}

interface EventDetailsModalProps {
  event: Event
  onClose: () => void
}

export function EventDetailsModal({ event, onClose }: EventDetailsModalProps) {
  const getEventStatus = () => {
    if (event.isRegistered) {
      return {
        text: "Inscrita",
        color: "text-green-500",
      }
    }
    if (event.isInterested) {
      return {
        text: "Interesada",
        color: "text-yellow-500",
      }
    }
    return {
      text: "No inscrita",
      color: "text-muted-foreground",
    }
  }

  const status = getEventStatus()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg max-w-lg w-full mx-4 relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${status.color}`}>
                {status.text}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(event.date), "d 'de' MMMM, yyyy", { locale: es })}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.type}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>20 asistentes confirmados</span>
            </div>
          </div>

          {event.description && (
            <div>
              <h4 className="font-medium mb-2">Descripción</h4>
              <p className="text-muted-foreground text-sm">
                {event.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 