import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "../ui/button"
import { addMonths, subMonths, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek } from "date-fns"
import { es } from "date-fns/locale"

interface Event {
  id: number
  title: string
  date: string
  time: string
  type: "Virtual" | "Presencial"
  isInterested?: boolean
  isRegistered?: boolean
  description?: string
}

interface CalendarViewProps {
  events: Event[]
  onEventClick?: (event: Event) => void
}

export function CalendarView({ events, onEventClick }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Obtener el día de la semana del primer día del mes (0 = domingo, 1 = lunes, etc.)
  const startWeek = startOfWeek(monthStart, { weekStartsOn: 1 })
  const daysBeforeMonth = eachDayOfInterval({ 
    start: startWeek, 
    end: new Date(monthStart.getTime() - 24 * 60 * 60 * 1000) 
  })

  // Convertir las fechas de los eventos a objetos Date para comparación
  const eventDates = events.map(event => ({
    ...event,
    dateObj: new Date(event.date)
  }))

  const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
        {/* Días de la semana */}
        {weekDays.map((day) => (
          <div key={day} className="bg-background p-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}

        {/* Días del mes anterior */}
        {daysBeforeMonth.map((day) => (
          <div
            key={day.toISOString()}
            className="bg-background p-2 min-h-[120px] text-muted-foreground/50"
          >
            <div className="font-medium text-sm mb-1">
              {format(day, "d")}
            </div>
          </div>
        ))}

        {/* Días del mes actual */}
        {daysInMonth.map((day) => {
          const dayEvents = eventDates.filter(event => 
            isSameDay(event.dateObj, day) && 
            isSameMonth(event.dateObj, currentDate)
          )

          return (
            <div
              key={day.toISOString()}
              className="bg-background p-2 min-h-[120px] hover:bg-muted/50 transition-colors"
            >
              <div className="font-medium text-sm mb-1">
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group relative text-xs p-1.5 rounded bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer"
                    onClick={() => onEventClick?.(event)}
                  >
                    <div className="flex items-center gap-1 truncate">
                      <Clock className="w-3 h-3 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="truncate font-medium">{event.title}</div>
                    
                    {/* Tooltip */}
                    <div className="absolute hidden group-hover:block left-full top-0 ml-2 z-50 w-48 p-2 bg-popover text-popover-foreground rounded-md shadow-md">
                      <div className="font-medium mb-1">{event.title}</div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {event.type}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 